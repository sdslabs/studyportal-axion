import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import Home from './pages/home';
import Test from './pages/test';
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
    this.state = {
      login: true
    };
    this.getUser = this.getUser.bind(this);

    const user = {
      login: true,
      id: 1,
      username: 'darkrider',
      email: 'darkrider251099@gmail.com',
      profile_image: '/assets/img_user.png',
      courses: [{
        "id": 1250,
        "title": "Advanced Characterization Techniques",
        "department": {
            "id": 118,
            "title": "Applied Science and Engineering",
            "abbreviation": "ASED",
            "imageurl": "ased.png"
        },
        "code": "AS-901"
      },
      {
          "id": 1251,
          "title": "SEMINAR",
          "department": {
              "id": 118,
              "title": "Applied Science and Engineering",
              "abbreviation": "ASED",
              "imageurl": "ased.png"
          },
          "code": "ASN-700"
      }],
      notifications: false,
      upload: false,
      request: false
    };
    this.props.setUser(user);
    // function checkLogin() {
    //   //TODO check login and update accordingly
    // }
  }

  getUser() {
    const token = getCookie('token');
      if(token) {
        loginUserWithToken(token).then((res,err) => {
          if(err) {
            //TODO handle error
          }
          else {
            this.setState({ user:res.user });
          }
        });
      }
      else {
        loginUserWithCookie();
      }
  }

  render() {
    return (
      <Switch>
          <Route exact path='/' render={(props) => <Home {...props} />} />
          <Route exact path='/test' render={(props) => <Test {...props} login={this.state.login} />} />
          <Route exact path='/mycourse' render={(props) => <Department {...props} login={this.state.login} error={false}/>} />
          <Route exact path='/mycourse/departments/:department/courses/:course/:file_type?'
            render={(props) => <Department {...props} login={this.state.login} error={false}/>} />
          <Route exact path='/activity/:type?' render={(props) => <Department {...props} login={this.state.login} error={false}/>} />
          <Route exact path='/departments/:department' render={(props) => <Department {...props} login={this.state.login} error={false} />} />
          <Route exact path='/departments/:department/courses/:course/:file_type?'
            render={(props) => <Department {...props} login={this.state.login} error={false} />} />
          <Route path='*' render={(props) => <Department {...props} login={this.state.login} error />} />
      </Switch>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);

App.propTypes = {
  setUser: PropTypes.func
};
