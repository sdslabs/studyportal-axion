import React from 'react';
import TableIconButton from './tableIconButtons';

const dummydata = [
  {
    id: 1,
    name: 'Alpha file',
    rejected: true,
    accepted: false,
  },
  {
    id: 2,
    name: 'Beta file',
    rejected: false,
    accepted: true,
  },
  {
    id: 3,
    name: 'Gamma file',
    rejected: false,
    accepted: false,
  },
];

const CourseRequestsTable = () => {
  return (
    <>
      <div className="admin-table--row admin-table-title">
        <div className="admin-table--primary-row">
          <span>Request</span>
        </div>
        <div className="admin-table--secondary-row">
          <div className="row-item">Approve</div>
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
              <TableIconButton type={item.accepted ? 'approve_confirmed' : 'approve'} />
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

export default CourseRequestsTable;
