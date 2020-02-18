/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */
import React, { Component,Fragment } from 'react'
import download from 'assets/download.svg'
import blue from 'assets/coursedot.png'
import green from 'assets/green_status.svg'
import yellow from 'assets/yellow_status.svg'
import 'styles/main.scss'

class ActivityReqCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.status
        };
    }

    getMonth(month) {
      if(month === '01')
        return 'Jan'
      else if(month === '02')
        return 'Feb'
      else if(month === '03')
        return 'Mar'
      else if(month === '04')
        return 'Apr'
      else if(month === '05')
        return 'May'
      else if(month === '06')
        return 'Jun'
      else if(month === '07')
        return 'Jul'
      else if(month === '08')
        return 'Aug'
      else if(month === '09')
        return 'Sep'
      else if(month === '10')
        return 'Oct'
      else if(month === '11')
        return 'Nov'
      else if(month === '12')
        return 'Dec'

    }

    parseDate(date) {
        let datePart = date.match(/\d+/g)
        let month = this.getMonth(`${datePart[1]}`)
        let dateString = `${datePart[2]}th ${month}, ${datePart[0]}`;
        return dateString
    }

    render() {
        return(
            <div className='activityreqcard'>
                <div className='activityreqcard--info'>
                    <div className='activityreqcard--info_date'>{this.parseDate(this.props.date)}</div>
                    <div className='activityreqcard--info_name'>
                        <span className='activityreqcard--info_head'>Name:</span>
                        <span className='activityreqcard--info_heading'>{this.props.title}</span>
                    </div>
                    <div className='activityreqcard--course'><span>{this.props.code}</span><span> . </span><span>{this.props.course}</span></div>
                </div>
                {this.state.status === 1 ?
                (<Fragment>
                    <div className='activityreqcard--status_blue'><img className='activityreqcard--status_color' src={blue} alt='blue'/> Request Filed ({this.state.status}/3)</div>
                    <div className='activityreqcard--file'/>
                </Fragment>) :
                this.state.status === 2 ?
                (<Fragment>
                    <div className='activityreqcard--status_yellow'><img className='activityreqcard--status_color' src={yellow} alt='yellow'/> Request Approved ({this.state.status}/3)</div>
                    <div className='activityreqcard--file'/>
                </Fragment>) :
                (<Fragment>
                    <div className='activityreqcard--status_green'><img className='req_color' src={green} alt='green'/> Files Uploaded ({this.state.status}/3)</div>
                    <div className='activityreqcard--file'><img className='activityreqcard--file_download' src={download} alt='download'/>  Tutorial 1 Structural Analysis CEN-207</div>
                </Fragment>)}
            </div>
        )
    }
}

export default ActivityReqCard
