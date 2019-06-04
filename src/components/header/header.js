import React, {Component} from 'react'
import logo from '../../assets/head_logo.png'
import search from '../../assets/head_search.png'
import '../../styles/header.scss'

class Header extends Component {
    constructor(props) {
        super(props);
        state = {
        }
    }

    render() {
        return(
            <div className="header">
                <img className="head_logo" src={logo} />
                <div className="head_name">Study Portal</div>
                <input className="search_head" type="text" placeholder="Search file, courses, departments" />
                <button className="search_icon"><img src={search}/></button>
                <div className="request_head">Request</div>
                <div className="upload_head">Upload</div>
                <div className="mentors">Mentors List</div>
                <button className="login_head">Login</button>
                <button className="signup_head">Sign Up</button>
            </div>
        )
    }
}

export default Header