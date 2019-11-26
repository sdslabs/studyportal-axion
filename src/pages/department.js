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

function mapStateToProps(state) {
    return { department: state.department }
}

class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.login,
            request: false,
            upload: false,
            error: props.error,
            department: '',
            course: '',
            courses: []
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
        this.error = this.error.bind(this);
    }

    componentWillMount() {
      if (this.props.match.params.file_type === 'all' || this.props.match.params.file_type === 'all' || this.props.match.params.file_type === 'tutorials' || this.props.match.params.file_type === 'books' || this.props.match.params.file_type === 'notes' || this.props.match.params.file_type === 'exampapers' || this.props.match.params.file_type === undefined) {
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
                      this.setState({error:true})
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

    componentWillReceiveProps(nextProps) {
      if (this.props.match.params.file_type === 'all' || this.props.match.params.file_type === 'all' || this.props.match.params.file_type === 'tutorials' || this.props.match.params.file_type === 'books' || this.props.match.params.file_type === 'notes' || this.props.match.params.file_type === 'exampapers' || this.props.match.params.file_type === undefined) {
        const course = nextProps.match.params.course
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

    render() {
      if (!this.state.error)
        return (
            <div>
                <Header login={this.state.login} search={this.state.search} handleReqClick={this.handleReqHeader} handleUploClick={this.handleUploHeader} />
                <Sidebar login={this.state.login} department={this.state.department} department_id={this.department_id} department_abbr={this.department_abbr} courses={this.state.courses} active={this.state.course}/>
                <Request request={this.state.request} handleReq={this.handleReq} />
                <Upload upload={this.state.upload} handleUplo={this.handleUplo} />
                { this.state.course !== undefined ? this.state.login ? <ActivityLog /> : <CoursePage course_code={this.props.match.params.course} department_abbr={this.props.match.params.department} file_type={this.props.match.params.file_type} error={this.error}/> : <CourseCover/>}
            </div>
        )
      else
          return (
            <div>
                <Header login={this.state.login} search={this.state.search} handleReqClick={this.handleReqHeader} handleUploClick={this.handleUploHeader} />
                <Error />
            </div>
          )
    }
}

export default connect(mapStateToProps)(Department)
