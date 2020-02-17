/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import MaterialCard from './materialCard'
import CustomCheckbox from 'components/customcheckbox/customCheckbox'
import { getFilesByCourse,getFilesByType } from 'api/filesApi'
import { getCourseInfoByCode } from 'api/courseApi'
import { getDepartmentInfoByAbbr } from 'api/departmentApi'
import 'styles/main.scss'

function mapStateToProps(state) {
  // return { id: state.course.id, name: state.course.name }
}

class CoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mycourse: true,
            name: '',
            login: false,
            files: [],
        }
        this.filemap = {
          "tutorials": "Tutorials",
          "books": "Book",
          "notes": "Notes",
          "exampapers": "Examination Papers"
        }
    }

    componentWillMount() {
      getDepartmentInfoByAbbr(this.props.department_abbr).then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          if(!res) {
            this.props.error()
          }
          else {
            if (this.props.course_code !== undefined || this.props.file_type === 'all') {
              getCourseInfoByCode(res.department.id,this.props.course_code).then((response,err) => {
                if(err) {
                  //TODO handle error
                }
                else {
                  if(!response) {
                    this.props.error()
                  }
                  else {
                    this.setState({ name:response.title,code:response.code })
                    if (this.props.file_type === undefined)
                    getFilesByCourse(response.id).then((resp,err) => {
                      if(err) {
                        //TODO handle error
                      }
                      else {
                        this.setState({ files:resp })
                      }
                    })
                    else
                    getFilesByType(response.id,this.filemap[this.props.file_type]).then((resp,err) => {
                      if(err) {
                        //TODO handle error
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
      getDepartmentInfoByAbbr(nextProps.department_abbr).then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          if(!res) nextProps.error()
          else
          getCourseInfoByCode(res.department.id,nextProps.course_code).then((response,err) => {
            if(err) {
              //TODO handle error
            }
            else {
              if(!response) nextProps.error()
              else {
                this.setState({ name:response.title })
                if (nextProps.file_type === undefined || nextProps.file_type === 'all')
                getFilesByCourse(response.id).then((resp,err) => {
                  if(err) {
                    //TODO handle error
                  }
                  else {
                    this.setState({ files:resp })
                  }
                })
                else
                getFilesByType(response.id,this.filemap[nextProps.file_type]).then((resp,err) => {
                  if(err) {
                    //TODO handle error
                  }
                  else {
                    this.setState({ files:resp })
                  }
                })
              }
            }
          })
        }
      })
    }

    render() {
        return(
            <div className='coursepage'>
                <div className="coursepage--head">{ this.state.name } { this.props.course_code }</div>
                <div className='coursepage--underline' />
                { this.state.login ? <span>{ !this.state.mycourse ?
                <div className='coursepage--addcourse'>+ Add Course</div> :
                <div className='coursepage--removecourse'>- Remove Course</div> }</span> : null}
                <div className='coursepage--category'>
                    <div className={this.props.file_type === 'all' || this.props.file_type === undefined ? 'coursepage--category_all_' : 'coursepage--category_all'}>
                      <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/all`} className={this.props.file_type === 'all' || this.props.file_type === undefined ? 'linkactive' : 'link'}>
                        <div>All<div className={this.props.file_type === 'all' || this.props.file_type === undefined ? 'coursepage--underline_all_' : 'coursepage--underline_all'}/></div>
                      </Link>
                    </div>
                    <div className={this.props.file_type === 'tutorials' ? 'coursepage--category_tut_' : 'coursepage--category_tut'}>
                      <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/tutorials`} className={this.props.file_type === 'tutorials' ? 'linkactive' : 'link'}>
                        <div>Tutorials<div className={this.props.file_type === 'tutorials' ? 'coursepage--underline_tut_' : 'coursepage--underline_tut'}/></div>
                      </Link>
                    </div>
                    <div className={this.props.file_type === 'books' ? 'coursepage--category_books_' : 'coursepage--category_books'}>
                      <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/books`} className={this.props.file_type === 'books' ? 'linkactive' : 'link'}>
                        <div>Books<div className={this.props.file_type === 'books' ? 'coursepage--underline_books_' : 'coursepage--underline_books'}/></div>
                      </Link>
                    </div>
                    <div className={this.props.file_type === 'notes' ? 'coursepage--category_notes_' : 'coursepage--category_notes'}>
                      <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/notes`} className={this.props.file_type === 'notes' ? 'linkactive' : 'link'}>
                        <div>Notes<div className={this.props.file_type === 'notes' ? 'coursepage--underline_notes_' : 'coursepage--underline_notes'}/></div>
                      </Link>
                    </div>
                    <div className={this.props.file_type === 'exampapers' ? 'coursepage--category_exam_' : 'coursepage--category_exam'}>
                      <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/exampapers`} className={this.props.file_type === 'exampapers' ? 'linkactive' : 'link'}>
                        <div>Examination Papers<div className={this.props.file_type === 'exampapers' ? 'coursepage--underline_exam_' : 'coursepage--underline_exam'}/></div>
                      </Link>
                    </div>
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
                      <MaterialCard name={ file.title } url={ file.driveid } downloads={ file.downloads } size={ file.size } date_modified={ file.date_modified } />
                    )) }
                    <div className='coursepage--material_year'>2017</div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CoursePage)
