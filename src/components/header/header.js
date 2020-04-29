import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from './search';
import UserMenu from 'components/common/userMenu';
import Notifications from 'components/common/notifications';
import logo from 'assets/head_logo.png';
import 'styles/main.scss';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
    return { user: state };
};

/**
 * Header component for Studyportal.
 */
class Header extends Component {
    render() {
        return(
            <div className='header' onClick={this.props.close}>
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
                        <Search home={false}
                            search={this.props.search}
                            close = {this.props.close}
                            handleClick = {this.props.handleClick}
                            handleSeeAllClick = {this.props.handleSeeAllClick}/>
                    </div>
                    {this.props.user.login ?
                        (<Fragment>
                            <div className='header--home'><Link to='/'><span className='link'>Home</span></Link></div>
                            <div className='header--mycourse'><Link to='/mycourse'><span className='link'>My Course</span></Link></div>
                        </Fragment>) :
                        (<Fragment>
                            <div className='header--home'><Link to='/'><span className='link'>Home</span></Link></div>
                            <div className='header--request' onClick={() => this.props.handleClick('request')}>Request</div>
                            <div className='header--upload' onClick={() => this.props.handleClick('upload')}>Upload</div>
                        </Fragment>)
                    }
                </div>
                <div className='header--userinfo'>
                    {this.props.user.login ?
                        (<Fragment>
                            <div className='header--notification'>
                                <Notifications notifications={this.props.notifications}
                                    handleClick={this.props.handleClick}
                                    close={this.props.close}/>
                            </div>
                            <div className='header--user'>
                                <UserMenu userMenu={this.props.userMenu}
                                    handleClick={this.props.handleClick}
                                    close={this.props.close}/>
                            </div>
                        </Fragment>) :
                        (<Fragment>
                            <button className='header--login'>Login</button>
                            <button className='header--signup'>Sign Up</button>
                        </Fragment>)
                    }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Header);

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
    user: PropTypes.object
};
