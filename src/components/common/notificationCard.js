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
      this.props.update(notification_data);
    };

    return(
      <Link to={this.state.link}>
        <div className='notifications--card' onClick={() => closeAndDelete(props.id, props.notification_data)}>
            <div className='notifications--card-description'>{props.actor} {props.verb} {props.action} in {props.target}.
                                                              Click to check it.</div>
            <div className='notifications--card-date'>{props.date}</div>
            <div className='notifications--card-page'>{props.target}</div>
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
  /** Function to delete specific notification. */
  update: PropTypes.func
};
