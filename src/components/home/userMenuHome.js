/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import polygon from 'assets/Polygon.svg'
import 'styles/main.scss'
import { Link } from 'react-router-dom'

class UserMenuHome extends Component {
  render() {
    return(
      <div className='usermenuhome'>
        <div className='usermenuhome--polygon'><img src={polygon} alt='polygon' /></div>
        <div className='usermenuhome--cover'>
          <div className='usermenuhome--request' onClick={this.props.handleReqClick}>Request</div>
          <div className='usermenuhome--upload' onClick={this.props.handleUploClick}>Upload</div>
          <Link to='/activity'><div className='usermenuhome--activitylog'>Activity Log</div></Link>
          <div className='usermenuhome--profile'>Profile</div>
          <div className='usermenuhome--logout'>Logout</div>
        </div>
      </div>
    )
  }
}

export default UserMenuHome
