import React from 'react';
// import AdminPanel from 'admin/App';
import ErrorPage from 'pages/error';
import { Route, Switch } from 'react-router';
import AdminPanel from 'pages/admin';

const AdminRouter = () => {
  return (
    <Switch>
      <Route exact path="/admin" component={AdminPanel} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
};

export default AdminRouter;
