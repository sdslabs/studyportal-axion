/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from 'components/header/header'
import Sidebar from 'components/sidebar/sidebar'
import Request from 'components/request/request'
import Upload from 'components/upload/upload'
import ActivityLog from 'components/activitylog/activityLog'
import CoursePage from 'components/coursecard/coursePage'
import CourseCover from 'components/cover/courseCover'
import Error from 'components/error/error'
import { getDepartmentInfoByAbbr } from 'api/departmentApi'
import { getCourseInfoByCode } from 'api/courseApi'
import { getCourse, getEmail, getId, getProfileImage, getUser, getUsername } from 'actions/actions'
import { loginUserWithToken, loginUserWithCookie } from 'api/userApi'

function mapStateToProps(state) {
    return { user: state }
}

function mapDispatchToProps(dispatch) {
  return {
    getCourse: course => dispatch(getCourse(course)),
    getEmail: email => dispatch(getEmail(email)),
    getId: id => dispatch(getId(id)),
    getProfileImage: profileImage => dispatch(getProfileImage(profileImage)),
    getUser: user => dispatch(getUser(user)),
    getUsername: username => dispatch(getUsername(username))
  }
}

class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: props.login,
            path: props.location.pathname,
            request: false,
            upload: false,
            error: props.error,
            department: '',
            course: '',
            courses: [],
            userCourses: [],
            user: {}, //TODO remove after checking redux
            notifications: false,
            userMenu: false
        }
        this.department = ''
        this.department_id = ''
        this.department_abbr = ''
        this.course = ''
        this.course_id = ''
        this.course_code = ''

        this.handleReq = this.handleReq.bind(this);
        this.handleReqHeader = this.handleReqHeader.bind(this);
        this.handleUplo = this.handleUplo.bind(this);
        this.handleUploHeader = this.handleUploHeader.bind(this);
        this.toggleNotifications = this.toggleNotifications.bind(this);
        this.toggleUserMenu = this.toggleUserMenu.bind(this);
        this.close = this.close.bind(this);
        this.error = this.error.bind(this);
    }

    componentWillMount() {
      if (this.props.match.params.file_type === 'all' || this.props.match.params.file_type === 'tutorials' || this.props.match.params.file_type === 'books' || this.props.match.params.file_type === 'notes' || this.props.match.params.file_type === 'exampapers' || this.props.match.params.file_type === undefined) {
        const department = this.props.match.params.department
        const course = this.props.match.params.course
        this.setState({ course })
        getDepartmentInfoByAbbr(department).then((res,err) => {
          if(err) {
            //TODO handle error
          }
          else {
            if(!res) {
              this.setState({ error:true })
            }
            else {
              this.setState({ department:res.department.title })
              this.department_id = res.department.id
              this.department_abbr = res.department.abbreviation
              this.setState({ courses:res.courses })
              if(course !== undefined) {
                getCourseInfoByCode(this.department_id,course).then((response,err) => {
                  if(err) {
                    //TODO handle error
                  }
                  else {
                    if(!response) {
                      this.setState({ error:true })
                    }
                    else {
                      const course_title = `${response.title} ${response.code}`
                      this.course = course_title
                      this.setState({ course:course_title })
                    }
                  }
                })
              }
            }
          }
        })
        if(true) {  //TODO check whether with token or cookie
          const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRhcmtyaWRlciIsImVtYWlsIjoiZGFya3JpZGVyMjUxMDk5QGdtYWlsLmNvbSJ9.xBwh-abNBZTlxWDRjEs33DN2AjXlf21JkSwlez6dvGM"
          loginUserWithToken(token).then((res,err) => {
            if(err) {
              //TODO handle error
            }
            else {
              this.setState({ userCourses: res.courses, user: res })
            }
          })
        }
        else {
          loginUserWithCookie()
        }
      }
      else
        this.error()
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.match.params.file_type === 'all' || nextProps.match.params.file_type === 'tutorials' || nextProps.match.params.file_type === 'books' || nextProps.match.params.file_type === 'notes' || nextProps.match.params.file_type === 'exampapers' || nextProps.match.params.file_type === undefined) {
        const department = nextProps.match.params.department
        const course = nextProps.match.params.course
        this.setState({ course })
        getDepartmentInfoByAbbr(department).then((res,err) => {
          if(err) {
            //TODO handle error
          }
          else {
            if(!res) {
              this.setState({ error:true })
            }
            else {
              this.setState({ department:res.department.title })
              this.department_id = res.department.id
              this.department_abbr = res.department.abbreviation
              this.setState({ courses:res.courses })
              if(course !== undefined) {
                getCourseInfoByCode(this.department_id,course).then((response,err) => {
                  if(err) {
                    //TODO handle error
                  }
                  else {
                    if(!response) {
                      this.setState({ error:true })
                    }
                    else {
                      const course_title = `${response.title} ${response.code}`
                      this.course = course_title
                      this.setState({ course:course_title })
                    }
                  }
                })
              }
            }
          }
        })
      }
      else
        this.error()
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

    error () {
      this.setState({ error:true })
    }

    toggleNotifications() {
      this.setState({ notifications:!this.state.notifications })
    }

    toggleUserMenu() {
      this.setState({ userMenu:!this.state.notifications })
    }

    close() {
      this.setState({ search:false })
      if(this.state.userMenu)
        this.setState({ userMenu:false })
      if(this.state.notifications)
        this.setState({ notifications:false })
    }

    checkActivityRoute(route) {
      return route.split('/')[1] === 'activity'
    }

    render() {
      if (!this.state.error) {
        if(this.checkActivityRoute(this.props.location.pathname))
          return (
            <div>
              <Header login={this.state.login} search={this.state.search} handleReqClick={this.handleReqHeader} handleUploClick={this.handleUploHeader} notifications={this.state.notifications} userMenu={this.state.userMenu} toggleNotifications={this.toggleNotifications} toggleUserMenu={this.toggleUserMenu} close={this.close}/>
              <Sidebar login department={this.state.department} department_id={this.department_id} department_abbr={this.department_abbr} courses={this.state.courses} userCourses={this.state.userCourses} active={this.state.course} close={this.close}/>
              <Request request={this.state.request} handleReq={this.handleReq} />
              <Upload upload={this.state.upload} handleUplo={this.handleUplo} />
              <ActivityLog user={this.state.user} close={this.close}/>
            </div>
          )
        else
          return (
              <div>
                  <Header login={this.state.login} search={this.state.search} handleReqClick={this.handleReqHeader} handleUploClick={this.handleUploHeader} notifications={this.state.notifications} userMenu={this.state.userMenu} toggleNotifications={this.toggleNotifications} toggleUserMenu={this.toggleUserMenu} close={this.close}/>
                  <Sidebar login={false} department={this.state.department} department_id={this.department_id} department_abbr={this.department_abbr} courses={this.state.courses} userCourses={this.state.userCourses} active={this.state.course} close={this.close}/>
                  <Request request={this.state.request} handleReq={this.handleReq} />
                  <Upload upload={this.state.upload} handleUplo={this.handleUplo} />
                  { this.state.course !== undefined ? <CoursePage course_code={this.props.match.params.course} department_abbr={this.props.match.params.department} file_type={this.props.match.params.file_type} error={this.error} close={this.close}/> : <CourseCover close={this.close}/> }
              </div>
          )
      }
        else
            return (
              <div>
                  <Header login={this.state.login} search={this.state.search} handleReqClick={this.handleReqHeader} handleUploClick={this.handleUploHeader} notifications={this.state.notifications} userMenu={this.state.userMenu} toggleNotifications={this.toggleNotifications} toggleUserMenu={this.toggleUserMenu} close={this.close}/>
                  <Error close={this.close}/>
              </div>
            )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Department)
