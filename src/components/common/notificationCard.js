import React,{ Component } from 'react'
import 'styles/main.scss'

class NotificationCard extends Component {
  render() {
    return(
        <div className='notifications--card'>
            <div className='notifications--card-description'>4 new files added in Structutal Analysis CEN-204. Click to check them.</div>
            <div className='notifications--card-date'>07-18-19</div>
            <div className='notifications--card-page'>My Course</div>
        </div>
    )
  }
}

export default NotificationCard;
