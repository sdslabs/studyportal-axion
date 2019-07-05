import React, {Component} from 'react'
import Header from '../components/header/header'
import Sidebar from '../components/sidebar'
import Request from '../components/request'
import Upload from '../components/upload'
import ActivityLog from '../components/activityLog'
import CoursePage from '../components/coursePage'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.login,
            request: false,
            upload: false
        }

        this.handleReq = this.handleReq.bind(this);
        this.handleReqHeader = this.handleReqHeader.bind(this);
        this.handleUplo = this.handleUplo.bind(this);
        this.handleUploHeader = this.handleUploHeader.bind(this);
    }

    handleReqHeader () {
        this.setState({request: true});
    }

    handleReq () {
        this.setState({request: false});
    }

    handleUploHeader () {
        this.setState({upload: true});
    }

    handleUplo () {
        this.setState({upload: false});
    }

    render() {
        return (
            <div>
                <Header login={this.state.login} search={this.state.search} handleReqClick={this.handleReqHeader} handleUploClick={this.handleUploHeader} />
                <Sidebar login={this.state.login} />
                <Request request={this.state.request} handleReq={this.handleReq} />
                <Upload upload={this.state.upload} handleUplo={this.handleUplo} />
                { this.state.login ? <ActivityLog /> : <CoursePage /> }
            </div>
        )
    }
}

export default Test