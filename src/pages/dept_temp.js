import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/sidebar';
import Request from 'components/request/request';
import Upload from 'components/upload/upload';
import ActivityLog from 'components/activitylog/activityLog';
import CoursePage from 'components/coursecard/coursePage';
import CourseCover from 'components/cover/courseCover';
import Error from 'components/error/error';
import { getDepartmentInfoByAbbr } from 'api/departmentApi';
import { getCourseInfoByCode } from 'api/courseApi';
import { setUser, resetApp } from 'actions/actions';
import { loginUserWithToken, loginUserWithCookie } from 'api/userApi';
import { getCookie, removeCookie } from 'utils/handleCookies';
import ShowMoreFiles from 'components/header/showMoreFiles';
import { CONFIG } from 'config/config';

function mapStateToProps(state) {
  return { user: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
    resetApp: () => dispatch(resetApp())
  };
}

/**
 * Component to render different pages in Studyportal.
 */
class Department extends Component {
  constructor(props) {
      super(props);
      this.state = {
          login: props.user.login,
          path: props.location.pathname,
          request: false,
          upload: false,
          activity: false,
          mycourse: false,
          error: props.error,
          department: {
            title:'',
            id: '',
            abbr: props.match.params.department
          },
          course: {
            title: '',
            id: '',
            code: props.match.params.course,
            active: ''
          },
          courses: [],
          search: false,
          notifications: false,
          userMenu: false,
          showmore: false,
          searchfiles: [],
          searchquery: ''
      };

      this.handleClick = this.handleClick.bind(this);
      this.getUserDetails = this.getUserDetails.bind(this);
      this.getDepartmentsAndCourses = this.getDepartmentsAndCourses.bind(this);
      this.fetchAndUpdatePageInformation = this.fetchAndUpdatePageInformation.bind(this);
      this.handleSeeAllClick = this.handleSeeAllClick.bind(this);
      this.close = this.close.bind(this);
      this.error = this.error.bind(this);
      this.loginHandler = this.loginHandler.bind(this);
  }

  render() {
    return (
      <div>
          <Header />
          <Sidebar login={false}
                  department={this.state.department.title}
                  department_id={this.state.department.id}
                  department_abbr={this.state.department.abbr}
                  courses={this.state.courses}
                  active={this.state.course.active}
                  close={this.close}/>
          <Request request={this.state.request} close={this.close} refreshRequest={this.refreshRequest}/>
          <Upload upload={this.state.upload} close={this.close}/>
          {this.state.searchfiles.length ?
            <ShowMoreFiles files={this.state.searchfiles}
                          showmore={this.state.showmore}
                          searchquery={this.state.searchquery}
                          close={this.close}
                          handleClick={this.handleClick} /> : null}
          { this.state.course.code !== undefined ?
            <CoursePage login={this.state.login}
                        getUserDetails={this.getUserDetails}
                        course_code={this.props.match.params.course}
                        department_abbr={this.props.match.params.department}
                        file_type={this.props.match.params.file_type}
                        error={this.error}
                        close={this.close}/> : <CourseCover close={this.close}/> }
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Department);

Department.propTypes = {
  /** Holds user data which is handled through Redux. */
  user: PropTypes.object,
  /** URL of present location. */
  location: PropTypes.object,
  /** Sets 404 page. */
  error: PropTypes.bool,
  /** Sets user data in Redux. */
  setUser: PropTypes.func,
  /** Holds URL decriptors. */
  match: PropTypes.object,
  /** Resets the app to a new logged out session */
  resetApp: PropTypes.func
};
