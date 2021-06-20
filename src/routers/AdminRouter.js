import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Header from 'components/header/header';
import AdminSidebar from 'components/sidebar/adminSidebar';
import AdminMainContainer from 'components/adminTable/adminMainContainer';
import CourseRequestsTable from 'components/adminTable/courseRequestsTable';
import UserUploadsTable from 'components/adminTable/userUploadsTable';
import UserRequestsTable from 'components/adminTable/userRequestsTable';
import NoOptionsSelected from 'components/error/adminNoOptns';

const AdminRouter = () => (
  <>
    <Header />
    <BrowserRouter basename="/admin">
      <AdminSidebar />
      <AdminMainContainer>
        <Switch>
          <Route exact path="/course-requests" component={CourseRequestsTable} />
          <Route exact path="/user-requests" component={UserRequestsTable} />
          <Route exact path="/user-uploads" component={UserUploadsTable} />
          <Route path="*" component={NoOptionsSelected} />
        </Switch>
      </AdminMainContainer>
    </BrowserRouter>
  </>
);

export default AdminRouter;
