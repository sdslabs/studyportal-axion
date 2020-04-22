import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import polygon from 'assets/Polygon.svg';
import 'styles/main.scss';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
  return { user: state };
};

class UserMenu extends Component {
  render() {
    return(
      <div className='usermenu'>
        <div className='usermenu--image'>
          <img src={this.props.user.profile_image}
          alt='user' onClick={() => this.props.handleClick('userMenu')}/>
        </div>
        { this.props.userMenu ?
        <div className='usermenu--container'>
          <div className='usermenu--polygon'><img src={polygon} alt='polygon' /></div>
          <div className='usermenu--cover' onClick={this.props.close}>
            <div className='usermenu--request' onClick={() => this.props.handleClick('request')}>Request</div>
            <div className='usermenu--upload' onClick={() => this.props.handleClick('upload')}>Upload</div>
            <Link to='/activity' style={{ textDecoration: 'none' }}>
              <div className='usermenu--activitylog link'>Activity Log</div>
            </Link>
            <div className='usermenu--profile'><a href='http://accounts.sdslabs.co' className='link'>Profile</a></div>
            <div className='usermenu--logout'>Logout</div>
          </div>
        </div> :
        <Fragment/> }
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserMenu);

UserMenu.propTypes = {
  user: PropTypes.object,
  userMenu: PropTypes.bool,
  handleClick: PropTypes.func,
  close: PropTypes.func
};
