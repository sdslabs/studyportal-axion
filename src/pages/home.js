import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'components/home/header';
import Request from 'components/request/request';
import Upload from 'components/upload/upload';
import ShowMoreFiles from 'components/header/showMoreFiles';
import SubjectCard from 'components/home/subjectCard';
import 'styles/main.scss';
import { getDepartmentsList } from 'api/departmentApi';
import { Link } from 'react-router-dom';
import { CONFIG } from 'config/config';
import { resetApp } from 'actions/actions';
import { removeCookie } from 'utils/handleCookies';

const mapStateToProps = state => {
  return { user: state };
};

function mapDispatchToProps(dispatch) {
  return {
    resetApp: () => dispatch(resetApp())
  };
}
/**
 * Homepage component for Studyportal.
 */
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            search:false,
            notifications:false,
            userMenu:false,
            request:false,
            upload:false,
            showmore: false,
            searchfiles: [],
            searchquery: ''
        };
        this.handleClick=this.handleClick.bind(this);
        this.handleSeeAllClick=this.handleSeeAllClick.bind(this);
        this.close=this.close.bind(this);
        this.log=this.log.bind(this);
    }

    componentDidMount() {
      getDepartmentsList().then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.setState({ departments:res.department });
        }
      });
    }

    /**
     * Toggle state of different modals.
     *
     * @param {string} component
     */
    handleClick(component) {
      if(component === 'search') {
        this.setState(prevState => ({
          search: !prevState.search
        }));
      }
      else if(component === 'notifications') {
        this.setState(prevState => ({
          notifications: !prevState.notifications
        }));
      }
      else if(component === 'userMenu') {
        this.setState(prevState => ({
          userMenu: !prevState.userMenu
        }));
      }
      else if(component === 'request') {
        this.setState({
          request:true,
          search:false,
          showmore:false,
          userMenu:false
        });
      }
      else if(component === 'upload') {
        this.setState({
          upload:true,
          search:false,
          showmore:false,
          userMenu:false
        });
      }
    }

    /**
     * Handle render information of SeeAll modal.
     *
     * @param {array} files
     * @param {string} query
     */
    handleSeeAllClick(files,query){
      this.setState({
        showmore:true,
        searchquery:query,
        searchfiles: files,
        search:false
      });
    }

    /**
     * Close modals.
     */
    close() {
      this.setState({ search:false });
      if(this.state.userMenu)
        this.setState({ userMenu:false });
      if(this.state.notifications)
        this.setState({ notifications:false });
      if(this.state.showmore)
        this.setState({ showmore:false });
      if(this.state.request)
        this.setState({ request:false });
      if(this.state.upload)
        this.setState({ upload:false });
    }

    /**
     * Login/Register/Logout user.
     *
     * @param {string} value
     */
    log(value) {
      if (value === 'login') {
        window.location.href = `${CONFIG.arceusRoot}/${value}?redirect=${window.location.href}`;
      }
      else if (value === 'register') {
        window.location.href = `${CONFIG.arceusRoot}/${value}?redirect=${window.location.href}`;
      }
      else if (value === 'logout') {
        this.props.resetApp();
        window.location.href = CONFIG.studyRoot;
        removeCookie('token');
        removeCookie('sdslabs');
      }
    }

    render() {
        return(
            <div className='home'>
              <div className='home--header'>
                <Header search={this.state.search}
                        notifications={this.state.notifications}
                        userMenu={this.state.userMenu}
                        handleClick={this.handleClick}
                        handleSeeAllClick={this.handleSeeAllClick}
                        log={this.log}
                        close={this.close}/>
              </div>
              <div className='home--choosedept' onClick={this.close}>
                <div onClick={this.closeUserMenu}>Click on department to continue</div>
                <div className='home--choosedept_und'/>
              </div>
              <div className={ this.state.request || this.state.upload || this.state.showmore ?
                'home--sub_list_modal' : 'home--sub_list'} onClick={this.close}>
                { this.state.departments.map((department) => (
                <Link to={ `/departments/${department.abbreviation}` } key={department.abbreviation}>
                  <SubjectCard name={ department.title } url={ department.imageurl } id={ department.id } />
                </Link>)
                ) }
              </div>
              <Request request={this.state.request} close={this.close} refreshRequest={this.refreshRequest}/>
              <Upload upload={this.state.upload} close={this.close}/>
              {this.state.searchfiles.length ?
                <ShowMoreFiles files={this.state.searchfiles}
                              showmore={this.state.showmore}
                              searchquery={this.state.searchquery}
                              close={this.close}
                              handleClick={this.handleClick} /> : null}
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);

Home.propTypes = {
  /** Holds user data which is handled through Redux. */
  user: PropTypes.object,
  /** Resets the app to a new logged out session */
  resetApp: PropTypes.func
};
