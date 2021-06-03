import React, { useState } from 'react';
import TableIconButton from './tableIconButtons';
import { useSelector } from 'react-redux';
import { addCourse, rejectCourseRequest } from 'api/courseRequestApi';
import { getCookie } from '../../utils/handleCookies';

const CourseRequestsTable = () => {
  const store = useSelector((state) => state.adminPanel);
  const activeData = store.tableData[Object.keys(store.tableData)[store.activeSubMenu]];
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const token = getCookie('token');

  const handleApprove = (id) => {
    if (approved.includes(id) || rejected.includes(id)) return null;
    addCourse(id, token).then(() => setApproved((prev) => [...prev, id]));
  };

  const handleReject = (id) => {
    if (approved.includes(id) || rejected.includes(id)) return null;
    rejectCourseRequest(id, token).then(() => setRejected((prev) => [...prev, id]));
  };

  if (!activeData || activeData?.length === 0) return null;

  return (
    <>
      <div className="admin-table--row admin-table-title" style={{ marginTop: '0' }}>
        <div className="admin-table--primary-row">
          <span>Request</span>
        </div>
        <div className="admin-table--secondary-row">
          <div className="row-item">Approve</div>
          <div className="row-item">Reject</div>
        </div>
      </div>
      {(activeData || []).map((item, key) => (
        <div className="admin-table--row" key={key}>
          <div className="admin-table--primary-row">
            <span>
              {item.course} | {item.code}
            </span>
          </div>
          <div className="admin-table--secondary-row">
            <div className="row-item">
              <TableIconButton
                type={approved.includes(item.id) ? 'approve_confirmed' : 'approve'}
                handleClick={() => handleApprove(item.id)}
              />
            </div>
            <div className="row-item">
              <TableIconButton
                type={rejected.includes(item.id) ? 'reject_confirmed' : 'reject'}
                handleClick={() => handleReject(item.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CourseRequestsTable;
