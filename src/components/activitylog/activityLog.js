import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ActivityCard from './activityCard';
import { useDispatch } from 'react-redux';
import 'styles/main.scss';
import { getFileRequestsByUser } from 'api/requestApi';
import { getUploadsByUser } from 'api/uploadApi';
import { getCookie } from 'utils/handleCookies';
import { CLOSE_MODAL } from 'constants/action-types';

/**
 * Component to render activitylog in Studyportal.
 */
const ActivityLog = (props) => {
  const dispatch = useDispatch();
  const [activity, setActivity] = useState([]);
  const routeMap = {
    all: 'All Activity Log',
    requests: 'Requests Log',
    uploads: 'Uploads Log',
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  /**
   * Fetch activities for the user.
   *
   * @param {string} route
   */
  const getActivity = (route) => {
    const token = getCookie('token');
    if (route === 'all') {
      getAll(token);
    } else if (route === 'requests') {
      getRequests(token);
    } else if (route === 'uploads') {
      getUploads(token);
    }
  };

  /**
   * Fetch request related activity for the user.
   *
   * @param {string} token
   */
  const getRequests = (token) => {
    let activity = [];
    getFileRequestsByUser(token).then((res) => {
      res.forEach((request) => {
        activity.push({ type: 'request', activity: request });
      });
      setActivity(activity);
      // TODO handle its response and display
      // getCourseRequestsByUser(token).then((response) => {
      //   response.forEach((request) => {
      //     activity.push({ type: 'request', activity: request });
      //   });
      // });
    });
  };

  /**
   * Fetch upload related activity for the user.
   *
   * @param {string} token
   */
  const getUploads = (token) => {
    let activity = [];
    getUploadsByUser(token).then((res) => {
      res.forEach((upload) => {
        activity.push({ type: 'upload', activity: upload });
      });
      setActivity(activity);
    });
  };

  /**
   * Fetch all activities for the user.
   *
   * @param {string} token
   */
  const getAll = (token) => {
    let activity = [];
    getUploadsByUser(token).then((response) => {
      response.forEach((upload) => {
        activity.push({ type: 'upload', activity: upload });
      });
      getFileRequestsByUser(token).then((res) => {
        res.forEach((request) => {
          activity.push({ type: 'request', activity: request });
        });
        // activity = arrangeActivity(activity);
        setActivity(activity);
      });
    });
  };

  /**
   * Sort activities by date.
   *
   * @param {array} activity
   */
  // const arrangeActivity = (activity) => {
  //   activity.sort((a,b) => {
  //     return a.date - b.date;
  //   });
  // };

  useEffect(() => {
    getActivity(props.route); // eslint-disable-next-line
  }, [props.route]);

  return (
    <div className="activitylog" onClick={() => closeModal()}>
      <div className="activitylog--heading">
        {props.route !== undefined ? routeMap[props.route] : routeMap.all}
      </div>
      <div className="activitylog--heading_underline" />
      <div className="activitylog--activitycards">
        {activity.map((material, index) => (
          <ActivityCard
            key={index}
            type={material.type}
            status={material.activity.status}
            title={material.activity.title}
            course={material.activity.course.title}
            code={material.activity.course.code}
            date={material.activity.date}
            file={material.activity.file}
            url={material.activity.driveid}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;

ActivityLog.propTypes = {
  /** Holds activity type param. */
  route: PropTypes.string,
};
