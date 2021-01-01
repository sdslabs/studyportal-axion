import React from 'react';
import { useSelector } from 'react-redux';
import { CONFIG } from 'config/config';
import Search from 'components/header/search';
import UserMenu from 'components/common/userMenu';
import Notifications from 'components/common/notifications';
import Request from 'components/request/request';
import Upload from 'components/upload/upload';
import logo from 'assets/studyportal_logo.png';
import sds_logo from 'assets/logo.svg';
import 'styles/main.scss';

/**
 * Header component for Studyportal homepage.
 */
const Header = () => {
    const user = useSelector((state) => state.user);
    const authenticate = (value) => {
      window.location.href = `${CONFIG.arceusRoot}/${value}?redirect=${window.location.href}`;
    };

    return (
        <div className='landingheader'>
          <div className='landingheader--logo_sds'><img src={sds_logo} alt='sdslogo'/></div>
          <div className='landingheader--main'>
            <div className='landingheader--logo'><img src={logo} alt='studyportal_logo'/></div>
            <div className='landingheader--heading'>Study Portal</div>
            <div className='landingheader--caption'>The Solutions Portal of IITR</div>
            <div className='landingheader--search'>
              <Search />
            </div>
          </div>
          { user.login ?
          <div className='landingheader--user_loggedin'>
            <div className='landingheader--notifications'>
              <Notifications />
            </div>
            <div className='landingheader--user'>
              <UserMenu />
            </div>
          </div> :
          <div className='landingheader--user_nologin'>
            <button className='landingheader--login' onClick={() => authenticate('login')}>Login</button>
            <button className='landingheader--signup' onClick={() => authenticate('register')}>Sign Up</button>
          </div> }
          <Request />
          <Upload />
        </div>
    );
};

export default Header;
