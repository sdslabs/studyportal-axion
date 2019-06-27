import React, {Component} from 'react'
import logo from '../../assets/head_logo.png'
import search from '../../assets/head_search.png'
import notif from '../../assets/notif.png'
import userimg from '../../assets/img_user.png'
import icon from '../../assets/icon.png'
import '../../styles/header.scss'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            search: false
        }

        this.search = React.createRef();
        this.result = React.createRef();

        this.activ_search = this.activ_search.bind(this);
    }

    activ_search() {
        this.setState({search: true});

        if (this.state.search) {
            if (this.search.current.value !== '') {
                this.result.current.style.visibility = 'visible';
            }

            else {
                this.result.current.style.visibility = 'hidden';
            }
        }
        else {
            this.result.current.style.visibility = 'hidden';
        }
    }

    componentWillMount() {
        const login = this.props.login
        this.setState({login: login});
    }

    render() {
        if (this.state.login) {
            return(
                <div className="header">
                    <img className="head_logo" src={logo} alt="studyportal_logo" />
                    <div className="head_name">Study Portal</div>
                    <div className='_search_head'>
                        <input className="search_head" type="text" placeholder="Search file, courses, departments" ref={this.search} onChange={this.activ_search}/>
                        <button className="search_icon"><img src={search} alt='search' /></button>
                    </div>
                    <div className='searchhead_res' ref={this.result}>
                        <div className='search_file'>Files</div>
                        <table className='contres_file'>
                            <tr>
                                <td>
                                    <div className='res_file'>
                                        <div className='icon'><img src={icon} alt='icon'/></div>
                                        <div className='resfile_head'>Tutorial 1</div>
                                        <div className='resfile_cat'><span className='resfile_sub'>Structural Analysis</span><span className='resfile_cour'>CEN-201</span></div>
                                        <div className='resfile_detail'><span className='resfile_date'>Dec 14, 2018</span><span className='resfile_type'>Tutorials</span></div>
                                    </div>
                                </td>

                                <td>
                                    <div className='res_file'>
                                        <div className='icon'><img src={icon} alt='icon'/></div>
                                        <div className='resfile_head'>Tutorial 1</div>
                                        <div className='resfile_cat'><span className='resfile_sub'>Structural Analysis</span><span className='resfile_cour'>CEN-201</span></div>
                                        <div className='resfile_detail'><span className='resfile_date'>Dec 14, 2018</span><span className='resfile_type'>Tutorials</span></div>
                                    </div>
                                </td>

                                <td>
                                    <div className='res_file'>
                                        <div className='icon'><img src={icon} alt='icon'/></div>
                                        <div className='resfile_head'>Tutorial 1</div>
                                        <div className='resfile_cat'><span className='resfile_sub'>Structural Analysis</span><span className='resfile_cour'>CEN-201</span></div>
                                        <div className='resfile_detail'><span className='resfile_date'>Dec 14, 2018</span><span className='resfile_type'>Tutorials</span></div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='res_file'>
                                        <div className='icon'><img src={icon} alt='icon'/></div>
                                        <div className='resfile_head'>Tutorial 1</div>
                                        <div className='resfile_cat'><span className='resfile_sub'>Structural Analysis</span><span className='resfile_cour'>CEN-201</span></div>
                                        <div className='resfile_detail'><span className='resfile_date'>Dec 14, 2018</span><span className='resfile_type'>Tutorials</span></div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <div className='seeall'>See All</div>
                        <div className='search_courses'>Courses</div>
                        <div>
                            <div className='head_searchcour'>Structural Analysis CEN-201</div>
                            <div className='head_searchcour'>Structural Analysis CEN-202</div>
                        </div>
                        <div className='search_dep'>Department</div>
                        <div>
                            <div className='head_searchdep'>Civil Department</div>
                        </div>
                    </div>
                    <div className="request_head" onClick={this.props.handleReqClick}>Request</div>
                    <div className="upload_head" onClick={this.props.handleUploClick}>Upload</div>
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
                    <div className='_search_head'>
                        <input className="search_head" type="text" placeholder="Search file, courses, departments" ref={this.search} onChange={this.activ_search}/>
                        <button className="search_icon"><img src={search} alt='search' /></button>
                    </div>
                    <div className='searchhead_res' ref={this.result}>
                        <div className='search_file'>Files</div>
                        <table className='contres_file'>
                            <tr>
                                <td>
                                    <div className='res_file'>
                                        <div className='icon'><img src={icon} alt='icon'/></div>
                                        <div className='resfile_head'>Tutorial 1</div>
                                        <div className='resfile_cat'><span className='resfile_sub'>Structural Analysis</span><span className='resfile_cour'>CEN-201</span></div>
                                        <div className='resfile_detail'><span className='resfile_date'>Dec 14, 2018</span><span className='resfile_type'>Tutorials</span></div>
                                    </div>
                                </td>

                                <td>
                                    <div className='res_file'>
                                        <div className='icon'><img src={icon} alt='icon'/></div>
                                        <div className='resfile_head'>Tutorial 1</div>
                                        <div className='resfile_cat'><span className='resfile_sub'>Structural Analysis</span><span className='resfile_cour'>CEN-201</span></div>
                                        <div className='resfile_detail'><span className='resfile_date'>Dec 14, 2018</span><span className='resfile_type'>Tutorials</span></div>
                                    </div>
                                </td>

                                <td>
                                    <div className='res_file'>
                                        <div className='icon'><img src={icon} alt='icon'/></div>
                                        <div className='resfile_head'>Tutorial 1</div>
                                        <div className='resfile_cat'><span className='resfile_sub'>Structural Analysis</span><span className='resfile_cour'>CEN-201</span></div>
                                        <div className='resfile_detail'><span className='resfile_date'>Dec 14, 2018</span><span className='resfile_type'>Tutorials</span></div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div className='res_file'>
                                        <div className='icon'><img src={icon} alt='icon'/></div>
                                        <div className='resfile_head'>Tutorial 1</div>
                                        <div className='resfile_cat'><span className='resfile_sub'>Structural Analysis</span><span className='resfile_cour'>CEN-201</span></div>
                                        <div className='resfile_detail'><span className='resfile_date'>Dec 14, 2018</span><span className='resfile_type'>Tutorials</span></div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <div className='seeall'>See All</div>
                        <div className='search_courses'>Courses</div>
                        <div>
                            <div className='head_searchcour'>Structural Analysis CEN-201</div>
                            <div className='head_searchcour'>Structural Analysis CEN-202</div>
                        </div>
                        <div className='search_dep'>Department</div>
                        <div>
                            <div className='head_searchdep'>Civil Department</div>
                        </div>
                    </div>
                    <div className="request_head" onClick={this.props.handleReqClick}>Request</div>
                    <div className="upload_head" onClick={this.props.handleUploClick}>Upload</div>
                    <div className="mentors">Mentors List</div>
                    <button className="login_head">Login</button>
                    <button className="signup_head">Sign Up</button>
                </div>
            )
        }
    }
}

export default Header