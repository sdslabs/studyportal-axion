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

        this.reqStatus = React.createRef();
    }

    componentDidMount() {
        if(this.state.status === 1) {
          this.reqStatus.current.style.color = '#38A7DE';
        }
        else if(this.state.status === 2) {
            this.reqStatus.current.style.color = '#F2C94C';
        }
        else if(this.state.status === 3) {
            this.reqStatus.current.style.color = '#2F7F2E';
        }
    }

    render() {
        return(
            <div className='activityreqcard'>
                <div className='activityreqcard--info'>
                    <div className='activityreqcard--info_date'>14th Dec, 2019</div>
                    <div className='activityreqcard--info_name'>
                        <span className='activityreqcard--info_head'>Name:</span>
                        <span className='activityreqcard--info_heading'>{this.props.title}</span>
                    </div>
                    <div className='activityreqcard--course'><span>{this.props.code}</span><span> . </span><span>{this.props.course}</span></div>
                </div>
                {this.state.status === 1 ?
                (<Fragment>
                    <div className='activityreqcard--status' ref={this.reqStatus}><img className='activityreqcard--status_color' src={blue} alt='blue'/> Request Filed ({this.state.status}/3)</div>
                    <div className='activityreqcard--file'/>
                </Fragment>) :
                this.state.status === 2 ?
                (<Fragment>
                    <div className='activityreqcard--status' ref={this.reqStatus}><img className='activityreqcard--status_color' src={yellow} alt='yellow'/> Request Approved ({this.state.status}/3)</div>
                    <div className='activityreqcard--file'/>
                </Fragment>) :
                (<Fragment>
                    <div className='activityreqcard--status' ref={this.reqStatus}><img className='req_color' src={green} alt='green'/> Files Uploaded ({this.state.status}/3)</div>
                    <div className='activityreqcard--file'><img className='activityreqcard--file_download' src={download} alt='download'/>  Tutorial 1 Structural Analysis CEN-207</div>
                </Fragment>)}
            </div>
        )
    }
}

export default ActivityReqCard
