import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import NotificationCard from 'components/common/notificationCard';
import polygon from 'assets/Polygon.svg';
import notifs from 'assets/notifs.svg';
import notifs_active from 'assets/notifs_active.svg';
import { connect } from 'react-redux';
import 'styles/main.scss';
import { getAllNotifications, getNewNotification } from 'api/notificationApi';
import { getCookie } from 'utils/handleCookies';
import logo from 'assets/studyportal_logo.png';
import { TOGGLE_NOTIFICATIONS } from 'constants/action-types';
import _ from 'lodash';

function mapStateToProps(state) {
  return { modal: state.modal };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleNotifications: () => dispatch({ type: TOGGLE_NOTIFICATIONS }),
  };
}

/**
 * Notification component for Studyportal.
 */
const Notifications = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const content = useSelector((state) => state.content);
  const [notifications, setNotifications] = useState([]);

  // eslint-disable-next-line react/no-deprecated

  const update = (notification) => {
    setNotifications(notifications.filter((notif) => notif !== notification));
  };

  const getNotifications = () => {
    const token = getCookie('token');
    getAllNotifications(token).then((res) => {
      console.log(res);
      if (!_.isEmpty(res)) {
        console.log('here');
        setNotifications(res);
      }
    });
  };
  useEffect(() => {
    getNotifications();
    const ws = getNewNotification(getCookie('token'));
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (Notification.permission === 'granted') {
        new Notification('Studyportal', {
          body: data.notification,
          icon: logo,
        });
      }
      console.log("whi",notifications, data.notification_data);
      if (_.isEmpty(notifications)) setNotifications([data.notification_data]);
      else setNotifications(notification => [...notification, data.notification_data]);
    };
  }, [content, user]);

  console.log("outside",notifications);

  return (
    <div className="notifications">
      <div className="notifications--button" onClick={() => props.toggleNotifications()}>
        <div className="notifications--button-image">
          <img
            src={!_.isEmpty(notifications) ? notifs_active : notifs}
            alt="notification"
          />
        </div>
      </div>
      {props.modal.notifications ? (
        <Fragment>
          <div className="notifications--polygon">
            <img src={polygon} alt="polygon" />
          </div>
          <div className="notifications--container">
            {!_.isEmpty(notifications) ? (
              notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification_data={notification}
                  update={update}
                />
              ))
            ) : (
              <div className="notifications--none">No new notifications</div>
            )}
          </div>
        </Fragment>
      ) : (
        <Fragment />
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

Notifications.propTypes = {
  /** Holds status of various modals and popups. */
  modal: PropTypes.object,
  /** Function to toggle state of notification popup. */
  toggleNotifications: PropTypes.func,
  /** Identifies notification popup toggle status. */
  notifications: PropTypes.bool,
  /** Function to toggle state of modals. */
  handleClick: PropTypes.func,
  /** Function to close modals. */
  close: PropTypes.func,
};
