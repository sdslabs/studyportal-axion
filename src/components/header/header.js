import React, {Component,Fragment} from 'react'
import Search from './search'
import logo from '../../assets/head_logo.png'
import search from '../../assets/head_search.png'
import notif from '../../assets/notif.png'
import userimg from '../../assets/img_user.png'
import '../../styles/main.scss'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            value: '',
            search: false
        }

        this.search = React.createRef();
        this.result = this.result.bind(this);
    }

    componentWillMount() {
        const login = this.props.login
        this.setState({login: login});
    }

    componentWillReceiveProps(props) {
        this.setState({search: props.search})
    }

    result() {
        this.setState({value: this.search.current.value})
        if (this.search.current.value !== '') {
            this.setState({search: true})
        }
    }

    render() {
        return(
            <div className='header' onClick={this.closeSearch}>
                <img className='header--logo' src={logo} alt="studyportal_logo" />
                <div className='header--heading'>Study Portal</div>
                <div className='header--search'>
                    <input className='header--search_bar' type="text" placeholder="Search file, courses, departments" ref={this.search} onChange={this.result}/>
                    <button className='header--search_icon'><img src={search} alt='search' /></button>
                </div>
                <Search value={this.state.value} search={this.state.search}/>
                <div className='header--request' onClick={this.props.handleReqClick}>Request</div>
                <div className='header--upload' onClick={this.props.handleUploClick}>Upload</div>
                <div className='header--mentors'>Mentors List</div>
                {this.state.login ?
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
