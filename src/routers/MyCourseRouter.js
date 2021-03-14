import React from 'react';
import MyCourse from 'pages/mycourse';
import ErrorPage from 'pages/error';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';

const MyCourseRouter = () => {
  const login = useSelector((state) => state.user.login);

  return (
    <Switch>
      <Route
        exact
        path="/mycourse"
        render={(props) => (login ? <MyCourse {...props} /> : <ErrorPage />)}
      />
      <Route
        exact
        path="/mycourse/departments/:department/courses/:course/:filetype?"
        render={(props) => (login ? <MyCourse {...props} /> : <ErrorPage />)}
      />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
};

export default MyCourseRouter;
