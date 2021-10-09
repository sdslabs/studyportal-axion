import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import arrow from 'assets/back.svg';
import 'styles/main.scss';
import { Link } from 'react-router-dom';
import { CLOSE_MODAL } from 'constants/action-types';

/**
 * Sidebar component for Activity Page of Studyportal.
 */
const Sidebar = () => {
  const dispatch = useDispatch();
  const [selector, setSelector] = useState('all');

  const getRoute = () => {
    const url = window.location.href;
    const parts = url.split('/');
    if (parts[parts.length - 1] === 'activity' || parts[parts.length - 1] === 'all')
      setSelector('all');
    else if (parts[parts.length - 1] === 'requests') setSelector('requests');
    else if (parts[parts.length - 1] === 'uploads') setSelector('uploads');
  };

  useEffect(() => {
    getRoute(); // eslint-disable-next-line
  }, [window.location.href]);

  return (
    <div className="sidebar" onClick={() => dispatch({ type: CLOSE_MODAL })}>
      <div className="sidebar--head">
        <div className="sidebar--course">Activity</div>
        <div className="sidebar--back">
          <Link to="/">
            <img src={arrow} alt="arrow" /> <span className="back">Departments</span>
          </Link>
        </div>
      </div>
      <div className="sidebar--course-name">
        <div className="sidebar--course-table_logout">
          <Link to={`/activity/all`} className="link">
            <div className={selector === 'all' ? 'coursehandle_active' : 'coursehandle'}>
              <span className="coursehandle--heading">All Activity Log</span>
            </div>
          </Link>
          <Link to={`/activity/requests`} className="link">
            <div className={selector === 'requests' ? 'coursehandle_active' : 'coursehandle'}>
              <span className="coursehandle--heading">Requests Log</span>
            </div>
          </Link>
          <Link to={`/activity/uploads`} className="link">
            <div className={selector === 'uploads' ? 'coursehandle_active' : 'coursehandle'}>
              <span className="coursehandle--heading">Uploads Log</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
