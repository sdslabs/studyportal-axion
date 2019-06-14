import React, {Component} from 'react'
import ActivityReqCard from './activityReqCard'
import '../styles/activityLog.scss'

class ActivityLog extends Component {
    render() {
        return(
            <div className="activitylog">
                <div className="activity_head">Activity Log</div>
                <div className='activity_und'></div>
                <div className='activity_cat'>
                    <div className='activity_cat_all'><div>All<div className='und_all'></div></div></div>
                    <div className='activity_cat_req'><div>Requests<div className='und_request'></div></div></div>
                    <div className='activity_cat_uplo'><div>Uploads<div className='und_uplo'></div></div></div>
                </div>
                <div className='activityreq'>
                    <ActivityReqCard status='2' />
                    <ActivityReqCard status='3' />
                </div>
            </div>
        )
    }
}

export default ActivityLog