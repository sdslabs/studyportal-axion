import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CONFIG } from 'config/config';
import { removeCookie } from 'utils/handleCookies';
import polygon from 'assets/Polygon.svg';
import 'styles/main.scss';
import { Link } from 'react-router-dom';
import {
  TOGGLE_REQUEST,
  TOGGLE_UPLOAD,
  TOGGLE_USERMENU,
  CLOSE_USERMENU,
  RESET_APP,
} from 'constants/action-types';

/**
 * User-Menu component for Studyportal.
 */
const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const modal = useSelector((state) => state.modal);

  /**
   * Logout user.
   */
  const logout = () => {
    dispatch({ type: RESET_APP });
    window.location.href = CONFIG.studyRoot;
    removeCookie('token');
    removeCookie('sdslabs');
  };

  return (
    <div className="usermenu">
      <div className="usermenu--image" onClick={() => dispatch({ type: TOGGLE_USERMENU })}>
        <img className="usermenu--image-profile" src={user.profile_image} alt="user" />
        <p>Account</p>
      </div>
      {modal.userMenu ? (
        <div className="usermenu--container" onClick={() => dispatch({ type: CLOSE_USERMENU })}>
          <div className="usermenu--polygon">
            <img src={polygon} alt="polygon" />
          </div>
          <div className="usermenu--cover">
            <div className="usermenu--request" onClick={() => dispatch({ type: TOGGLE_REQUEST })}>
              Request
            </div>
            <div className="usermenu--upload" onClick={() => dispatch({ type: TOGGLE_UPLOAD })}>
              Upload
            </div>
            <Link to="/activity" style={{ textDecoration: 'none' }}>
              <div className="usermenu--activitylog link">Activity Log</div>
            </Link>
            <div className="usermenu--profile">
              <a href="http://accounts.sdslabs.co" className="link">
                Profile
              </a>
            </div>
            <div className="usermenu--logout" onClick={logout}>
              Logout
            </div>
          </div>
        </div>
      ) : (
        <Fragment />
      )}
    </div>
  );
};

export default UserMenu;
