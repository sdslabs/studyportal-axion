import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from 'components/header/header'
import Sidebar from 'components/sidebar/sidebar'
import Request from 'components/request/request'
import Upload from 'components/upload/upload'
import ActivityLog from 'components/activitylog/activityLog'
import CoursePage from 'components/coursecard/coursePage'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: props.login,
            request: false,
            upload: false,
            search: false,
            userMenu: false,
            notifications: false
        }

        this.handleReq = this.handleReq.bind(this);
        this.handleReqHeader = this.handleReqHeader.bind(this);
        this.handleUplo = this.handleUplo.bind(this);
        this.handleUploHeader = this.handleUploHeader.bind(this);
        this.toggleUserMenu = this.toggleUserMenu.bind(this)
        this.toggleNotifications = this.toggleNotifications.bind(this)
        this.close = this.close.bind(this);
    }

    handleReqHeader () {
        this.setState({ request: true });
    }

    handleReq () {
        this.setState({ request: false });
    }

    handleUploHeader () {
        this.setState({ upload: true });
    }

    handleUplo () {
        this.setState({ upload: false });
    }

    toggleUserMenu() {
      this.setState({ userMenu:!this.state.userMenu })
    }

    toggleNotifications() {
      this.setState({ notifications:!this.state.notifications })
    }

    close() {
        this.setState({ search: false })
        if(this.state.userMenu)
          this.setState({ userMenu: false })
        if(this.state.notifications)
          this.setState({ notifications: false })
    }

    render() {
        return (
            <div onClick={this.closeSearch}>
                <Header login={this.state.login} search={this.state.search} userMenu={this.state.userMenu} notifications={this.state.notifications} handleReqClick={this.handleReqHeader} 
                handleUploClick={this.handleUploHeader} toggleUserMenu={this.toggleUserMenu} toggleNotifications={this.toggleNotifications} />
                <Sidebar login={this.state.login} />
                <Request request={this.state.request} handleReq={this.handleReq} />
                <Upload upload={this.state.upload} handleUplo={this.handleUplo} />
                { this.state.login ? <ActivityLog /> : <CoursePage /> }
            </div>
        )
    }
}

Test.propTypes = {
    login: PropTypes.bool
}

export default Test
