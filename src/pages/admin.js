import React, { useState } from 'react';
import Header from 'components/header/header';
import AdminSidebar from 'components/sidebar/adminSidebar';
import AdminMainContainer from 'components/adminTable/adminMainContainer';

const AdminPanel = () => {
  //temproraily added switch tab logic
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <Header />
      <AdminSidebar setActiveTab={setActiveTab} />
      <AdminMainContainer activeTab={activeTab} />
    </>
  );
};

export default AdminPanel;
