import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Search from './search';
import UserMenu from 'components/common/userMenu';
import Notifications from 'components/common/notifications';
import Request from 'components/request/request';
import Upload from 'components/upload/upload';
import { CONFIG } from 'config/config';
import logo from 'assets/head_logo.png';
import home from 'assets/home.svg';
import mycourses from 'assets/mycourses.svg';
import 'styles/main.scss';
import { Link } from 'react-router-dom';

/**
 * Header component for Studyportal.
 */
const Header = () => {
  const user = useSelector((state) => state.user);
  const authenticate = (value) => {
    window.location.href = `${CONFIG.authRoot}/authorize?response_type=token&client_id=${CONFIG.authClientId}&scope=openid%20profile%20email&redirect_uri=${CONFIG.authRedirect}`;

  };

  return (
    <div className="header">
      <div className="header--content">
        <div className="header--icon">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="header--logo">
              <div>
                <img src={logo} alt="studyportal_logo" />
              </div>
              <div className="header--heading">Study Portal</div>
            </div>
          </Link>
        </div>
        <div className="header--search">
          <Search home={false} />
        </div>
      </div>
      <div className="header--redirects">
        <div className="header--home">
          <Link to="/">
            <img src={home} alt="home" />
          </Link>
        </div>
        {user.login ? (
          <Fragment>
            <div className="header--mycourse">
              <Link to="/mycourse">
                <img src={mycourses} alt="my_courses" />
              </Link>
            </div>
          </Fragment>
        ) : null}
      </div>
      <div className="header--userinfo">
        {user.login ? (
          <Fragment>
            <div className="header--notification">
              <Notifications />
            </div>
            <div className="header--user">
              <UserMenu />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <button className="header--login" onClick={() => authenticate('login')}>
              Login
            </button>
            <button className="header--signup" onClick={() => authenticate('register')}>
              Sign Up
            </button>
          </Fragment>
        )}
      </div>
      <Request />
      <Upload />
    </div>
  );
};

export default Header;
