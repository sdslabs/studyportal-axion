/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import MaterialCard from './materialCard'
import CustomCheckbox from 'components/customcheckbox/customCheckbox'
import getFilesByCourse from 'api/filesApi'
import { getCourseInfoByCode } from 'api/courseApi'
import { getDepartmentInfoByAbbr } from 'api/departmentApi'
import 'styles/main.scss'

function mapStateToProps(state) {
  return { id: state.course.id, name: state.course.name }
}

class CoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mycourse: true,
            name: '',
            files: []
        }
    }

    componentWillMount() {
      this.setState({ name:this.props.course })
      getDepartmentInfoByAbbr(this.props.department_abbr).then((res,err) => {
        if(err) {
          window.alert("Something went wrong")
        }
        else {
          if (!res) {
            this.props.error()
          }
          else {
            if (this.props.course_code !== undefined) {
              getCourseInfoByCode(res.id,this.props.course_code).then((response,err) => {
                if(err) {
                  window.alert("Error occurred")
                }
                else {
                  if (!response) {
                    this.props.error()
                  }
                  else {
                    this.setState({ name:response.title,code:response.code })
                    getFilesByCourse(response.id).then((resp,err) => {
                      if(err) {
                        window.alert("Error occurred")
                      }
                      else {
                        this.setState({ files:resp })
                      }
                    })
                  }
                }
              })
            }
          }
        }
      })
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ name:nextProps.course })
      getDepartmentInfoByAbbr(nextProps.department_abbr).then((res,err) => {
        if(err) {
          window.alert("Something went wrong")
        }
        else {
          if (!res) {
            nextProps.error()
          }
          else {
            if (this.props.course_code !== undefined) {
              getCourseInfoByCode(res.id,this.props.course_code).then((response,err) => {
                if(err) {
                  window.alert("Error occurred")
                }
                else {
                  if (!response) {
                    nextProps.error()
                  }
                  else {
                    this.setState({ name:response.title,code:response.code })
                    getFilesByCourse(response.id).then((resp,err) => {
                      if(err) {
                        window.alert("Error occurred")
                      }
                      else {
                        this.setState({ files:resp })
                      }
                    })
                  }
                }
              })
            }
          }
        }
      })
    }

    render() {
        return(
            <div className='coursepage'>
                <div className="coursepage--head">{ this.state.name } { this.props.course_code }</div>
                <div className='coursepage--underline' />
                { !this.state.mycourse ?
                <div className='coursepage--addcourse'>+ Add Course</div> :
                <div className='coursepage--removecourse'>- Remove Course</div> }
                <div className='coursepage--category'>
                  {this.props.file_type === 'all' || this.props.file_type === undefined ? (
                    <div className='coursepage--category_all_'>
                      <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/all`} className='linkactive'>
                        <div>All<div className='coursepage--underline_all_'/></div>
                      </Link></div>
                  ) : (
                    <div className='coursepage--category_all'>
                      <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/all`} className='link'>
                        <div>All<div className='coursepage--underline_all'/></div>
                      </Link></div>
                  ) }
                  {this.props.file_type === 'tutorials' ? (
                    <div className='coursepage--category_tut_'>
                      <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/tutorials`} className='linkactive'>
                        <div>Tutorials<div className='coursepage--underline_tut_'/></div>
                      </Link></div>
                  ) : (
                    <div className='coursepage--category_tut'>
                      <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/tutorials`} className='link'>
                        <div>Tutorials<div className='coursepage--underline_tut'/></div>
                      </Link></div>
                  ) }
                  {this.props.file_type === 'books' ? (
                    <div className='coursepage--category_books_'>
                      <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/books`} className='linkactive'>
                        <div>Books<div className='coursepage--underline_books_'/></div>
                      </Link></div>
                  ) : (
                    <div className='coursepage--category_books'>
                      <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/books`} className='link'>
                        <div>Books<div className='coursepage--underline_books'/></div>
                      </Link></div>
                  ) }
                    {this.props.file_type === 'notes' ? (
                    <div className='coursepage--category_notes_'>
                      <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/notes`} className='linkactive'>
                        <div>Notes<div className='coursepage--underline_notes_'/></div>
                      </Link></div>
                  ) : (
                    <div className='coursepage--category_notes'>
                      <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/notes`} className='link'>
                        <div>Notes<div className='coursepage--underline_notes'/></div>
                      </Link></div>
                  ) }
                    {this.props.file_type === 'exampapers' ? (
                    <div className='coursepage--category_exam_'>
                      <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/exampapers`} className='linkactive'>
                        <div>Examination Papers<div className='coursepage--underline_exam_'/></div>
                      </Link></div>
                  ) : (
                    <div className='coursepage--category_exam'>
                      <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/exampapers`} className='link'>
                        <div>Examination Papers<div className='coursepage--underline_exam'/></div>
                      </Link></div>
                  ) }
                </div>
                <div className='coursepage--material-sort'>
                    <div className='coursepage--material-sort_checkbox'>
                      <CustomCheckbox border='1px solid rgba(43, 42, 40, 0.4)' borderhover='1px solid #38A7DE'/>
                    </div>
                    <div className='coursepage--material-sort_name'>Name</div>
                    <div className='coursepage--material-sort_size'>Size</div>
                    <div className='coursepage--material-sort_lastmod'>Last Modified</div>
                </div>
                <div className='coursepage--material'>
                    { this.state.files.map((file) => (
                      <MaterialCard name={ file.name } location={ file.path } downloads={ file.download }  />
                    )) }
                    <div className='coursepage--material_year'>2017</div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CoursePage)
