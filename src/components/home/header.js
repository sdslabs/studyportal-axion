import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Search from 'components/header/search';
import UserMenu from 'components/common/userMenu';
import Notifications from 'components/common/notifications';
import logo from 'assets/studyportal_logo.png';
import sds_logo from 'assets/sds_logo.svg';
import 'styles/main.scss';

const mapStateToProps = state => {
  return { user: state };
};

/**
 * Header component for Studyportal homepage.
 */
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
                        <Search home
                            search={this.props.search}
                            close = {this.props.close}
                            handleClick = {this.props.handleClick}
                            handleSeeAllClick = {this.props.handleSeeAllClick}/>
                      </div>
                    </div>
                    { this.props.user.login ?
                    <div className='landingheader--user_loggedin'>
                      <div className='landingheader--notifications'>
                        <Notifications notifications={this.props.notifications}
                          handleClick={this.props.handleClick}
                          close={this.props.close}/>
                      </div>
                      <div className='landingheader--user'>
                        <UserMenu userMenu={this.props.userMenu}
                          loginHandler={this.props.loginHandler}
                          handleClick={this.props.handleClick}
                          close={this.props.close}/>
                      </div>
                    </div> :
                    <div className='landingheader--user_nologin'>
                      <button className='landingheader--login' onClick={() => this.props.loginHandler('login')}>Login</button>
                      <button className='landingheader--signup' onClick={() => this.props.loginHandler('register')}>Sign Up</button>
                    </div> }
            </div>
        );
    }
}

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  /** Holds status of search result popup. */
  search: PropTypes.bool,
  /** Function to close modals. */
  close: PropTypes.func,
  /** Holds status of notifications popup. */
  notifications: PropTypes.bool,
  /** Holds status of user-menu popup. */
  userMenu: PropTypes.bool,
  /** Function to toggle state of modals. */
  handleClick: PropTypes.func,
  /** Function to toggle see-all modal. */
  handleSeeAllClick: PropTypes.func,
  /** Holds user data which is handled through Redux. */
  user: PropTypes.object,
  /** Function to login/register/logout */
  loginHandler: PropTypes.func
};
