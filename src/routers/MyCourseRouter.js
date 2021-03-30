import React from 'react';
import MyCourse from 'pages/mycourse';
import ErrorPage from 'pages/error';
import { Route, Switch } from 'react-router';

const MyCourseRouter = () => {
  return (
    <Switch>
      <Route exact path="/mycourse" render={(props) => <MyCourse {...props} />} />
      <Route
        exact
        path="/mycourse/departments/:department/courses/:course/:filetype?"
        render={(props) => <MyCourse {...props} />}
      />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
};

export default MyCourseRouter;
