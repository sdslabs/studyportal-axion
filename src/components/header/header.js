import React, {Component,Fragment} from 'react'
import logo from '../../assets/head_logo.png'
import search from '../../assets/head_search.png'
import notif from '../../assets/notif.png'
import userimg from '../../assets/img_user.png'
import icon from '../../assets/icon.png'
import '../../styles/main.scss'

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
        return(
            <div className='header'>
                <img className='header--logo' src={logo} alt="studyportal_logo" />
                <div className='header--heading'>Study Portal</div>
                <div className='header--search'>
                    <input className='header--search_bar' type="text" placeholder="Search file, courses, departments" ref={this.search} onChange={this.activ_search}/>
                    <button className='header--search_icon'><img src={search} alt='search' /></button>
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
                <div className='header--request' onClick={this.props.handleReqClick}>Request</div>
                <div className='header--upload' onClick={this.props.handleUploClick}>Upload</div>
                <div className='header--mentors'>Mentors List</div>
                {this.state.login === 'true' ?
                    (<Fragment>
                        <div className='header--notification'>
                            <img className='header--notification_image' src={notif} alt="notification" /><span className='header--notification_number'>1</span></div>
                        <img className='header--user' src={userimg} alt="image_user" />
                    </Fragment>) :
                    (<Fragment>
                        <button className='header--login'>Login</button>
                        <button className='header--signup'>Sign Up</button>
                    </Fragment>)
                }
            </div>
        )
    }
}

export default Header
