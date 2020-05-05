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
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
      this.fetchAndUpdatePageInformation(this.props);
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
      this.fetchAndUpdatePageInformation(nextProps);
    }

    /**
     * Fetch updated information for page and update state accordingly.
     *
     * @param {object} nextProps
     */
    fetchAndUpdatePageInformation(nextProps) {
      if (this.checkRoute(nextProps.location.pathname,'mycourse')) {
        this.setState({ activity: false, upload: false, request: false, mycourse: true });
        const department = this.getRouteParam(nextProps.location.pathname,'department');
        const course = this.getRouteParam(nextProps.location.pathname,'course');
        const file_type = this.getRouteParam(nextProps.location.pathname,'file');
        this.setState(prevState => ({
          department: {
            ...prevState.department,
            abbr: department
          },
          course: {
            ...prevState.course,
            code: course
          }
        }));
        this.getDepartmentsAndCourses(department, course, file_type);

      }
      else if(this.checkRoute(nextProps.location.pathname,'activity')) {
        if(this.checkParam(nextProps.match.params.type,'activity')) {
          this.setState({ activity:true,upload:false,request:false });
          this.getUserDetails();
        }
        else
          this.error();
      }
      else {
        this.setState({ activity:false });
        const department = nextProps.match.params.department;
        const course = nextProps.match.params.course;
        const file_type = nextProps.match.params.file_type;
        this.getDepartmentsAndCourses(department, course, file_type);
      }
    }

    /**
     * Fetch department info, course info and files according to url descriptors.
     *
     * @param {string} department
     * @param {string} course
     * @param {string} file_type
     */
    getDepartmentsAndCourses(department,course,file_type) {
      if (file_type === 'all' ||
          file_type === 'tutorials' ||
          file_type === 'books' ||
          file_type === 'notes' ||
          file_type === 'exampapers' ||
          file_type === undefined) {
            this.setState(prevState => ({
              course: {
                ...prevState.course,
                code: course
              }
            }));
        getDepartmentInfoByAbbr(department).then((res,err) => {
          if(err) {
            //TODO handle error
          }
          else {
            if(!res) {
              this.setState({ error:true });
            }
            else {
              this.setState(prevState => ({
                department: {
                  ...prevState.department,
                  title: res.department.title,
                  id: res.department.id,
                  abbr: res.department.abbreviation
                }
              }));
              this.setState({ courses:res.courses });
              if(course !== undefined) {
                getCourseInfoByCode(res.department.id,course).then((response,err) => {
                  if(err) {
                    //TODO handle error
                  }
                  else {
                    if(!response) {
                      this.setState({ error:true });
                    }
                    else {
                      this.setState(prevState => ({
                        course: {
                          ...prevState.course,
                          title: response.title,
                          id: response.id,
                          active: `${response.title} ${response.code}`
                        }
                      }));
                      this.getUserDetails();
                    }
                  }});}}}});}
      else
        this.error();
    }

    /**
     * Fetch user details.
     */
    getUserDetails() {
    const token = getCookie('token');
    const cookie = getCookie('sdslabs');
    if (token) {
      loginUserWithToken(token).then((res) => {
        const user = {
          login: true,
          id: res.user.falcon_id,
          username: res.user.username,
          email: res.user.email,
          profile_image: res.user.profile_image,
          courses: res.courses
        };
        if(!_.isEqual(user, this.props.user)) {
          this.props.setUser(user);
          // Logged in with token
        }
      })
        .catch(() => {
          // Token is corrupted
          if (cookie) {
            loginUserWithCookie().then((res) => {
              const user = {
                login: true,
                id: res.user.falcon_id,
                username: res.user.username,
                email: res.user.email,
                profile_image: res.user.profile_image,
                courses: res.courses
              };
              if(!_.isEqual(user, this.props.user)) {
                this.props.setUser(user);
                // Logged in with cookie and the invalid token replaced
              }
            })
              .catch(() => {
                this.props.resetApp();
                removeCookie('sdslabs');
                removeCookie('token');
                // The cookie is corrupted, both the token and the cookie have been removed
              });
          }
          else {
            this.props.resetApp();
            // No cookie present and the token is corrupted
            removeCookie('token');
          }
        });
    }
    else if (cookie) {
      loginUserWithCookie().then((res) => {
        const user = {
          login: true,
          id: res.user.falcon_id,
          username: res.user.username,
          email: res.user.email,
          profile_image: res.user.profile_image,
          courses: res.courses
        };
        if(!_.isEqual(user, this.props.user)) {
          this.props.setUser(user);
          // The user did not have the token but is logged in by the cookie and now the token has been created
        }
      })
        .catch(() => {
          this.props.resetApp();
          removeCookie('sdslabs');
          // The cookie is corrupted and removed
        });
    }
    else {
      this.props.resetApp();
      // Neither cookie nor token present
    }
  }

    /**
     * Toggle state of different modals.
     *
     * @param {string} component
     */
    handleClick(component) {
      if(component === 'search') {
        this.setState(prevState => ({
          search: !prevState.search
        }));
      }
      else if(component === 'notifications') {
        this.setState(prevState => ({
          notifications: !prevState.notifications
        }));
      }
      else if(component === 'userMenu') {
        this.setState(prevState => ({
          userMenu: !prevState.userMenu
        }));
      }
      else if(component === 'request') {
        this.setState({
          request:true,
          search:false,
          showmore:false
        });
      }
      else if(component === 'upload') {
        this.setState({ upload:true });
      }
    }

    /**
     * Handle render information of SeeAll modal.
     *
     * @param {array} files
     * @param {string} query
     */
    handleSeeAllClick(files,query){
      this.setState({
        showmore:true,
        searchquery:query,
        searchfiles: files,
        search:false
      });
    }

    /**
     * Switch to 404 page.
     */
    error () {
      this.setState({ error:true });
    }

    /**
     * Close modals.
     */
    close() {
      this.setState({ search:false });
      if(this.state.userMenu)
        this.setState({ userMenu:false });
      if(this.state.notifications)
        this.setState({ notifications:false });
      if(this.state.showmore)
        this.setState({ showmore:false });
      if(this.state.request)
        this.setState({ request:false });
      if(this.state.upload)
        this.setState({ upload:false });
    }

    /**
     * Check route for activity or mycourse page.
     *
     * @param {string} route
     * @param {string} param
     */
    checkRoute(route, param) {
      if(param === 'activity')
        return route.split('/')[1] === 'activity';
      else if(param === 'mycourse')
        return route.split('/')[1] === 'mycourse';
    }

    /**
     * Get route params for department route.
     *
     * @param {string} route
     * @param {string} param
     */
    getRouteParam(route, param) {
      if(param === 'department') {
        return route.split('/')[3];
      }
      else if(param === 'course') {
        return route.split('/')[5];
      }
      else if(param === 'file') {
        return route.split('/')[7];
      }
    }

    /**
     * Check different params for route.
     *
     * @param {string} route
     * @param {string} param
     */
    checkParam(route, param) {
      if(param === 'activity')
        return route === undefined || route === 'all' || route === 'requests' || route === 'uploads';
    }

    render() {
      if (!this.state.error) {
        if(this.state.mycourse && !this.state.activity)
          return (
            <div>
              <Header login={this.state.login}
                          search={this.state.search}
                          notifications={this.state.notifications}
                          userMenu={this.state.userMenu}
                          handleClick ={this.handleClick}
                          handleSeeAllClick={this.handleSeeAllClick}
                          close={this.close}/>
              <Sidebar activity='mycourse'
                      department={this.state.department.title}
                      department_id={this.state.department.id}
                      department_abbr={this.state.department.abbr}
                      courses={this.state.courses}
                      active={this.state.course.active}
                      close={this.close}
                      getUserDetails={this.getUserDetails}/>
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
                            course_code={this.getRouteParam(this.props.location.pathname,'course')}
                            department_abbr={this.getRouteParam(this.props.location.pathname,'department')}
                            userCourses={this.state.userCourses}
                            file_type={this.getRouteParam(this.props.location.pathname,'file')}
                            error={this.error}
                            close={this.close}/> : <CourseCover close={this.close}/> }
            </div>
          );
        else if(this.state.activity && !this.state.mycourse)
          return (
            <div>
              <Header login={this.state.login}
                          search={this.state.search}
                          notifications={this.state.notifications}
                          userMenu={this.state.userMenu}
                          handleClick ={this.handleClick}
                          handleSeeAllClick={this.handleSeeAllClick}
                          close={this.close}/>
              <Sidebar activity='activity'
                      active={this.props.match.params.type}
                      close={this.close}
                      getUserDetails={this.getUserDetails}/>
              <Request request={this.state.request} close={this.close} refreshRequest={this.refreshRequest}/>
              <Upload upload={this.state.upload} close={this.close}/>
              {this.state.searchfiles.length ?
                <ShowMoreFiles files={this.state.searchfiles}
                              showmore={this.state.showmore}
                              searchquery={this.state.searchquery}
                              close={this.close}
                              handleClick={this.handleClick} /> : null}
              <ActivityLog close={this.close} route={this.props.match.params.type}/>
            </div>
          );
        else
          return (
              <div>
                  <Header login={this.state.login}
                          search={this.state.search}
                          notifications={this.state.notifications}
                          userMenu={this.state.userMenu}
                          handleClick ={this.handleClick}
                          handleSeeAllClick={this.handleSeeAllClick}
                          close={this.close}/>
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
        else
            return (
              <div>
                  <Header login={this.state.login}
                          search={this.state.search}
                          notifications={this.state.notifications}
                          userMenu={this.state.userMenu}
                          handleClick ={this.handleClick}
                          handleSeeAllClick={this.handleSeeAllClick}
                          close={this.close}/>
                  <Request request={this.state.request} close={this.close} refreshRequest={this.refreshRequest}/>
                  <Upload upload={this.state.upload} close={this.close}/>
                  <Error close={this.close}/>
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
