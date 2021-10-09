import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import Home from 'pages/home';
import ErrorPage from 'pages/error';
import MyCourseRouter from 'routers/MyCourseRouter';
import ActivityRouter from 'routers/ActivityRouter';
import DepartmentRouter from 'routers/DepartmentRouter';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { getDepartmentsList } from 'api/departmentApi';
import { getUser } from 'utils/getUser';
import { ADD_DEPARTMENTS, RESET_APP } from 'constants/action-types';
import AdminRouter from 'routers/AdminRouter';

function mapStateToProps(state) {
  return {
    user: state.user,
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

  canAccessAdmin = (user) => {
    return user.login && (user.role === 'admin' || user.role === 'moderator');
  };

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
            {this.props.user.login ? <MyCourseRouter /> : <ErrorPage />}
          </Route>
          <Route path="/activity">
            {this.props.user.login ? <ActivityRouter /> : <ErrorPage />}
          </Route>
          <Route path="/departments">
            <DepartmentRouter />
          </Route>
          <Route path="/admin">
            {this.canAccessAdmin(this.props.user) ? <AdminRouter /> : <ErrorPage />}
          </Route>
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
  /** Holds the details of the authenticated user. */
  user: PropTypes.object,
  /** Fetches and stores department list */
  addDepartments: PropTypes.func,
  /** Resets all user related data in the redux store. */
  resetApp: PropTypes.func,
};
