import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { setUser } from 'actions/actions';
import { loginUserWithToken, loginUserWithCookie } from 'api/userApi';
import { getCookie } from 'utils/handleCookies';
import ShowMoreFiles from 'components/header/showMoreFiles';

function mapStateToProps(state) {
    return { user: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch(setUser(user))
  };
}

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
            department: '',
            course: '',
            course_name: '',
            courses: [],
            userCourses: [],
            user: {}, //TODO remove after checking redux
            notifications: false,
            userMenu: false,
            showmore: false,
            searchfiles: [],
            searchquery: ''
        };
        this.department = '';
        this.department_id = '';
        this.department_abbr = '';
        this.course = '';
        this.course_id = '';
        this.course_code = '';

        this.handleClick = this.handleClick.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);
        this.getDepartmentsAndCourses = this.getDepartmentsAndCourses.bind(this);
        this.getDepartmentsAndCoursesForMyCourse = this.getDepartmentsAndCoursesForMyCourse.bind(this);
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

    fetchAndUpdatePageInformation(nextProps) {
      if (this.checkMyCourseRoute(nextProps.location.pathname)) {
        this.setState({ activity: false, upload: false, request: false, mycourse: true });
        const department = this.getRouteParam(nextProps.location.pathname,'department');
        const course = this.getRouteParam(nextProps.location.pathname,'course');
        const file_type = this.getRouteParam(nextProps.location.pathname,'file');
        this.setState({ department, course });
        this.getDepartmentsAndCoursesForMyCourse(department, course, file_type);

      }
      else if(this.checkActivityRoute(nextProps.location.pathname)) {
        if(this.checkActivityParam(nextProps.match.params.type)) {
          this.setState({ activity:true,upload:false,request:false });
          // this.getUserDetails();
        }
        else
          this.error();
      }
      else {
        this.setState({ activity:false });
        this.getDepartmentsAndCourses(nextProps);
      }
    }

    getDepartmentsAndCoursesForMyCourse(department,course,file_type) {
      if (file_type === 'all' ||
          file_type === 'tutorials' ||
          file_type === 'books' ||
          file_type === 'notes' ||
          file_type === 'exampapers' ||
          file_type === undefined) {
        this.setState({ course });
        getDepartmentInfoByAbbr(department).then((res,err) => {
          if(err) {
            //TODO handle error
          }
          else {
            if(!res) {
              this.setState({ error:true });
            }
            else {
              this.setState({ department:res.department.title });
              this.department_id = res.department.id;
              this.department_abbr = res.department.abbreviation;
              this.setState({ courses:res.courses });
              if(course !== undefined) {
                getCourseInfoByCode(this.department_id,course).then((response,err) => {
                  if(err) {
                    //TODO handle error
                  }
                  else {
                    if(!response) {
                      this.setState({ error:true });
                    }
                    else {
                      const course_title = `${response.title} ${response.code}`;
                      this.course = course_title;
                      this.setState({ course_name:course_title });
                    }
                  }});}}}});}
      else
        this.error();
    }

    getDepartmentsAndCourses(props) {
      if (props.match.params.file_type === 'all' ||
          props.match.params.file_type === 'tutorials' ||
          props.match.params.file_type === 'books' ||
          props.match.params.file_type === 'notes' ||
          props.match.params.file_type === 'exampapers' ||
          props.match.params.file_type === undefined) {
        const department = props.match.params.department;
        const course = props.match.params.course;
        this.setState({ course });
        getDepartmentInfoByAbbr(department).then((res,err) => {
          if(err) {
            //TODO handle error
          }
          else {
            if(!res) {
              this.setState({ error:true });
            }
            else {
              this.setState({ department:res.department.title });
              this.department_id = res.department.id;
              this.department_abbr = res.department.abbreviation;
              this.setState({ courses:res.courses });
              if(course !== undefined) {
                getCourseInfoByCode(this.department_id,course).then((response,err) => {
                  if(err) {
                    //TODO handle error
                  }
                  else {
                    if(!response) {
                      this.setState({ error:true });
                    }
                    else {
                      const course_title = `${response.title} ${response.code}`;
                      this.course = course_title;
                      this.setState({ course_name:course_title });
                      this.getUserDetails();
                    }
                  }});}}}});}
      else
        this.error();
    }

    getUserDetails() {
      const token = getCookie('token');
      if(token) {
        loginUserWithToken(token).then((res,err) => {
          if(err) {
            //TODO handle error
          }
          else {
            this.props.setUser(res);
          }
        });
      }
      else {
        loginUserWithCookie();
      }
    }

    handleClick(component) {
      if(component === 'notifications') {
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

    handleSeeAllClick(files,query){
      this.setState({
        showmore:true,
        searchquery:query,
        searchfiles: files,
        search:false
      });
    }

    error () {
      this.setState({ error:true });
    }

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

    checkActivityRoute(route) {
      return route.split('/')[1] === 'activity';
    }

    checkMyCourseRoute(route) {
      return route.split('/')[1] === 'mycourse';
    }

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

    checkActivityParam(route) {
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
                      department={this.state.department}
                      department_id={this.department_id}
                      department_abbr={this.department_abbr}
                      courses={this.state.courses}
                      userCourses={this.state.userCourses}
                      active={this.state.course}
                      close={this.close}
                      getUserDetails={this.getUserDetails}/>
              <Request request={this.state.request} close={this.close} refreshRequest={this.refreshRequest}/>
              <Upload upload={this.state.upload} close={this.close}/>
              {this.state.searchfiles.length ?
                <ShowMoreFiles files={this.state.searchfiles}
                              showmore={this.state.showmore}
                              searchquery={this.state.searchquery}
                              handleSeeAll={this.handleSeeAll}
                              handleReqClick={this.handleReqHeader} /> : null}
              { this.state.course !== undefined ?
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
                      department={this.state.department}
                      department_id={this.department_id}
                      department_abbr={this.department_abbr}
                      courses={this.state.courses}
                      userCourses={this.state.userCourses}
                      active={this.state.course}
                      close={this.close}
                      getUserDetails={this.getUserDetails}/>
              <Request request={this.state.request} close={this.close} refreshRequest={this.refreshRequest}/>
              <Upload upload={this.state.upload} close={this.close}/>
              {this.state.searchfiles.length ?
                <ShowMoreFiles files={this.state.searchfiles}
                              showmore={this.state.showmore}
                              searchquery={this.state.searchquery}
                              handleSeeAll={this.handleSeeAll}
                              handleReqClick={this.handleReqHeader} /> : null}
              <ActivityLog user={this.state.user} close={this.close} route={this.props.match.params.type}/>
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
                          department={this.state.department}
                          department_id={this.department_id}
                          department_abbr={this.department_abbr}
                          courses={this.state.courses}
                          userCourses={this.state.userCourses}
                          active={this.state.course}
                          close={this.close}/>
                  <Request request={this.state.request} close={this.close} refreshRequest={this.refreshRequest}/>
                  <Upload upload={this.state.upload} close={this.close}/>
                  {this.state.searchfiles.length ?
                    <ShowMoreFiles files={this.state.searchfiles}
                                  showmore={this.state.showmore}
                                  searchquery={this.state.searchquery}
                                  close={this.close}
                                  handleClick={this.handleClick} /> : null}
                  { this.state.course !== undefined ?
                    <CoursePage login={this.state.login}
                                getUserDetails={this.getUserDetails}
                                course_code={this.props.match.params.course}
                                department_abbr={this.props.match.params.department}
                                userCourses={this.state.userCourses}
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
  user: PropTypes.object,
  location: PropTypes.object,
  error: PropTypes.bool,
  setUser: PropTypes.func,
  match: PropTypes.object
};
