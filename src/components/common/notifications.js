import React,{ Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import NotificationCard from 'components/common/notificationCard';
import polygon from 'assets/Polygon.svg';
import notif from 'assets/notif.svg';
import 'styles/main.scss';
import { getAllNotifications, getNewNotification, deleteNotification } from 'api/notificationApi';
import { getCookie } from 'utils/handleCookies';
import logo from 'assets/studyportal_logo.png';

/**
 * Notification component for Studyportal.
 */
class Notifications extends Component {
  constructor(props){
  super(props);
  this.state={
    notifications:[]
  };
  this.getNotifications=this.getNotifications.bind(this);
  this.closeAndDelete=this.closeAndDelete.bind(this);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount(){
    this.getNotifications();
  }

  componentDidMount(){
    const ws = getNewNotification(getCookie('token'));
    ws.onmessage = (message)=>{
      const data = JSON.parse(message.data);
      if(Notification.permission === "granted"){
        new Notification('Studyportal',{
            body: data.notification,
            icon: logo
        });
      }
      let all_notifications = this.state.notifications;
      all_notifications.push(data.notification_data);
      this.setState({ notifications:all_notifications });
    };
  }

  closeAndDelete() {
    this.props.close();
    if(this.props.notifications && this.state.notifications.length){
      this.state.notifications.map((notification)=>(
        deleteNotification(notification.id)
      ));
      this.setState({ notifications:"" });
    }
  }

  getNotifications (){
    const token = getCookie('token');
    getAllNotifications(token).then((res,err)=>{
      if(err){
        //TODO handle error
      }
      else{
        if(res.length!==0){
          this.setState({ notifications:res });
        }
      }
    });
  }

  render() {
    return(
      <div className='notifications'>
        <div className='notifications--button' onClick={() => {this.props.handleClick('notifications');} }>
          <div className='notifications--button-image'><img src={notif} alt="notification" /></div>
          <div className='notifications--button-number'>{this.state.notifications.length}</div>
        </div>
        { this.props.notifications ?
          <Fragment>
            <div className='notifications--polygon'><img src={ polygon } alt='ploygon' /></div>
            <div className='notifications--container' onClick={this.closeAndDelete}>
            {(this.state.notifications.length)?this.state.notifications.map((notification)=>(
              <NotificationCard key={notification.id} notification_data={notification}/>
            )):
            <div className='nonewnotification'><p>No new notification.</p></div>}
            </div>
          </Fragment> :
        <Fragment /> }
      </div>
    );
  }
}

export default Notifications;

Notifications.propTypes = {
  /** Identifies notification popup toggle status. */
  notifications: PropTypes.bool,
  /** Function to toggle state of modals. */
  handleClick: PropTypes.func,
  /** Function to close modals. */
  close: PropTypes.func
};
