import React from 'react';
import Activity from 'pages/activity';
import ErrorPage from 'pages/error';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';

const AdminRouter = () => {
  const login = useSelector((state) => state.user.login);

  return (
    <Switch>
      <Route
        exact
        path="/admin"
        render={(props) => (login ? <Activity {...props} activitytype="all" /> : <ErrorPage />)}
      />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
};

export default AdminRouter;
