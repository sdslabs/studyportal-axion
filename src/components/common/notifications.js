import React,{ Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import NotificationCard from 'components/common/notificationCard';
import polygon from 'assets/Polygon.svg';
import notif from 'assets/notif.svg';
import 'styles/main.scss';

class Notifications extends Component {
  render() {
    return(
      <div className='notifications'>
        <div className='notifications--button' onClick={() => this.props.handleClick('notifications') }>
          <div className='notifications--button-image'><img src={notif} alt="notification" /></div>
          <div className='notifications--button-number'>1</div>
        </div>
        { this.props.notifications ?
          <Fragment>
            <div className='notifications--polygon'><img src={ polygon } alt='ploygon' /></div>
            <div className='notifications--container' onClick={this.props.close}>
              <NotificationCard/>
              <NotificationCard/>
              <NotificationCard/>
            </div>
          </Fragment> :
        <Fragment /> }
      </div>
    );
  }
}

export default Notifications;

Notifications.propTypes = {
  notifications: PropTypes.bool,
  handleClick: PropTypes.func,
  close: PropTypes.func
};
