/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import arrow from 'assets/left-arrow.png'
import CourseHandle from './courseHandle'
import 'styles/main.scss'
import { Link } from 'react-router-dom'
import { getDepartmentsList } from 'api/departmentApi'
import { getCourseByDepartment } from 'api/courseApi'
import { addCourseForUser } from 'api/userApi'

class Sidebar extends Component {
    constructor(props) {
        super(props);
      this.state = {
        login: props.login,
        departments: [],
        courses: [],
        course: 0
      };

        this.active = this.props.active;
        this.handleClick = this.handleClick.bind(this)
        this.getCourse = this.getCourse.bind(this)
        this.setCourse = this.setCourse.bind(this)
        this.addCourse = this.addCourse.bind(this)
    }

    componentDidMount() {
      getDepartmentsList().then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.setState({ departments:res })
        }
      })
    }

    componentWillReceiveProps(nextProps) {
      this.active = nextProps.active
    }

    handleClick(active) {
        this.active = active;
        this.forceUpdate();
    }

    getCourse(e) {
      getCourseByDepartment(e.target[e.target.selectedIndex].id).then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.setState({ courses:res })
        }
      })
    }

    setCourse(e) {
      this.setState({ course:e.target[e.target.selectedIndex].id })
    }

    addCourse(e) {
      e.preventDefault();
      const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRhcmtyaWRlciIsImVtYWlsIjoiZGFya3JpZGVyMjUxMDk5QGdtYWlsLmNvbSJ9.xBwh-abNBZTlxWDRjEs33DN2AjXlf21JkSwlez6dvGM"
      addCourseForUser(token,this.state.course).then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          //TODO handle success
        }
      })
    }

    render() {
        if (this.state.login) {
            return(
                <div className='sidebar' onClick={this.props.close}>
                    <div className='sidebar--course'>My Courses ({this.props.login})</div>
                    <Link to='/'>
                        <div className='sidebar--back'><img src={arrow} alt='arrow' /> Departments</div>
                    </Link>
                    <div className='sidebar--course-name'>
                        <div className='sidebar--course-table'>
                          { this.props.userCourses.map((course) => (
                            <Link to={ `/departments/${this.props.department_abbr}/courses/${course.code}/` } key={ course.id } style={{ textDecoration:'none' }}>
                                <CourseHandle login name={ `${course.title} ${course.code}` } title={course.title} code={course.code} course={course.id} active={this.active} handleClick={this.handleClick}/>
                            </Link>
                          )) }
                        </div>
                    </div>
                    <div className='sidebar--form-cover'>
                        <form className='sidebar--form' onSubmit={this.addCourse}>
                            <div className='sidebar--form-header'>Add Course</div>
                            <div className='sidebar--form-header_department'>Department</div>
                            <select className='sidebar--form-select_department' onChange={this.getCourse} name='department'>
                                <option>--Select Department--</option>
                                { this.state.departments.map(department => (<option key={ department.id } id={ department.id }>{ department.title }</option>)) }
                            </select>
                            <div className='sidebar--form-header_course'>Course Name</div>
                            <select className='sidebar--form-select_course' onChange={this.setCourse}>
                                <option>--Select Course--</option>
                                { this.state.courses.map(course => (<option key={ course.id } id={ course.id }>{ course.title} { course.code }</option>)) }
                            </select>
                            <button type='submit' className='sidebar--form-button'>Add Course</button>
                        </form>
                    </div>
                </div>
            )
        }

        else {
            return(
                <div className='sidebar' onClick={this.props.close}>
                    <div className='sidebar--course'>{this.props.department}</div>
                    <Link to='/'>
                        <div className='sidebar--back'><img src={arrow} alt='arrow' /> Departments</div>
                    </Link>
                    <div className='sidebar--course-name'>
                        <div className='sidebar--course-table_logout'>
                          { this.props.courses.map((course) => (
                            <Link to={ `/departments/${this.props.department_abbr}/courses/${course.code}/` } key={ course.id } style={{ textDecoration:'none' }}>
                                <CourseHandle login={false} name={ `${course.title} ${course.code}` } title={course.title} code={course.code} course={course.id} active={this.active} handleClick={this.handleClick}/>
                            </Link>
                          )) }
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Sidebar
