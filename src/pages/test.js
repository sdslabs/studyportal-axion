import React, {Component} from 'react'
import Header from '../components/header/header'
import Sidebar from '../components/sidebar'
import Request from '../components/request'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.login,
            request: 'false'
        }

        this.handleReq = this.handleReq.bind(this);
        this.handleReqHeader = this.handleReqHeader.bind(this);
    }

    handleReqHeader () {
        this.setState({request: 'true'});
    }

    handleReq () {
        this.setState({request: 'false'});
    }

    render() {
        return (
            <div>
                <Header login={this.state.login} handleReqClick={this.handleReqHeader} />
                <Sidebar login={this.state.login} />
                <Request request={this.state.request} handleReq={this.handleReq} />
            </div>
        )
    }
}

export default Test