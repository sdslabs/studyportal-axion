import React from 'react';
import Header from 'components/header/header';
import AdminSidebar from 'components/sidebar/adminSidebar';
import AdminMainContainer from 'components/adminTable/adminMainContainer';

const AdminPanel = () => {
  return (
    <>
      <Header />
      <AdminSidebar />
      <AdminMainContainer />
    </>
  );
};

export default AdminPanel;
