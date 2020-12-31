import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import Home from './pages/home';
import Department from './pages/dept_temp';
import Activity from './pages/activity';
import MyCourse from './pages/mycourse';
import ErrorPage from './pages/error';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { loginUserWithToken, loginUserWithCookie } from 'api/userApi';
import { getCookie, removeCookie } from 'utils/handleCookies';
import { getDepartmentsList } from 'api/departmentApi';
import {  ADD_DEPARTMENTS, SET_USER, RESET_APP } from './constants/action-types';

function mapDispatchToProps(dispatch) {
  return {
    addDepartments: departments => dispatch({ type: ADD_DEPARTMENTS, payload: departments }),
    setUser: user => dispatch({ type: SET_USER, payload: user }),
    resetApp: () => dispatch({ type: RESET_APP }),
  };
}

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.getDepartments();
    this.getUser();
  }

  getDepartments = () => {
    getDepartmentsList().then((res,err) => {
      if(err) {
        //TODO handle error
      }
      else {
        this.props.addDepartments(res.department);
      }
    });
  }

  /**
   * Fetch user details.
   */
  getUser = () => {
    const token = getCookie('token');
    const cookie = getCookie('sdslabs');
    if (token) {
      loginUserWithToken(token).then((res) => {
        const user = {
          id: res.user.falcon_id,
          username: res.user.username,
          email: res.user.email,
          profile_image: res.user.profile_image,
          courses: res.courses
        };
        this.props.setUser(user);
        // Logged in with token
      })
        .catch(() => {
          // Token is corrupted
          if (cookie) {
            loginUserWithCookie().then((res) => {
              const user = {
                login: true,
                id: res.user.falcon_id,
                username: res.user.username,
                email: res.user.email,
                profile_image: res.user.profile_image,
                courses: res.courses
              };
              this.props.setUser(user);
              // Logged in with cookie and the invalid token has been replaced
            })
              .catch(() => {
                this.props.resetApp();
                removeCookie('sdslabs');
                removeCookie('token');
                // The cookie is corrupted, both the token and the cookie have been removed
              });
          }
          else {
            this.props.resetApp();
            removeCookie('token');
            // No cookie present and the token is corrupted
          }
        });
    }
    else if (cookie) {
      loginUserWithCookie().then((res) => {
        const user = {
          id: res.user.falcon_id,
          username: res.user.username,
          email: res.user.email,
          profile_image: res.user.profile_image,
          courses: res.courses
        };
        this.props.setUser(user);
        // The user did not have the token but is logged in by the cookie and the token has been created
      })
        .catch(() => {
          this.props.resetApp();
          removeCookie('sdslabs');
          // The cookie is corrupted and removed
        });
    }
    else {
      this.props.resetApp();
      // Neither cookie nor token present
    }
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} />} />
          <Route exact path='/mycourse' render={(props) => <MyCourse {...props} error={false} />} />
          <Route exact path='/mycourse/departments/:department/courses/:course/:file_type?'
            render={(props) => <MyCourse {...props} error={false} />} />
          <Route exact path='/activity/:type?' render={(props) => <Activity {...props} error={false} />} />
          <Route exact path='/departments/:department/' render={(props) => <Department {...props} />} />
          <Route exact path='/departments/:department/courses/:course/:filetype?' render={(props) => <Department {...props} />} />
          <Route path='*' component={ErrorPage} />
        </Switch>
      </Router>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);

App.propTypes = {
  /** Function to set user details. */
  setUser: PropTypes.func,
  /** Resets all user related data in the redux store. */
  resetApp: PropTypes.func
};
