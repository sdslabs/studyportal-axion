/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
import React, { Component,Fragment } from 'react'
import Search from './search'
import UserMenu from './userMenu'
import Notifications from './notifications'
import logo from 'assets/head_logo.png'
import search from 'assets/head_search.png'
import notif from 'assets/notif.png'
import userimg from 'assets/img_user.png'
import 'styles/main.scss'
import { Link } from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: props.login,
            value: '',
            userMenu: props.userMenu,
            notifications: props.notifications,
            search: false
        }

        this.result = this.result.bind(this);
        this.close = this.close.bind(this)
    }

    componentWillReceiveProps(props) {
        this.setState({ search: props.search })
        this.setState({ userMenu: props.userMenu })
        this.setState({ notifications: props.notifications })
    }

    result(e) {
        this.setState({ value: e.target.value })
        if (e.target.value !== '') {
            this.setState({ search: true })
        }
        else {
          this.setState({ search:false })
        }
    }

    close() {
      this.props.close()
      this.setState({ search:false })
      if(this.state.userMenu)
        this.setState({ userMenu:false })
      if(this.state.notifications)
        this.setState({ notifications:false })
    }

    render() {
        return(
            <div className='header' onClick={this.close} >
              <Link to='/'>
                <img className='header--logo' src={logo} alt="studyportal_logo" />
                <div className='header--heading'>Study Portal</div>
              </Link>
                <div className='header--search'>
                    <input className='header--search_bar' type="text" placeholder="Search file, courses, departments" onChange={this.result}/>
                    <button className='header--search_icon'><img src={search} alt='search' /></button>
                </div>
                <Search value={this.state.value} search={this.state.search} handleReqClick={this.props.handleReqClick} />
                {this.state.login ?
                    (<Fragment>
                        <Link to='/mycourse'><div className='header--mycourse'>My Course</div></Link>
                        <div className='header--mentors'>Mentors List</div>
                        <div className='header--notification' onClick={ this.props.toggleNotifications }>
                            <img className='header--notification_image' src={notif} alt="notification" /><span className='header--notification_number'>1</span>
                        </div>
                        { this.state.notifications ? <Notifications /> : <Fragment /> }
                        <img className='header--user' src={userimg} alt="image_user" onClick={this.props.toggleUserMenu} />
                        { this.state.userMenu ? <UserMenu handleReqClick={this.props.handleReqClick} handleUploClick={this.props.handleUploClick}/> : <Fragment /> }
                    </Fragment>) :
                    (<Fragment>
                        <Link to='/'><div className='header--home'>Home</div></Link>
                        <div className='header--request' onClick={this.props.handleReqClick}>Request Files</div>
                        <div className='header--upload' onClick={this.props.handleUploClick}>Upload Files</div>
                        <button className='header--login'>Login</button>
                        <button className='header--signup'>Sign Up</button>
                    </Fragment>)
                }
            </div>
        )
    }
}

export default Header
