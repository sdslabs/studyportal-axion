import React from 'react';
import Department from 'pages/dept_temp';
import ErrorPage from 'pages/error';
import { Switch, Route } from 'react-router-dom';


const DepartmentRouter = () => {
    return (
      <Switch>
        <Route exact path='/ASED' render={(props) => <Department {...props} />} />
        <Route exact path='/:department/courses/:course' render={(props) => <Department {...props} />} />
        <Route exact path='/:department/courses/:course/all' render={(props) => <Department {...props} />} />
        <Route exact path='/:department/courses/:course/tutorials' render={(props) => <Department {...props} />} />
        <Route exact path='/:department/courses/:course/books' render={(props) => <Department {...props} />} />
        <Route exact path='/:department/courses/:course/notes' render={(props) => <Department {...props} />} />
        <Route exact path='/:department/courses/:course/exampapers' render={(props) => <Department {...props} />} />
        <Route path='*' component={ErrorPage} />
      </Switch>
    );
};

export default DepartmentRouter;
