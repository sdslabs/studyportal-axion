import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Search from './search';
import UserMenu from 'components/common/userMenu';
import Notifications from 'components/common/notifications';
import { TOGGLE_REQUEST, TOGGLE_UPLOAD, CLOSE_MODAL } from 'constants/action-types';
import logo from 'assets/head_logo.png';
import 'styles/main.scss';
import { Link } from 'react-router-dom';

/**
 * Header component for Studyportal.
 */
const Header = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const modal = useSelector((state) => state.modal);

    return(
        <div className='header' onClick={() => dispatch({ type: CLOSE_MODAL })}>
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
                            <Notifications notifications={modal.notifications}
                                handleClick={props.handleClick}
                                close={props.close}/>
                        </div>
                        <div className='header--user'>
                            <UserMenu />
                        </div>
                    </Fragment>) :
                    (<Fragment>
                        <button className='header--login' onClick={() => props.loginHandler('login')}>Login</button>
                        <button className='header--signup' onClick={() => props.loginHandler('register')}>Sign Up</button>
                    </Fragment>)
                }
            </div>
        </div>
    );
};

export default Header;

Header.propTypes = {
    /** Holds status of user-menu popup. */
    userMenu: PropTypes.bool,
    /** Holds status of notifications popup. */
    notifications: PropTypes.bool,
    /** Holds status of search result popup. */
    search: PropTypes.bool,
    /** Function to close modals. */
    close: PropTypes.func,
    /** Function to toggle state of modals. */
    handleClick: PropTypes.func,
    /** Function to toggle see-all modal. */
    handleSeeAllClick: PropTypes.func,
    /** Holds user data which is handled through Redux. */
    user: PropTypes.object,
    /** Function to login/register/logout */
    loginHandler: PropTypes.func
};
