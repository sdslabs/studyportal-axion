import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import 'styles/main.scss';
import { Link } from 'react-router-dom';
import { deleteNotification } from 'api/notificationApi';
import { CLOSE_MODAL } from 'constants/action-types';

/**
 * Component to render notifications.
 */
const NotificationCard = (props) => {
    const dispatch = useDispatch();

    const closeAndDelete = (id, notification_data) => {
      dispatch({ type: CLOSE_MODAL });
      deleteNotification(id);
      props.update(notification_data);
    };

    return(
      <Link to={props.notification_data.link}>
        <div className='notifications--card' onClick={() => closeAndDelete(props.notification_data.id, props.notification_data)}>
            <div className='notifications--card-description'>
              {props.notification_data.actor} {props.notification_data.verb}
              {props.notification_data.action} in {props.notification_data.target}. Click to check it.</div>
            <div className='notifications--card-date'>{props.notification_data.date}</div>
            <div className='notifications--card-page'>{props.notification_data.target}</div>
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
  date: PropTypes.string,
  /** Holds the notification related link. */
  link: PropTypes.string,
  /** Function to delete specific notification. */
  update: PropTypes.func
};
