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
    }

    componentWillMount() {
      const department = this.props.match.params.department
      const course = this.props.match.params.course
      this.setState({ course })
      getDepartmentInfoByAbbr(department).then((res,err) => {
        if(err) {
          //TODO handle error
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
                const course_title = `${response.title} ${response.code}`
                this.course = course_title
                this.setState({ course:course_title })
              }
            })
          }
          }
        })
      }

      componentWillReceiveProps(nextProps) {
        const course = nextProps.match.params.course
        getCourseInfoByCode(this.department_id,course).then((response,err) => {
          if(err) {
            //TODO handle error
          }
          else {
            const course_title = `${response.title} ${response.code}`
            this.course = course_title
            this.setState({ course:course_title })
          }
        })
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

    render() {
        return (
            <div>
                <Header login={this.state.login} search={this.state.search} handleReqClick={this.handleReqHeader} handleUploClick={this.handleUploHeader} />
                <Sidebar login={this.state.login} department={this.state.department} department_id={this.department_id} department_abbr={this.department_abbr} courses={this.state.courses} active={this.state.course}/>
                <Request request={this.state.request} handleReq={this.handleReq} />
                <Upload upload={this.state.upload} handleUplo={this.handleUplo} />
                { this.state.course !== undefined ? this.state.login ? <ActivityLog /> : <CoursePage course_code={this.props.match.params.course} department_abbr={this.props.match.params.department} file_type={this.props.match.params.file_type} /> : <CourseCover/>}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Department)
