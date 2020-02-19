/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import ActivityReqCard from './activityReqCard'
import 'styles/main.scss'
import { getFileRequestsByUser } from 'api/requestApi';
import { getUploadsByUser } from 'api/uploadApi';
import { Link } from 'react-router-dom';
import getToken from 'utils/getToken';

class ActivityLog extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: props.user,
        activity: [],
      };
      this.getActivity = this.getActivity.bind(this);
      this.getRequests = this.getRequests.bind(this);
    }

    componentDidMount() {
      this.getActivity(this.props.route);
    }

    componentWillReceiveProps(nextProps) {
      this.getActivity(nextProps.route)
    }

    getActivity(route) {
      const token = getToken();
      if(route === 'all' || route === undefined) {
        //TODO get both uploads and requests
        this.getAll(token);
      }
      else if(route === 'requests') {
        this.getRequests(token);
      }
      else {
        this.getUploads(token);
      }
    }

    getRequests(token) {
      this.setState({ activity:[] });
      getFileRequestsByUser(token).then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.setState({ activity: res })
        }
      })
    }

    getUploads(token) {
      this.setState({ activity:[] });
      getUploadsByUser(token).then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.setState({ activity:res })
        }
      })
    }

    getAll(token) {
      let activity = [];
      getUploadsByUser(token).then((response,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          response.forEach(upload => {
            activity.push(upload);
          });
          getFileRequestsByUser(token).then((res,err) => {
            if(err) {
              //TODO handle error
            }
            else {
              res.forEach(request => {
                activity.push(request);
              })
              // activity = this.arrangeActivity(activity);
              this.setState({ activity })
            }
          })
        }
      })
    }

    arrangeActivity(activity) {
      activity.sort((a,b) => {
        return a.date - b.date
      })
    }

    render() {
        return(
            <div className='activitylog' onClick={this.props.close}>
                <div className='activitylog--heading'>Activity Log</div>
                <div className='activitylog--heading_underline'/>
                <div className='activitylog--category'>
                    <Link to={`/activity/all`} className='link'>
                      <div className={this.props.route === 'all' || this.props.route === undefined ? 'activitylog--category_allselected' : 'activitylog--category_all'}>
                        <div>All<div className={this.props.route === 'all' || this.props.route === undefined ? 'activitylog--underline_selectedall' : 'activitylog--underline_noneall'}/></div>
                      </div>
                    </Link>
                    <Link to={`/activity/requests`} className='link'>
                      <div className={this.props.route === 'requests' ? 'activitylog--category_requestselected' : 'activitylog--category_request'}>
                        <div>Requests<div className={this.props.route === 'requests' ? 'activitylog--underline_selectedrequest' : 'activitylog--underline_nonerequest'}/></div>
                      </div>
                    </Link>
                    <Link to={`/activity/uploads`} className='link'>
                      <div className={this.props.route === 'uploads' ? 'activitylog--category_uploadselected' : 'activitylog--category_upload'}>
                        <div>Uploads<div className={this.props.route === 'uploads' ? 'activitylog--underline_selectedupload' : 'activitylog--underline_noneupload'}/></div>
                      </div>
                    </Link>
                </div>
                <div className='activitylog--activitycards'>
                  { this.state.activity.map((material,index) => (<ActivityReqCard key={index} status={material.status} title={material.title} course={material.course.title} code={material.course.code} date={material.date}/>)) }
                </div>
            </div>
        )
    }
}

export default ActivityLog
