import React, { Component } from 'react'
import ActivityReqCard from './activityReqCard'
import '../../styles/main.scss'

class ActivityLog extends Component {
    render() {
        return(
            <div className='activitylog'>
                <div className='activitylog--heading'>Activity Log</div>
                <div className='activitylog--heading_underline'/>
                <div className='activitylog--category'>
                    <div className='activitylog--category_all'><div>All<div className='activitylog--underline_all'/></div></div>
                    <div className='activitylog--category_request'><div>Requests<div className='activitylog--underline_request'/></div></div>
                    <div className='activitylog--category_upload'><div>Uploads<div className='activitylog--underline_upload'/></div></div>
                </div>
                <div className='activitylog--requestcards'>
                    <ActivityReqCard status='2' />
                    <ActivityReqCard status='3' />
                    <ActivityReqCard status='2' />
                </div>
            </div>
        )
    }
}

export default ActivityLog
