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
                          handleClick={this.props.handleClick}
                          close={this.props.close}/>
                      </div>
                    </div> :
                    <div className='landingheader--user_nologin'>
                      <button className='landingheader--login'>Login</button>
                      <button className='landingheader--signup'>Sign Up</button>
                    </div> }
            </div>
        );
    }
}

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  search: PropTypes.bool,
  close: PropTypes.func,
  notifications: PropTypes.bool,
  userMenu: PropTypes.bool,
  handleClick: PropTypes.func,
  handleSeeAllClick: PropTypes.func,
  user: PropTypes.object
};
