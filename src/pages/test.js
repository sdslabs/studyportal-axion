import React, {Component} from 'react'
import Header from '../components/header/header'
import Sidebar from '../components/sidebar/sidebar'
import Request from '../components/request/request'
import Upload from '../components/upload/upload'
import ActivityLog from '../components/activitylog/activityLog'
import CoursePage from '../components/coursecard/coursePage'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.login,
            request: false,
            upload: false,
            search: false
        }

        this.handleReq = this.handleReq.bind(this);
        this.handleReqHeader = this.handleReqHeader.bind(this);
        this.handleUplo = this.handleUplo.bind(this);
        this.handleUploHeader = this.handleUploHeader.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
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

    closeSearch() {
        this.setState({search: false})
    }

    render() {
        return (
            <div onClick={this.closeSearch}>
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