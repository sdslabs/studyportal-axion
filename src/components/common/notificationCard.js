import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import 'styles/main.scss';
import { Link } from 'react-router-dom';
import { deleteNotification } from 'api/notificationApi';
import { CLOSE_MODAL } from 'constants/action-types';
import parseDate from 'utils/parseDate';

import defaultIcon from 'assets/notif_default.svg';
import file from 'assets/notif_file.svg';
import course from 'assets/notif_course.svg';
import request from 'assets/notif_request.svg';

/**
 * Component to render notifications.
 */

/**
 * Get the icon and title for the notification.
 * @param {Object} - notification_data
 * @returns {Object} - icon and title
 */
const getTemplateData = (notification_data) => {
  const { verb, notification_type } = notification_data;

  let templateData = {};

  switch (notification_type) {
    case 'adddepaartment': //Typo from backend
      templateData.icon = course;
      templateData.title = 'New Department Added';
      break;

    case 'addcourse':
      templateData.icon = course;
      templateData.title = 'New Course Added';
      break;

    case 'addfile':
      templateData.icon = file;
      templateData.title = 'New File Added';
      break;

    case 'request':
      templateData.icon = request;
      if (verb.includes('you requested')) {
        templateData.title = 'Your Request Updated';
      } else {
        templateData.title = 'New Request Added';
      }
      break;

    default:
      templateData.icon = defaultIcon;
      templateData.title = 'New Notification';
  }

  return templateData;
};

const NotificationCard = (props) => {
  const dispatch = useDispatch();

  const closeAndDelete = (id, notification_data) => {
    deleteNotification(id);
    props.update(notification_data);
    dispatch({ type: CLOSE_MODAL });
  };

  const { icon, title } = getTemplateData(props.notification_data);
  const { id, verb, actor, action, timestamp, link } = props.notification_data;

  return (
    <Link to={link}>
      <div
        className="notification-card--grid"
        onClick={() => closeAndDelete(id, props.notification_data)}
      >
        <img alt="icon" className="notification-card--icon" src={icon} />
        <span className="notification-card--title">{title}</span>
        <span className="notification-card--date">{parseDate(timestamp)}</span>
        <p className="notification-card--description">
          {actor} {verb} <span className="bold">{action}</span>
        </p>
      </div>
    </Link>
  );
};

export default NotificationCard;

NotificationCard.propTypes = {
  /** Holds the notification and related data. */
  notification_data: PropTypes.object,
  /** Holds the notification id. */
  id: PropTypes.number,
  /** Holds the notification actor. */
  actor: PropTypes.string,
  /** Holds the notification associated verb. */
  verb: PropTypes.string,
  /** Holds the notification action. */
  action: PropTypes.string,
  /** Holds the notification target. */
  target: PropTypes.string,
  /** Holds the notification date. */
  timestamp: PropTypes.string,
  /** Holds the notification related link. */
  link: PropTypes.string,
  /** Function to delete specific notification. */
  update: PropTypes.func,
};
