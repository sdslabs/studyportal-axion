import React,{ Component } from 'react'
import NotificationCard from './notificationCard'
import polygon from 'assets/Polygon.svg'
import 'styles/main.scss'

class Notifications extends Component {
  render() {
    return(
      <div className='notifications'>
        <div className='notifications--polygon'><img src={ polygon } alt='ploygon' /></div>
        <div className='notifications--container'>
          <NotificationCard/>
          <NotificationCard/>
          <NotificationCard/>
        </div>
      </div>
    )
  }
}

export default Notifications
