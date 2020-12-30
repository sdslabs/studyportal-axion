import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from 'components/header/header';
import Request from 'components/request/request';
import Upload from 'components/upload/upload';
import Error from 'components/error/error';
import { setUser, resetApp } from 'actions/actions';

function mapStateToProps(state) {
    return { user: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
    resetApp: () => dispatch(resetApp())
  };
}


/**
 * Component to render different pages in Studyportal.
 */
class ErrorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: props.user.login,
            request: false,
            upload: false,
            activity: false,
            mycourse: false,
            courses: [],
            search: false,
            notifications: false,
            userMenu: false,
            showmore: false,
            searchfiles: [],
            searchquery: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSeeAllClick = this.handleSeeAllClick.bind(this);
        this.close = this.close.bind(this);
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
          showmore:false
        });
      }
      else if(component === 'upload') {
        this.setState({ upload:true });
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

    render() {
      return (
        <div>
            <Header login={this.state.login}
                    search={this.state.search}
                    notifications={this.state.notifications}
                    userMenu={this.state.userMenu}
                    handleClick ={this.handleClick}
                    handleSeeAllClick={this.handleSeeAllClick}
                    loginHandler={this.loginHandler}
                    close={this.close}/>
            <Request request={this.state.request} close={this.close} refreshRequest={this.refreshRequest}/>
            <Upload upload={this.state.upload} close={this.close}/>
            <Error close={this.close}/>
        </div>
      );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorPage);

ErrorPage.propTypes = {
  /** Holds user data which is handled through Redux. */
  user: PropTypes.object,
  /** URL of present location. */
  location: PropTypes.object,
  /** Sets 404 page. */
  error: PropTypes.bool,
  /** Sets user data in Redux. */
  setUser: PropTypes.func,
  /** Holds URL decriptors. */
  match: PropTypes.object,
  /** Resets the app to a new logged out session */
  resetApp: PropTypes.func
};
