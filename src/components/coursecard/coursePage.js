import React, { Component } from 'react'
import MaterialCard from './materialCard'
import CustomCheckbox from 'components/customcheckbox/customCheckbox'
import 'styles/main.scss'

class CoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mycourse: true
        }
    }

    render() {
        return(
            <div className='coursepage'>
                <div className="coursepage--head">Structural Analysis CEN-207</div>
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
                    <MaterialCard />
                    <MaterialCard />
                    <div className='coursepage--material_year'>2017</div>
                </div>
            </div>
        )
    }
}

export default CoursePage
