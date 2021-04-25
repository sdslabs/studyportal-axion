import React from 'react';
import TableIconButton from './tableIconButtons';

const dummydata = [
  {
    id: 1,
    name: 'Alpha file',
    rejected: true,
    uploaded: false,
  },
  {
    id: 2,
    name: 'Beta file',
    rejected: false,
    uploaded: true,
  },
  {
    id: 3,
    name: 'Gamma file',
    rejected: false,
    uploaded: false,
  },
];

const UserRequestsTable = () => {
  return (
    <>
      <div className="admin-table--row admin-table-title">
        <div className="admin-table--primary-row">
          <span>Name</span>
        </div>
        <div className="admin-table--secondary-row">
          <div className="row-item">Upload</div>
          <div className="row-item">Reject</div>
        </div>
      </div>
      {dummydata.map((item, key) => (
        <div className="admin-table--row" key={key}>
          <div className="admin-table--primary-row">
            <span>{item.name}</span>
          </div>
          <div className="admin-table--secondary-row">
            <div className="row-item">
              <TableIconButton type={item.uploaded ? 'reload' : 'upload'} />
            </div>
            <div className="row-item">
              <TableIconButton type={item.rejected ? 'reject_confirmed' : 'reject'} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserRequestsTable;
