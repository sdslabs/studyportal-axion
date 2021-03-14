import React from 'react';
import Department from 'pages/department';
import ErrorPage from 'pages/error';
import { Route, Switch } from 'react-router';

const DepartmentRouter = () => {
  return (
    <Switch>
      <Route exact path="/departments/:department/" render={(props) => <Department {...props} />} />
      <Route
        exact
        path="/departments/:department/courses/:course/:filetype?"
        render={(props) => <Department {...props} />}
      />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
};

export default DepartmentRouter;
