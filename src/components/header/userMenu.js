import React, { Component } from 'react'
import polygon from 'assets/Polygon.svg'
import 'styles/main.scss'

class UserMenu extends Component {
  render() {
    return(
      <div className='usermenu'>
        <div className='usermenu--polygon'><img src={polygon} alt='polygon' /></div>
        <div className='usermenu--cover'>
          <div className='usermenu--request'>Request</div>
          <div className='usermenu--upload'>Upload</div>
          <div className='usermenu--activitylog'>Activity Log</div>
          <div className='usermenu--profile'>Profile</div>
          <div className='usermenu--logout'>Logout</div>
        </div>
      </div>
    )
  }
}

export default UserMenu
