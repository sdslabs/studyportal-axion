import React from 'react';
import TableIconButton from './tableIconButtons';
import { useSelector } from 'react-redux';

const UserUploadsTable = () => {
  const store = useSelector((state) => state.adminPanel);
  const activeData = store.tableData[Object.keys(store.tableData)[store.activeSubMenu]];

  if (activeData?.length === 0) return null;

  return (
    <>
      <div className="admin-table--row admin-table-title" style={{ marginTop: '0' }}>
        <div className="admin-table--primary-row">
          <span>Name</span>
        </div>
        <div className="admin-table--secondary-row">
          <div className="row-item">Download</div>
          <div className="row-item">Preview</div>
          <div className="row-item">Approve</div>
          <div className="row-item">Reject</div>
        </div>
      </div>
      {(activeData || []).map((item, key) => (
        <div className="admin-table--row" key={key}>
          <div className="admin-table--primary-row">
            <span>{item.title}</span>
          </div>
          <div className="admin-table--secondary-row">
            <div className="row-item">
              <TableIconButton type="download" />
            </div>
            <div className="row-item">
              <TableIconButton type="preview" />
            </div>
            <div className="row-item">
              <TableIconButton type="approve" />
            </div>
            <div className="row-item">
              <TableIconButton type="reject" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserUploadsTable;
