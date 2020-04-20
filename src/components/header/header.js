import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from './search';
import UserMenu from 'components/common/userMenu';
import Notifications from 'components/common/notifications';
import logo from 'assets/head_logo.png';
import 'styles/main.scss';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
    return { user: state };
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            userMenu: props.userMenu,
            notifications: props.notifications,
            search: false
        };

        this.result = this.result.bind(this);
        this.close = this.close.bind(this);
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(props) {
        this.setState({ search: props.search });
        this.setState({ userMenu: props.userMenu });
        this.setState({ notifications: props.notifications });
    }

    result(e) {
        this.setState({ value: e.target.value });
        if (e.target.value !== '') {
            this.setState({ search: true });
        }
        else {
          this.setState({ search:false });
        }
    }

    close() {
      this.props.close();
      this.setState({ search:false });
      if(this.state.userMenu)
        this.setState({ userMenu:false });
      if(this.state.notifications)
        this.setState({ notifications:false });
    }

    render() {
        return(
            <div className='header'>
                <div className='header--content'>
                    <div className='header--icon'>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <div className='header--logo'>
                                <div><img src={logo} alt="studyportal_logo" /></div>
                                <div className='header--heading'>Study Portal</div>
                            </div>
                        </Link>
                    </div>
                    <div className='header--search'>
                        <Search search={this.state.search}
                            handleReqClick={this.props.handleReqClick}
                            handleSeeAllClick={this.props.handleSeeAllClick}
                            handleSeeAll={this.props.handleSeeAll} />
                    </div>
                    {this.props.user.login ?
                        (<Fragment>
                            <div className='header--home'><Link to='/'><span className='link'>Home</span></Link></div>
                            <div className='header--mycourse'><Link to='/mycourse'><span className='link'>My Course</span></Link></div>
                        </Fragment>) :
                        (<Fragment>
                            <div className='header--home'><Link to='/'><span className='link'>Home</span></Link></div>
                            <div className='header--request' onClick={this.props.handleReqClick}>Request</div>
                            <div className='header--upload' onClick={this.props.handleUploClick}>Upload</div>
                        </Fragment>)
                    }
                </div>
                <div className='header--userinfo'>
                    {this.props.user.login ?
                        (<Fragment>
                            <div className='header--notification'>
                                <Notifications/>
                            </div>
                            <div className='header--user'>
                                <UserMenu handleReqClick={this.props.handleReqClick} handleUploClick={this.props.handleUploClick}/>
                            </div>
                        </Fragment>) :
                        (<Fragment>
                            <button className='header--login'>Login</button>
                            <button className='header--signup'>Sign Up</button>
                        </Fragment>)
                    }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Header);

Header.propTypes = {
    userMenu: PropTypes.bool,
    notifications: PropTypes.bool,
    search: PropTypes.bool,
    close: PropTypes.func,
    handleReqClick: PropTypes.func,
    handleUploClick: PropTypes.func,
    handleSeeAll: PropTypes.func,
    handleSeeAllClick: PropTypes.func,
    user: PropTypes.object
};
