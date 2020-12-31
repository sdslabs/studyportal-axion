import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from './search';
import UserMenu from 'components/common/userMenu';
import Notifications from 'components/common/notifications';
import Request from 'components/request/request';
import Upload from 'components/upload/upload';
import { CONFIG } from 'config/config';
import { TOGGLE_REQUEST, TOGGLE_UPLOAD } from 'constants/action-types';
import logo from 'assets/head_logo.png';
import 'styles/main.scss';
import { Link } from 'react-router-dom';

/**
 * Header component for Studyportal.
 */
const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const authenticate = (value) => {
      window.location.href = `${CONFIG.arceusRoot}/${value}?redirect=${window.location.href}`;
    };

    return(
        <div className='header'>
            <div className='header--content'>
                <div className='header--icon'>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <div className='header--logo'>
                            <div><img src={logo} alt="studyportal_logo" /></div>
                            <div className='header--heading'>Study Portal</div>
                        </div>
                    </Link>
                </div>
                <div className='header--search'>
                    <Search home={false} />
                </div>
                {user.login ?
                    (<Fragment>
                        <div className='header--home'><Link to='/'><span className='link'>Home</span></Link></div>
                        <div className='header--mycourse'><Link to='/mycourse'><span className='link'>My Course</span></Link></div>
                    </Fragment>) :
                    (<Fragment>
                        <div className='header--home'><Link to='/'><span className='link'>Home</span></Link></div>
                        <div className='header--request' onClick={() => dispatch({ type: TOGGLE_REQUEST })}>Request</div>
                        <div className='header--upload' onClick={() => dispatch({ type: TOGGLE_UPLOAD })}>Upload</div>
                    </Fragment>)
                }
            </div>
            <div className='header--userinfo'>
                {user.login ?
                    (<Fragment>
                        <div className='header--notification'>
                            <Notifications />
                        </div>
                        <div className='header--user'>
                            <UserMenu />
                        </div>
                    </Fragment>) :
                    (<Fragment>
                        <button className='header--login' onClick={() => authenticate('login')}>Login</button>
                        <button className='header--signup' onClick={() => authenticate('register')}>Sign Up</button>
                    </Fragment>)
                }
            </div>
            <Request />
            <Upload />
        </div>
    );
};

export default Header;
