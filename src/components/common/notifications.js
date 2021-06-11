import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import NotificationCard from 'components/common/notificationCard';
import { getAllNotifications, getNewNotification } from 'api/notificationApi';
import { getCookie } from 'utils/handleCookies';
import {
  ADD_NEW_NOTIFICATION,
  SET_NOTIFICATIONS,
  TOGGLE_NOTIFICATIONS,
} from 'constants/action-types';
import 'styles/main.scss';

import logo from 'assets/studyportal_logo.png';
import polygon from 'assets/Polygon.svg';
import notifs from 'assets/notifs.svg';
import notifs_active from 'assets/notifs_active.svg';

/* Action for setting notifications */
const SetNotificationContent = (data) => ({
  type: SET_NOTIFICATIONS,
  payload: data,
});

/**
 * Notification component for Studyportal.
 */
const Notifications = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const showNotifications = useSelector((state) => state.modal.notifications);
  const notifications = useSelector((state) => state.content.notifications);

  const getNotifications = () => {
    const token = getCookie('token');
    getAllNotifications(token).then((res) => {
      if (!_.isEmpty(res)) dispatch(SetNotificationContent(res));
    });
  };

  const dropNotification = (notification) => {
    let filteredNotifs = notifications.filter((notif) => notif !== notification);
    dispatch(SetNotificationContent(filteredNotifs));
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
      /* Adds new notification at index: 0 */
      dispatch({ type: ADD_NEW_NOTIFICATION, payload: data.notification_data });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="notifications">
      <div
        className="notifications--button"
        onClick={() => dispatch({ type: TOGGLE_NOTIFICATIONS })}
      >
        <div className="notifications--button-image">
          <img src={!_.isEmpty(notifications) ? notifs_active : notifs} alt="notification" />
        </div>
      </div>
      {showNotifications && (
        <>
          <div className="notifications--polygon">
            <img src={polygon} alt="polygon" />
          </div>
          <div className="notifications--container">
            {!_.isEmpty(notifications) ? (
              notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification_data={notification}
                  update={dropNotification}
                />
              ))
            ) : (
              <div className="notifications--none">No new notifications</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications;
