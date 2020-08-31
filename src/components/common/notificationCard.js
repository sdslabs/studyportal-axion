import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'styles/main.scss';
import { Link } from 'react-router-dom';
import { deleteNotification } from 'api/notificationApi';

/**
 * Component to render notifications.
 */
class NotificationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id: props.notification_data.id,
          actor: props.notification_data.actor,
          verb: props.notification_data.verb,
          action: props.notification_data.action,
          date: props.notification_data.timestamp,
          notification_type: props.notification_data.notification_type,
          target: props.notification_data.target,
          link: props.notification_data.link
        };
        this.closeAndDelete = this.closeAndDelete.bind(this);
    }

    closeAndDelete(){
      this.props.close();
      deleteNotification(this.state.id);
      this.props.update(this.props.notification_data);
    }
  render() {
    return(
      <Link to={this.state.link}>
        <div className='notifications--card' onClick={()=> {this.closeAndDelete()}}>
            <div className='notifications--card-description'>{this.state.actor} {this.state.verb} {this.state.action} in {this.state.target}.
                                                              Click to check it.</div>
            <div className='notifications--card-date'>{this.state.date}</div>
            <div className='notifications--card-page'>{this.state.target}</div>
        </div>
      </Link>
    );
  }
}

export default NotificationCard;

NotificationCard.propTypes = {
  notification_data: PropTypes.object
};
