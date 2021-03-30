import React from 'react';
import Activity from 'pages/activity';
import ErrorPage from 'pages/error';
import { Route, Switch } from 'react-router';

const ActivityRouter = () => {
  return (
    <Switch>
      <Route
        exact
        path="/activity"
        render={(props) => <Activity {...props} activitytype="all" />}
      />
      <Route
        exact
        path="/activity/all"
        render={(props) => <Activity {...props} activitytype="all" />}
      />
      <Route
        exact
        path="/activity/requests"
        render={(props) => <Activity {...props} activitytype="requests" />}
      />
      <Route
        exact
        path="/activity/uploads"
        render={(props) => <Activity {...props} activitytype="uploads" />}
      />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
};

export default ActivityRouter;
