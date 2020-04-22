import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import download from 'assets/download.svg';
import blue from 'assets/coursedot.png';
import green from 'assets/green_status.svg';
import yellow from 'assets/yellow_status.svg';
import 'styles/main.scss';

class ActivityCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.status
        };
    }

    getMonth(month) {
      if(month === '01')
        return 'Jan';
      else if(month === '02')
        return 'Feb';
      else if(month === '03')
        return 'Mar';
      else if(month === '04')
        return 'Apr';
      else if(month === '05')
        return 'May';
      else if(month === '06')
        return 'Jun';
      else if(month === '07')
        return 'Jul';
      else if(month === '08')
        return 'Aug';
      else if(month === '09')
        return 'Sep';
      else if(month === '10')
        return 'Oct';
      else if(month === '11')
        return 'Nov';
      else if(month === '12')
        return 'Dec';

    }

    parseDate(date) {
        if(date) {
          let datePart = date.match(/\d+/g);
          let month = this.getMonth(`${datePart[1]}`);
          let dateString = `${datePart[2]}th ${month}, ${datePart[0]}`;
          return dateString;
        }
    }

    render() {
        return(
            <div className='activitycard'>
                <div className='activitycard--info'>
                  <div className='activitycard--info_date'>
                    <span className='activitycard--info_head'>{this.props.type === 'request' ? 'Requested On: ' : 'Uploaded On: '}</span>
                    {this.parseDate(this.props.date)}
                  </div>
                    <div className='activitycard--info_name'>
                        <span className='activitycard--info_head'>Name: </span>
                        <span className='activitycard--info_heading'>{this.props.title}</span>
                    </div>
                    <div className='activitycard--course'><span>{this.props.code}</span><span> . </span><span>{this.props.course}</span></div>
                </div>
                {this.state.status === 1 ?
                (<Fragment>
                    <div className='activitycard--status_blue'>
                      <img className='activitycard--status_color' src={blue} alt='blue'/> Request Filed ({this.state.status}/3)
                    </div>
                    <div className='activitycard--file'/>
                </Fragment>) :
                this.state.status === 2 ?
                (<Fragment>
                    <div className='activitycard--status_yellow'>
                      <img className='activitycard--status_color' src={yellow} alt='yellow'/> Request Approved ({this.state.status}/3)
                    </div>
                    <div className='activitycard--file'/>
                </Fragment>) :
                (<Fragment>
                    <div className='activitycard--status_green'>
                      <img className='req_color' src={green} alt='green'/> Files Uploaded ({this.state.status}/3)
                    </div>
                    <div className='activitycard--file'>
                      <img className='activitycard--file_download' src={download} alt='download'/>  Tutorial 1 Structural Analysis CEN-207
                    </div>
                </Fragment>)}
            </div>
        );
    }
}

export default ActivityCard;

ActivityCard.propTypes = {
  status: PropTypes.number,
  type: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  code: PropTypes.string,
  course: PropTypes.string
};
