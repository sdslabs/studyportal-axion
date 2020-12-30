import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Department from 'pages/department';
import ErrorPage from 'pages/error';
import { Switch, Route } from 'react-router-dom';
import { setUser, resetApp } from 'actions/actions';
import { loginUserWithToken, loginUserWithCookie } from 'api/userApi';
import { getCookie, removeCookie } from 'utils/handleCookies';

function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
    resetApp: () => dispatch(resetApp())
  };
}

class DepartmentRouter extends Component {
  constructor(props) {
    super(props);
    this.getUser();
  }

  getUser = () => {
    const token = getCookie('token');
    const cookie = getCookie('sdslabs');
    if (token) {
      loginUserWithToken(token).then((res) => {
        const user = {
          login: true,
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
          login: true,
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
      <Switch>
        <Route exact path='/:department' render={(props) => <Department {...props} />} />
        <Route exact path='/:department/courses/:course' render={(props) => <Department {...props} />} />
        <Route exact path='/:department/courses/:course/all' render={(props) => <Department {...props} />} />
        <Route exact path='/:department/courses/:course/tutorials' render={(props) => <Department {...props} />} />
        <Route exact path='/:department/courses/:course/books' render={(props) => <Department {...props} />} />
        <Route exact path='/:department/courses/:course/notes' render={(props) => <Department {...props} />} />
        <Route exact path='/:department/courses/:course/exampapers' render={(props) => <Department {...props} />} />
        <Route path='*' render={(props) => <ErrorPage />} />
      </Switch>
    );
  }
}

export default connect(null, mapDispatchToProps)(DepartmentRouter);

DepartmentRouter.propTypes = {
  setUser: PropTypes.func,
  resetApp: PropTypes.func
};
