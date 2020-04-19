/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import polygon from 'assets/Polygon.svg';
import 'styles/main.scss';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
  return { user: state };
};

class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive() {
    this.setState(prevState => ({
      active: !prevState.active
    }));
  }

  render() {
    return(
      <div className='usermenu'>
        <div className='usermenu--image'>
          <img src={this.props.user.profile_image}
          alt='user' onClick={this.toggleActive}/>
        </div>
        { this.state.active ?
        <div className='usermenu--container'>
          <div className='usermenu--polygon'><img src={polygon} alt='polygon' /></div>
          <div className='usermenu--cover'>
            <div className='usermenu--request' onClick={this.props.handleReqClick}>Request</div>
            <div className='usermenu--upload' onClick={this.props.handleUploClick}>Upload</div>
            <Link to='/activity' style={{ textDecoration: 'none' }}>
              <div className='usermenu--activitylog'>Activity Log</div>
            </Link>
            <div className='usermenu--profile'>Profile</div>
            <div className='usermenu--logout'>Logout</div>
          </div>
        </div> :
        <Fragment/> }
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserMenu);
