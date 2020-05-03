import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import Home from './pages/home';
import Department from './pages/department';
import { Switch, Route } from 'react-router-dom';
import { setUser } from 'actions/actions';
import { loginUserWithToken, loginUserWithCookie } from 'api/userApi';
import { getCookie, removeCookie } from 'utils/handleCookies';

function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch(setUser(user))
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.getUser();
    this.getUser = this.getUser.bind(this);
  }

  getUser() {
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
                const user = {
                  login: false
                };
                this.props.setUser(user);
                removeCookie('sdslabs');
                removeCookie('token');
                // The cookie is corrupted, both the token and the cookie have been removed
              });
          }
          else {
            const user = {
              login: false
            };
            this.props.setUser(user);
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
          const user = {
            login: false
          };
          this.props.setUser(user);
          removeCookie('sdslabs');
          // The cookie is corrupted and removed
        });
    }
    else {
      const user = {
        login: false
      };
      this.props.setUser(user);
      // Neither cookie nor token present
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' render={(props) => <Home {...props} />} />
        <Route exact path='/mycourse' render={(props) => <Department {...props} error={false} />} />
        <Route exact path='/mycourse/departments/:department/courses/:course/:file_type?'
          render={(props) => <Department {...props} error={false} />} />
        <Route exact path='/activity/:type?' render={(props) => <Department {...props} error={false} />} />
        <Route exact path='/departments/:department' render={(props) => <Department {...props} error={false} />} />
        <Route exact path='/departments/:department/courses/:course/:file_type?'
          render={(props) => <Department {...props} error={false} />} />
        <Route path='*' render={(props) => <Department {...props} error />} />
      </Switch>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);

App.propTypes = {
  setUser: PropTypes.func
};
