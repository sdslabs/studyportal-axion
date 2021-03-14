import React from 'react';
import Activity from 'pages/activity';
import ErrorPage from 'pages/error';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';

const ActivityRouter = () => {
  const login = useSelector((state) => state.user.login);

  return (
    <Switch>
      <Route
        exact
        path="/activity"
        render={(props) => (login ? <Activity {...props} activitytype="all" /> : <ErrorPage />)}
      />
      <Route
        exact
        path="/activity/all"
        render={(props) => (login ? <Activity {...props} activitytype="all" /> : <ErrorPage />)}
      />
      <Route
        exact
        path="/activity/requests"
        render={(props) =>
          login ? <Activity {...props} activitytype="requests" /> : <ErrorPage />
        }
      />
      <Route
        exact
        path="/activity/uploads"
        render={(props) => (login ? <Activity {...props} activitytype="uploads" /> : <ErrorPage />)}
      />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
};

export default ActivityRouter;
