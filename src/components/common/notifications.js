import React,{ Component, Fragment } from 'react';
import NotificationCard from 'components/common/notificationCard';
import polygon from 'assets/Polygon.svg';
import notif from 'assets/notif.svg';
import 'styles/main.scss';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };

    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive() {
    this.setState((prevState) => ({
      active: !prevState.active,
    }));
  }

  render() {
    return(
      <div className='notifications'>
        <div className='notifications--button' onClick={ this.toggleActive }>
          <div className='notifications--button-image'><img src={notif} alt="notification" /></div>
          <div className='notifications--button-number'>1</div>
        </div>
        { this.state.active ?
          <Fragment>
            <div className='notifications--polygon'><img src={ polygon } alt='ploygon' /></div>
            <div className='notifications--container'>
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
