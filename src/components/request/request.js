/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react'
import close from 'assets/closereq.png'
import { getDepartmentsList } from 'api/departmentApi'
import { getCourseByDepartment } from 'api/courseApi'
import { requestFiles, requestCourse } from 'api/requestApi'
import getToken from 'utils/getToken'
import small_loader from 'assets/loader_small.svg'
import check from 'assets/check.svg'
import 'styles/main.scss'
import { Link } from 'react-router-dom'

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'file', //Represents whether course or file tab is active
            disable: 0, //Enabling elements in file form
            disableCourse: 0, //Enabling elements in course form
            departments: [],
            courses: [],
            requesting: false,
            requested: false
        };

        this.switchToCourse = this.switchToCourse.bind(this);
        this.switchToFile = this.switchToFile.bind(this);
        this.file_active_course = this.file_active_course.bind(this);
        this.file_active_material = this.file_active_material.bind(this);
        this.active_name = this.active_name.bind(this);
        this.course_active_course = this.course_active_course.bind(this);
        this.course_active_courseid = this.course_active_courseid.bind(this);
        this.requestFile = this.requestFile.bind(this);
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

    switchToCourse() {
        this.setState({ type:'course' });
        this.setState({ disable: 0 })
    }

    switchToFile() {
        this.setState({ type:'file' });
        this.setState({ disableCourse: 0 })
    }

    file_active_course(e) {
        this.setState({ disable: 1 })
        getCourseByDepartment(e.target[e.target.selectedIndex].id).then((res,err) => {
          if(err) {
            //TODO handle error
          }
          else {
            this.setState({ courses:res })
          }
        })
    }

    file_active_material(e) {
        this.setState({ disable: 2 })
    }

    active_name() {
        this.setState({ disable: 3 })
    }

    course_active_course() {
        this.setState({ disableCourse: 1 })
    }

    course_active_courseid() {
        this.setState({ disableCourse: 2 })
    }

    requestFile(e) {
      e.preventDefault();
      const course = e.target.course[e.target.course.selectedIndex].id
      const material = e.target.material.value
      const name = e.target.name.value
      const token = getToken();
      if(course && material && name && token) {
        this.setState({ disable:-1,requesting:true });
        requestFiles(token,material,name,course).then((res,err) => {
          //TODO handle error
          this.setState({ requesting:false,requested:true })
        })
      }
    }

    requestCourse(e) {
      e.preventDefault();
      const department = e.target.department.value
      const course = e.target.course.value
      const code = e.target.code.value
      const token = getToken();
      requestCourse(token,department,course,code).then((res,err) => {
        //TODO handle error
        this.setState({ requesting:false,requested:true })
      })
    }

    render() {

        if (this.props.request) {
            return(
                <div className='requestcover'>
                        <div className='request'>
                        <div className='request--close' onClick={this.props.handleReq}><img src={close} alt='close'/></div>
                        <div className='request--heading'>Request</div>
                        <div className='request--underline'/>
                        <div className='request--instructions'><br/>To request file make sure to specify the material type and any name associated with it in the name text field.<br/>For example, to request 3rd Sem Examination Papers of CEN-204 CE, select <span style={{ fontWeight:'bold' }}>Examination Papers</span> and fill <span style={{ fontWeight:'bold' }}>“3rd Sem Examination Papers of CEN-204 Civil Eng”</span></div>
                        <div className='request--type'>Request Type</div>
                        {this.state.type === 'file' ?
                            (<Fragment>
                                <button className='request--filebutton-active' onClick={this.switchToFile}>File</button>
                                <button className='request--coursebutton-inactive'onClick={this.switchToCourse}>Courses</button>
                                <div className='request--form-file'>
                                    <form onSubmit={ this.requestFile }>
                                        <div className='file--department' style={{ color: this.state.disable >=0 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Department</div>
                                        <select className='file--department-select' onChange={this.file_active_course} disabled={ !(this.state.disable >= 0) } name='department'>
                                            <option>--Select Department--</option>
                                            { this.state.departments.map(department => (<option key={ department.id } id={ department.id }>{ department.title }</option>)) }
                                        </select>
                                        <div className='file--course' style={{ color: this.state.disable >=1 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Course Name</div>
                                        <select className='file--course-select' onChange={this.file_active_material} disabled={ !(this.state.disable >= 1) } name='course'>
                                            <option>--Select Course--</option>
                                            { this.state.courses.map(course => (<option key={ course.id } id={ course.id }>{ course.title} { course.code }</option>)) }
                                        </select>
                                        <div className='file--material' style={{ color: this.state.disable >=2 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Material Type</div>
                                            <div className='file--material_tut'>
                                                <input type='radio' name='material' value='Tutorial' onChange={this.active_name} className='radio' disabled={ !(this.state.disable >= 2) } />
                                            </div>
                                                <span className="tut" style={{ color: this.state.disable >=2 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Tutorial</span>
                                            <div className='file--material_books'>
                                                <input type='radio' name='material' value='Book' onChange={this.active_name} className='radio' disabled={ !(this.state.disable >= 2) } />
                                            </div>
                                            <span className="books" style={{ color: this.state.disable >=2 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Books</span>
                                            <div className='file--material_notes'>
                                                <input type='radio' name='material' value='Notes' onChange={this.active_name} className='radio' disabled={ !(this.state.disable >= 2) } />
                                            </div>
                                            <span className="notes" style={{ color: this.state.disable >=2 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Notes</span>
                                            <div className='file--material_exam'>
                                                <input type='radio' name='material' value='Examination Papers' onChange={this.active_name} className='radio' disabled={ !(this.state.disable >= 2) } />
                                            </div>
                                            <span className="exam" style={{ color: this.state.disable >=2 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Examination Papers</span>
                                        <div className='file--name' style={{ color: this.state.disable >=3 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Name</div>
                                        <input className="file--name-input" type='text' disabled={ !(this.state.disable >= 3) } name='name'/>
                                        {this.state.requested ? <div className='request--confirmation'><img className='request--confirmation-check' src={check} alt='check' /><span className='request--confirmation-text'>Request Placed Successfully</span><span className='request--confirmation-activity'>Check request status in <Link to='/activity/requests' className='linkactive'>Activity Log</Link></span></div> : <Fragment/>}
                                        {this.state.requested ? <button type='submit' className='request--button-file_requested'>Request More</button> : this.state.requesting ? <button type='submit' className='request--button-file_requesting'>Requesting <img className='request--loader' alt='loader' src={small_loader}/></button> : <button type='submit' className='request--button-file'>Request</button>}
                                    </form>
                                </div>
                            </Fragment>) :
                            (<Fragment>
                                <button className='request--filebutton-inactive' onClick={this.switchToFile}>File</button>
                                <button className='request--coursebutton-active'onClick={this.switchToCourse}>Courses</button>
                                <div className='request--form-course'>
                                <form onSubmit={ this.requestCourse }>
                                    <div className='course--department'>Department</div>
                                    <input className='course--department-input' type='text' name='department' onChange={this.course_active_course} />
                                    <div className='course--course' style={{ color: this.state.disableCourse >=1 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Course Name</div>
                                    <input className='course--course-input' type='text' name='course' onChange={this.course_active_courseid} disabled={ !(this.state.disableCourse >= 1) } />
                                    <div className='course--id' style={{ color: this.state.disableCourse >=2 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Course ID</div>
                                    <input className='course--id-input' type='text' name='code' disabled={ !(this.state.disableCourse >= 2) } />
                                    <button type='submit' className='request--button-course'>Request</button>
                                </form>
                            </div>
                        </Fragment>)
                    }
                    </div>
                </div>
            )
        }

        else {
            return(
                <Fragment />
            )
        }
    }
}

export default Request
