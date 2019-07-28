import React, {Component} from 'react'
import logo from '../../assets/studyportal_logo.png'
import sds_logo from '../../assets/sds_logo.png'
import upload from '../../assets/upload.png'
import request from '../../assets/request.png'
import search from '../../assets/search.png'
import '../../styles/header_landing.scss'
import departmentApi from '../../api/departmentsApi'

class Header extends Component {
    componentDidMount() {
        departmentApi()
    }

    render() {
        return (
            <div className="header_home">
                    <img className="sds_logo" src={sds_logo} alt='sdslogo' />
                    <img className="logo" src={logo} alt='studyportal_logo' />
                    <div className="studyportal">Study Portal</div>
                    <div className="_search">
                        <input className="search_bar" type="text" placeholder="Search tutorials, books, notes, courses..." />
                        <button className="search"><img src={search} alt='search' /></button>
                    </div>
                    <button className="request"><img className="req_img" src={request} alt='request' /> Request</button>
                    <button className="upload"><img className="uplo_img" src={upload} alt='upload' /> Upload</button>
                    <button className="login">Login</button>
                    <button className="signup">Sign Up</button>
            </div>
        )
    }
}

export default Header