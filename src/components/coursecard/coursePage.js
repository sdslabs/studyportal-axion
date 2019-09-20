/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
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
            id_course: 0,
            files: []
        }
    }

    componentWillMount() {
        this.setState({ name:this.props.course })
        filesApi(this.props.id_course).then((res,err) => {
            if(err) {
              window.alert("Error occurred")
            }
            else {
              this.setState({ files:res })
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        const id_course = nextProps.id_course
        if(id_course !== this.state.id ) {
            this.setState({ name:nextProps.course })
            filesApi(id_course).then((res,err) => {
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
                    <div className='coursepage--category_all'><div>All<div className='coursepage--underline_all'/></div></div>
                    <div className='coursepage--category_tut'><div>Tutorials<div className='coursepage--underline_tut'/></div></div>
                    <div className='coursepage--category_books'><div>Books<div className='coursepage--underline_books'/></div></div>
                    <div className='coursepage--category_notes'><div>Notes<div className='coursepage--underline_notes'/></div></div>
                    <div className='coursepage--category_exam'><div>Examination Papers<div className='underline_exam'/></div></div>
                </div>
                <div className='coursepage--material-sort'>
                    <div className='coursepage--material-sort_checkbox'><CustomCheckbox border='1px solid rgba(43, 42, 40, 0.4)' borderhover='1px solid #38A7DE'/></div>
                    <div className='coursepage--material-sort_name'>Name</div>
                    <div className='coursepage--material-sort_size'>Size</div>
                    <div className='coursepage--material-sort_lastmod'>Last Modified</div>
                </div>
                <div className='coursepage--material'>
                    { this.state.files.map((file) => (
                      <MaterialCard name={ file.name } downloads={ file.download }  />
                    )) }
                    <div className='coursepage--material_year'>2017</div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CoursePage)
