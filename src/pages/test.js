import React, {Component} from 'react'
import Header from '../components/header/header'
import Sidebar from '../components/sidebar'
import Request from '../components/request'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.login
        }
    }
    render() {
        return (
            <div>
                <Header login={this.state.login} />
                <Sidebar login={this.state.login} />
                <Request />
            </div>
        )
    }
}

export default Test