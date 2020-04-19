import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserMenu from 'components/common/userMenu';
import Notifications from 'components/common/notifications';
import logo from 'assets/studyportal_logo.png';
import sds_logo from 'assets/sds_logo.svg';
import search from 'assets/search.png';
import 'styles/main.scss';

class Header extends Component {
    render() {
        return (
            <div className='landingheader' onClick={this.props.close}>
                    <div className='landingheader--logo_sds'><img src={sds_logo} alt='sdslogo'/></div>
                    <div className='landingheader--main'>
                      <div className='landingheader--logo'><img src={logo} alt='studyportal_logo'/></div>
                      <div className='landingheader--heading'>Study Portal</div>
                      <div className='landingheader--caption'>The Solutions Portal of IITR</div>
                      <div className='landingheader--search'>
                          <input className='landingheader--search_bar' type="text" placeholder="Search tutorials, books, notes, courses..." />
                          <button className='landingheader--search_icon'><img src={search} alt='search' /></button>
                      </div>
                    </div>
                    { this.props.login ?
                    <div className='landingheader--user_loggedin'>
                      <div className='landingheader--notifications'><Notifications/></div>
                      <div className='landingheader--user'><UserMenu/></div>
                    </div> :
                    <div className='landingheader--user_nologin'>
                      <button className='landingheader--login'>Login</button>
                      <button className='landingheader--signup'>Sign Up</button>
                    </div> }
            </div>
        );
    }
}

export default Header;

Header.propTypes = {
  close: PropTypes.func,
  login: PropTypes.bool
};
