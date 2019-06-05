import React, {Component} from 'react'
import logo from '../../assets/head_logo.png'
import search from '../../assets/head_search.png'
import notif from '../../assets/notif.png'
import userimg from '../../assets/img_user.png'
import '../../styles/header.scss'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: ''
        }
    }

    componentWillMount() {
        const login = this.props.login
        this.setState({login: login});
    }

    render() {
        if (this.state.login == 'true') {
            return(
                <div className="header">
                    <img className="head_logo" src={logo} alt="studyportal_logo" />
                    <div className="head_name">Study Portal</div>
                    <input className="search_head" type="text" placeholder="Search file, courses, departments" />
                    <button className="search_icon"><img src={search} alt='search' /></button>
                    <div className="request_head">Request</div>
                    <div className="upload_head">Upload</div>
                    <div className="mentors">Mentors List</div>
                    <div className='notif'><img className='notif_img' src={notif} alt="notif" /><span className='notif_no'>1</span></div>
                    <img className='img_user' src={userimg} alt="image_user" />
                </div>
            )
        }

        else {
            return(
                <div className="header">
                    <img className="head_logo" src={logo} alt="studyportal_logo" />
                    <div className="head_name">Study Portal</div>
                    <input className="search_head" type="text" placeholder="Search file, courses, departments" />
                    <button className="search_icon"><img src={search} alt='search' /></button>
                    <div className="request_head">Request</div>
                    <div className="upload_head">Upload</div>
                    <div className="mentors">Mentors List</div>
                    <button className="login_head">Login</button>
                    <button className="signup_head">Sign Up</button>
                </div>
            )
        }
    }
}

export default Header