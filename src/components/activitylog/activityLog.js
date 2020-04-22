import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActivityCard from './activityCard';
import 'styles/main.scss';
import { getFileRequestsByUser } from 'api/requestApi';
import { getUploadsByUser } from 'api/uploadApi';
import { getCookie } from 'utils/handleCookies';

class ActivityLog extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activity: []
      };
      this.routeMap = {
        'all': 'All Activity Log',
        'requests': 'Requests Log',
        'uploads': 'Uploads Log'
      };
      this.getActivity = this.getActivity.bind(this);
      this.getRequests = this.getRequests.bind(this);
    }

    componentDidMount() {
      this.getActivity(this.props.route);
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
      this.getActivity(nextProps.route);
    }

    getActivity(route) {
      const token = getCookie('token');
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
      let activity = [];
      this.setState({ activity });
      getFileRequestsByUser(token).then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          res.forEach(request => {
            activity.push({ type:'request', activity:request });
          });
          this.setState({ activity });
        }
      });
    }

    getUploads(token) {
      let activity = [];
      this.setState({ activity });
      getUploadsByUser(token).then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          res.forEach(upload => {
            activity.push({ type:'upload', activity:upload });
          });
          this.setState({ activity });
        }
      });
    }

    getAll(token) {
      let activity = [];
      getUploadsByUser(token).then((response,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          response.forEach(upload => {
            activity.push({ type:'upload', activity:upload });
          });
          getFileRequestsByUser(token).then((res,err) => {
            if(err) {
              //TODO handle error
            }
            else {
              res.forEach(request => {
                activity.push({ type:'request', activity:request });
              });
              // activity = this.arrangeActivity(activity);
              this.setState({ activity });
            }
          });
        }
      });
    }

    arrangeActivity(activity) {
      activity.sort((a,b) => {
        return a.date - b.date;
      });
    }

    render() {
        return(
            <div className='activitylog' onClick={this.props.close}>
                <div className='activitylog--heading'>
                  {this.props.route !== undefined ? this.routeMap[this.props.route] : this.routeMap.all}
                </div>
                <div className='activitylog--heading_underline'/>
                <div className='activitylog--activitycards'>
                  { this.state.activity.map((material,index) => (
                    <ActivityCard key={index}
                      type={material.type}
                      status={material.activity.status}
                      title={material.activity.title}
                      course={material.activity.course.title}
                      code={material.activity.course.code}
                      date={material.activity.date}/>
                  )) }
                </div>
            </div>
        );
    }
}

export default ActivityLog;

ActivityLog.propTypes = {
  route: PropTypes.string,
  close: PropTypes.func
};
