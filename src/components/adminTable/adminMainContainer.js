import React from 'react';
import UserRequestsTable from './userRequestsTable';

const AdminMainContainer = ({ activeTab }) => {
  //modify classes and add table
  const getTable = () => {
    switch (activeTab) {
      case 0:
        return <h1>Course Requests</h1>;

      case 1:
        return <UserRequestsTable />;

      case 3:
        return <h1>User Uploads</h1>;

      default:
        return <p>No tab selected</p>;
    }
  };

  return (
    <div className="coursepage">
      <div className="coursepage--head">Admin Main Container Head</div>
      <div className="coursepage--category">
        <span className="coursepage--category_tut" style={{ borderLeft: 'none' }}>
          All
        </span>
        <span className="coursepage--category_tut">Tutorials</span>
        <span className="coursepage--category_tut">Books</span>
        <span className="coursepage--category_tut">Notes</span>
        <span className="coursepage--category_tut" style={{ width: '100%' }}>
          Examination Papers
        </span>
      </div>
      {getTable()}
    </div>
  );
};

export default AdminMainContainer;
