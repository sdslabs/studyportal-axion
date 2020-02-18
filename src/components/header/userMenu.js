/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import polygon from 'assets/Polygon.svg'
import 'styles/main.scss'
import { Link } from 'react-router-dom'

class UserMenu extends Component {
  render() {
    return(
      <div className='usermenu'>
        <div className='usermenu--polygon'><img src={polygon} alt='polygon' /></div>
        <div className='usermenu--cover'>
          <div className='usermenu--request' onClick={this.props.handleReqClick}>Request</div>
          <div className='usermenu--upload' onClick={this.props.handleUploClick}>Upload</div>
          <Link to='/activity'><div className='usermenu--activitylog'>Activity Log</div></Link>
          <div className='usermenu--profile'>Profile</div>
          <div className='usermenu--logout'>Logout</div>
        </div>
      </div>
    )
  }
}

export default UserMenu
