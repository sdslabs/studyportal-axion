import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import Home from './pages/home';
import Department from './pages/department';
import { Switch, Route } from 'react-router-dom';
import { setUser } from 'actions/actions';
import { loginUserWithToken, loginUserWithCookie } from 'api/userApi';
import { getCookie } from 'utils/handleCookies';

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
        // console.log('The user has logged in with token');
      })
        .catch(() => {
          // console.log('There is some error with the token');
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
              // console.log('The user has logged in with cookie and the invalid token has been replaced');
            })
              .catch(() => {
                const user = {
                  login: false
                };
                this.props.setUser(user);
                // console.log('The cookie is corrupted');
                removeCookie('sdslabs');
                removeCookie('token');
              });
          }
          else {
            const user = {
              login: false
            };
            this.props.setUser(user);
            // console.log('There is no cookie present and the token is corrupted');
            removeCookie('token');
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
        // console.log('The user did not have the token but is logged in by the cookie and now the token has been created');
      })
        .catch(() => {
          const user = {
            login: false
          };
          this.props.setUser(user);
          // console.log('The cookie is corrupted (YIKES!)');
          removeCookie('sdslabs');
        });
    }
    else {
      const user = {
        login: false
      };
      this.props.setUser(user);
      // console.log('There is neither cookie nor token present');
    }
  }

  render() {
    return (
      <Switch>
          <Route exact path='/' render={(props) => <Home {...props} />} />
          <Route exact path='/mycourse' render={(props) => <Department {...props} error={false}/>} />
          <Route exact path='/mycourse/departments/:department/courses/:course/:file_type?'
            render={(props) => <Department {...props} error={false}/>} />
          <Route exact path='/activity/:type?' render={(props) => <Department {...props} error={false}/>} />
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
