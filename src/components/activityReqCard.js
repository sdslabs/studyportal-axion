import React, {Component} from 'react'
import download from '../assets/download.svg'
import green from '../assets/green_status.svg'
import yellow from '../assets/yellow_status.svg'

class ActivityReqCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '3'
        }

        this.reqStatus = React.createRef();
    }

    componentWillMount() {
        let status = this.props.status;
        this.setState({status: status});
    }

    componentDidMount() {
        if(this.state.status === '2') {
            this.reqStatus.current.style.color = '#F2C94C';
        }

        else if(this.state.status === '3') {
            this.reqStatus.current.style.color = '#2F7F2E';
        }
    }

    render() {

        if(this.state.status === '2')
        {
            return(
                <div className='activity_cont_req'>
                    <div className='activity_req_info'>
                        <div className='req_date'>14th Dec, 2019</div>
                        <div className='activity_req_name'><span className='req_headname'>Name:</span><span className='req_name'> tutorial 1 structural analysis</span></div>
                        <div className='activity_req_cour'><span>CEN-207</span><span> . </span><span>Structural Analysis</span></div>
                    </div>
                    <div className='activity_req_status' ref={this.reqStatus}><img className='req_color' src={yellow} alt='yellow'/> Request Approved ({this.state.status}/3)</div>
                    <div className='activity_req_file'></div>
                </div>
            )
        }

        else if(this.state.status === '3')
        {
            return(
                <div className='activity_cont_req'>
                    <div className='activity_req_info'>
                        <div className='req_date'>14th Dec, 2019</div>
                        <div className='activity_req_name'><span className='req_headname'>Name:</span><span className='req_name'> tutorial 1 structural analysis</span></div>
                        <div className='activity_req_cour'><span>CEN-207</span><span> . </span><span>Structural Analysis</span></div>
                    </div>
                    <div className='activity_req_status' ref={this.reqStatus}><img className='req_color' src={green} alt='green'/> Files Uploaded ({this.state.status}/3)</div>
                    <div className='activity_req_file'><img className='req_download' src={download} alt='download'/>  Tutorial 1 Structural Analysis CEN-207</div>
                </div>
            )
        }
    }
}

export default ActivityReqCard