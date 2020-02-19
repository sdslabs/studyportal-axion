import React, { Component, Fragment } from 'react'
import UserMenuHome from 'components/home/userMenuHome'
import logo from 'assets/studyportal_logo.png'
import sds_logo from 'assets/sds_logo.png'
import upload from 'assets/upload.png'
import request from 'assets/request.png'
import search from 'assets/search.png'
import 'styles/main.scss'

class Header extends Component {
    render() {
        return (
            <div className='landingheader' onClick={this.props.close}>
                    <img className='landingheader--logo_sds' src={sds_logo} alt='sdslogo'/>
                    <img className='landingheader--logo' src={logo} alt='studyportal_logo' />
                    <div className='landingheader--heading'>Study Portal</div>
                    <div className='landingheader--search'>
                        <input className='landingheader--search_bar' type="text" placeholder="Search tutorials, books, notes, courses..." />
                        <button className='landingheader--search_icon'><img src={search} alt='search' /></button>
                    </div>
                    <button className='landingheader--request'><img className='landingheader--request_image' src={request} alt='request' /> Request</button>
                    <button className='landingheader--upload'><img className='landingheader--upload_image' src={upload} alt='upload' /> Upload</button>
                    { this.props.login ?
                    <Fragment>
                      <img className='landingheader--image' src={this.props.user.profile_image} onClick={this.props.toggleUserMenu}/>
                      {this.props.userMenu ? <UserMenuHome/> : <Fragment/>}
                    </Fragment> :
                    <Fragment>
                      <button className='landingheader--login'>Login</button>
                      <button className='landingheader--signup'>Sign Up</button>
                    </Fragment> }
            </div>
        )
    }
}

export default Header
