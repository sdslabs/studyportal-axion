import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import Home from './pages/home';
import Department from './pages/department';
import ErrorPage from './pages/error';
import MyCourseRouter from './routers/MyCourseRouter';
import ActivityRouter from 'routers/ActivityRouter';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { getDepartmentsList } from 'api/departmentApi';
import { getUser } from 'utils/getUser';
import { ADD_DEPARTMENTS, RESET_APP } from './constants/action-types';

function mapStateToProps(state) {
  return {
    login: state.user.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => getUser(dispatch),
    addDepartments: (departments) => dispatch({ type: ADD_DEPARTMENTS, payload: departments }),
    resetApp: () => dispatch({ type: RESET_APP }),
  };
}

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.getDepartments();
    this.props.getUser();
  }

  getDepartments = () => {
    getDepartmentsList().then((res) => {
      this.props.addDepartments(res.department);
    });
  };

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route path="/mycourse">
            <MyCourseRouter />
          </Route>
          <Route path="/activity">
            <ActivityRouter />
          </Route>
          <Route
            exact
            path="/departments/:department/"
            render={(props) => <Department {...props} />}
          />
          <Route
            exact
            path="/departments/:department/courses/:course/:filetype?"
            render={(props) => <Department {...props} />}
          />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  /** Function to fetch user details. */
  getUser: PropTypes.func,
  /** Holds the authenticated state of the app. */
  login: PropTypes.bool,
  /** Fetches and stores department list */
  addDepartments: PropTypes.func,
  /** Resets all user related data in the redux store. */
  resetApp: PropTypes.func,
};
