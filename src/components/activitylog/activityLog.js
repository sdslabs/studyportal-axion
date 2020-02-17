import React, { Component } from 'react'
import ActivityReqCard from './activityReqCard'
import 'styles/main.scss'
import { getRequestsByUser } from 'api/requestApi';

class ActivityLog extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: props.user,
        requests: [],
        Uploads: []
      }
    }

    componentDidMount() {
      getRequestsByUser(6).then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.setState({ requests: res })
        }
      })
    }

    render() {
        return(
            <div className='activitylog' onClick={this.props.close}>
                <div className='activitylog--heading'>Activity Log</div>
                <div className='activitylog--heading_underline'/>
                <div className='activitylog--category'>
                    <div className='activitylog--category_all'><div>All<div className='activitylog--underline_all'/></div></div>
                    <div className='activitylog--category_request'><div>Requests<div className='activitylog--underline_request'/></div></div>
                    <div className='activitylog--category_upload'><div>Uploads<div className='activitylog--underline_upload'/></div></div>
                </div>
                <div className='activitylog--requestcards'>
                  { this.state.requests.map((request,index) => (<ActivityReqCard key={index} status={request.status} title={request.title} course={request.course.title} code={request.course.code} date={request.date} />)) }
                </div>
            </div>
        )
    }
}

export default ActivityLog
