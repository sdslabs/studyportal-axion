/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import MaterialCard from './materialCard'
import CustomCheckbox from 'components/customcheckbox/customCheckbox'
import filesApi from 'api/filesApi'
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
        filesApi(this.props.course_id).then((res,err) => {
            if(err) {
              window.alert("Error occurred")
            }
            else {
              this.setState({ files:res })
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        const course_id = nextProps.course_id
        if(course_id !== this.state.id ) {
            this.setState({ name:nextProps.course })
            filesApi(course_id).then((res,err) => {
                if(err) {
                  window.alert("Error occurred")
                }
                else {
                  this.setState({ files:res })
                }
            })
        }
    }

    render() {
        return(
            <div className='coursepage'>
                <div className="coursepage--head">{ this.state.name }</div>
                <div className='coursepage--underline' />
                { !this.state.mycourse ? <div className='coursepage--addcourse'>+ Add Course</div> : <div className='coursepage--removecourse'>- Remove Course</div> }
                <div className='coursepage--category'>
                  {this.props.file_type === 'all' || this.props.file_type === undefined ? (
                    <div className='coursepage--category_all'><Link to={`/${this.props.department}/id=${this.props.department_id}/${this.props.course}/id=${this.props.course_id}/all`} style={{ textDecoration:'none',color:'#38A7DE',fontWeight:'bold' }}><div>All<div className='coursepage--underline_all' style={{ border:'0.0625rem solid #38A7DE' }}/></div></Link></div>
                  ) : (
                    <div className='coursepage--category_all'><Link to={`/${this.props.department}/id=${this.props.department_id}/${this.props.course}/id=${this.props.course_id}/all`} style={{ textDecoration:'none',color:'#2B2A28' }}><div>All<div className='coursepage--underline_all' style={{ border:'0.0625rem solid #FFFFFF' }}/></div></Link></div>
                  ) }
                  {this.props.file_type === 'tutorials' ? (
                    <div className='coursepage--category_tut'><Link to={`/${this.props.department}/id=${this.props.department_id}/${this.props.course}/id=${this.props.course_id}/tutorials`} style={{ textDecoration:'none',color:'#38A7DE',fontWeight:'bold' }}><div>Tutorials<div className='coursepage--underline_tut' style={{ border:'0.0625rem solid #38A7DE' }}/></div></Link></div>
                  ) : (
                    <div className='coursepage--category_tut'><Link to={`/${this.props.department}/id=${this.props.department_id}/${this.props.course}/id=${this.props.course_id}/tutorials`} style={{ textDecoration:'none',color:'#2B2A28' }}><div>Tutorials<div className='coursepage--underline_tut' style={{ border:'0.0625rem solid #FFFFFF' }}/></div></Link></div>
                  ) }
                  {this.props.file_type === 'books' ? (
                    <div className='coursepage--category_books'><Link to={`/${this.props.department}/id=${this.props.department_id}/${this.props.course}/id=${this.props.course_id}/books`} style={{ textDecoration:'none',color:'#38A7DE',fontWeight:'bold' }}><div>Books<div className='coursepage--underline_books' style={{ border:'0.0625rem solid #38A7DE' }}/></div></Link></div>
                  ) : (
                    <div className='coursepage--category_books'><Link to={`/${this.props.department}/id=${this.props.department_id}/${this.props.course}/id=${this.props.course_id}/books`} style={{ textDecoration:'none',color:'#2B2A28' }}><div>Books<div className='coursepage--underline_books' style={{ border:'0.0625rem solid #FFFFFF' }}/></div></Link></div>
                  ) }
                    {this.props.file_type === 'notes' ? (
                    <div className='coursepage--category_notes'><Link to={`/${this.props.department}/id=${this.props.department_id}/${this.props.course}/id=${this.props.course_id}/notes`} style={{ textDecoration:'none',color:'#38A7DE',fontWeight:'bold' }}><div>Notes<div className='coursepage--underline_notes' style={{ border:'0.0625rem solid #38A7DE' }}/></div></Link></div>
                  ) : (
                    <div className='coursepage--category_notes'><Link to={`/${this.props.department}/id=${this.props.department_id}/${this.props.course}/id=${this.props.course_id}/notes`} style={{ textDecoration:'none',color:'#2B2A28' }}><div>Notes<div className='coursepage--underline_notes' style={{ border:'0.0625rem solid #FFFFFF' }}/></div></Link></div>
                  ) }
                    {this.props.file_type === 'exampapers' ? (
                    <div className='coursepage--category_exam'><Link to={`/${this.props.department}/id=${this.props.department_id}/${this.props.course}/id=${this.props.course_id}/exampapers`} style={{ textDecoration:'none',color:'#38A7DE',fontWeight:'bold' }}><div>Examination Papers<div className='coursepage--underline_exam' style={{ border:'0.0625rem solid #38A7DE' }}/></div></Link></div>
                  ) : (
                    <div className='coursepage--category_exam'><Link to={`/${this.props.department}/id=${this.props.department_id}/${this.props.course}/id=${this.props.course_id}/exampapers`} style={{ textDecoration:'none',color:'#2B2A28' }}><div>Examination Papers<div className='coursepage--underline_exam' style={{ border:'0.0625rem solid #FFFFFF' }}/></div></Link></div>
                  ) }
                </div>
                <div className='coursepage--material-sort'>
                    <div className='coursepage--material-sort_checkbox'><CustomCheckbox border='1px solid rgba(43, 42, 40, 0.4)' borderhover='1px solid #38A7DE'/></div>
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
