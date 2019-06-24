import React, {Component} from 'react'
import logo from '../../assets/studyportal_logo.png'
import sds_logo from '../../assets/sds_logo.png'
import upload from '../../assets/upload.png'
import request from '../../assets/request.png'
import search from '../../assets/search.png'
import '../../styles/main.scss'

class Header extends Component {
    render() {
        return (
            <div className='landingheader'>
                    <img className='landingheader--logo_sds' src={sds_logo} alt='sdslogo' />
                    <img className='landingheader--logo' src={logo} alt='studyportal_logo' />
                    <div className='landingheader--heading'>Study Portal</div>
                    <div className='landingheader--search'>
                        <input className='landingheader--search_bar' type="text" placeholder="Search tutorials, books, notes, courses..." />
                        <button className='landingheader--search_icon'><img src={search} alt='search' /></button>
                    </div>
                    <button className='landingheader--request'><img className='landingheader--request_image' src={request} alt='request' /> Request</button>
                    <button className='landingheader--upload'><img className='landingheader--upload_image' src={upload} alt='upload' /> Upload</button>
                    <button className='landingheader--login'>Login</button>
                    <button className='landingheader--signup'>Sign Up</button>
            </div>
        )
    }
}

export default Header