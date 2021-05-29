import React from 'react';
import TableIconButton from './tableIconButtons';
import { useSelector } from 'react-redux';
import { addCourse, rejectCourseRequest } from '../../admin/api/courseRequestApi';
import { getCookie } from '../../utils/handleCookies';

const CourseRequestsTable = () => {
  const store = useSelector((state) => state.adminPanel);
  const activeData = store.tableData[Object.keys(store.tableData)[store.activeSubMenu]];
  const token = getCookie('token');

  if (activeData?.length === 0) return null;

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
              {/* <TableIconButton type={item.accepted ? 'approve_confirmed' : 'approve'} /> */}
              <TableIconButton
                type="approve_confirmed"
                handleClick={() => {
                  addCourse(item.id, token);
                }}
              />
            </div>
            <div className="row-item">
              {/* <TableIconButton type={item.rejected ? 'reject_confirmed' : 'reject'} /> */}
              <TableIconButton
                type="reject"
                handleClick={() => {
                  rejectCourseRequest(item.id, token);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CourseRequestsTable;
