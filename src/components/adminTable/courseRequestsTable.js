import React, { useEffect, useState } from 'react';
import TableIconButton from './tableIconButtons';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse, rejectCourseRequest, getCourseRequests } from 'api/courseRequestApi';
import { getCookie } from 'utils/handleCookies';
import EmptyTable from 'components/error/adminEmptyTable';
import _ from 'lodash';
import {
  SetTableData,
  SwitchMainMenu,
  SwitchSubMenu,
  ToggleAdminLoader,
} from 'actions/adminPanelActions';
import { COURSE_REQUEST_MENU } from 'constants/adminPanelMenu';
import { toast } from 'react-toastify';
import ShortName from 'utils/short-name';

const CourseRequestsTable = () => {
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState({ approve: [], reject: [] });

  const token = getCookie('token');
  const dispatch = useDispatch();
  const store = useSelector((state) => state.adminPanel);
  const activeData = store.tableData[Object.keys(store.tableData)[store.activeSubMenu]];

  const handleApprove = async (id) => {
    if (approved.includes(id) || rejected.includes(id)) return null;
    setLoading((prev) => ({ ...prev, approve: [...prev.approve, id] }));

    try {
      await addCourse(id, token);
      setApproved((prev) => [...prev, id]);
      toast.success('Request Approved Successfully');
    } catch {
      toast.error('Error in Approving Request');
    } finally {
      setLoading((prev) => ({ ...prev, approve: _.without(prev.approve, id) }));
    }
  };

  const handleReject = async (id) => {
    if (approved.includes(id) || rejected.includes(id)) return null;
    setLoading((prev) => ({ ...prev, reject: [...prev.reject, id] }));

    try {
      await rejectCourseRequest(id, token);
      setRejected((prev) => [...prev, id]);
      toast.warn('Request Rejected Successfully');
    } catch {
      toast.error('Error in Rejecting Request');
    } finally {
      setLoading((prev) => ({ ...prev, reject: _.without(prev.reject, id) }));
    }
  };

  const setRequestData = (res) => {
    dispatch(
      SwitchMainMenu({
        type: COURSE_REQUEST_MENU,
        data: res.departments,
      }),
    );
    dispatch(SetTableData(res.requests));
    dispatch(SwitchSubMenu(0));
    dispatch(ToggleAdminLoader(''));
  };

  useEffect(() => {
    dispatch(ToggleAdminLoader('Fetching Course Requests'));
    getCourseRequests(token)
      .then(setRequestData)
      .catch(() => {
        toast.error('Error in fetching requests');
        dispatch(ToggleAdminLoader(''));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (_.isEmpty(activeData)) return <EmptyTable />;

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
      {activeData.map((item, key) => (
        <div className="admin-table--row" key={key}>
          <div className="admin-table--primary-row">
            <span title={item.course}>
              {item.course.length < 60 ? item.course : ShortName(item.course)} | {item.code}
            </span>
          </div>
          <div className="admin-table--secondary-row">
            <div className="row-item">
              <TableIconButton
                type={approved.includes(item.id) ? 'approve_confirmed' : 'approve'}
                handleClick={() => handleApprove(item.id)}
                loading={loading.approve.includes(item.id)}
              />
            </div>
            <div className="row-item">
              <TableIconButton
                type={rejected.includes(item.id) ? 'reject_confirmed' : 'reject'}
                handleClick={() => handleReject(item.id)}
                loading={loading.reject.includes(item.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CourseRequestsTable;
