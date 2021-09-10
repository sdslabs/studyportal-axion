import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as constants from 'constants/adminPanelMenu';
import { getFileRequests, rejectFileRequest, uploadFile } from 'api/fileRequestApi';
import { getCookie } from 'utils/handleCookies';
import TableIconButton from 'components/adminTable/tableIconButtons';
import EmptyTable from 'components/error/adminEmptyTable';
import {
  SetTableData,
  SwitchMainMenu,
  SwitchSubMenu,
  SwitchTab,
  ToggleAdminLoader,
} from 'actions/adminPanelActions';
import _ from 'lodash';
import { toast } from 'react-toastify';

const UserRequestsTable = () => {
  const [rows, setRows] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState({ uploading: [], reject: [] });

  const dispatch = useDispatch();
  const store = useSelector((state) => state.adminPanel);
  const activeData = store.tableData[Object.keys(store.tableData)[store.activeSubMenu]];
  const token = getCookie('token');

  const handleSendFile = async (key, id, filetype, name) => {
    if (uploaded.includes(id) || rejected.includes(id)) return null;
    setLoading((prev) => ({ ...prev, uploading: [...prev.uploading, id] }));

    try {
      let tagId = 'file-input' + key;
      let file = document.getElementById(tagId).files[0];
      await uploadFile(id, file, name, filetype, token);
      setUploaded((prev) => [...prev, id]);
      toast.success('File Uploaded Successfully');
    } catch {
      toast.error('Error in Uploading File');
    } finally {
      setLoading((prev) => ({ ...prev, uploading: _.without(prev.uploading, id) }));
    }
  };

  const handleReject = async (id) => {
    if (uploaded.includes(id) || rejected.includes(id)) return null;
    setLoading((prev) => ({ ...prev, reject: [...prev.reject, id] }));

    try {
      await rejectFileRequest(id, token);
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
        type: constants.USER_REQUEST_MENU,
        data: res.courses,
      }),
    );
    dispatch(SetTableData(res.requests));
    dispatch(SwitchTab(constants.ALL_TAB));
    dispatch(SwitchSubMenu(0));
    dispatch(ToggleAdminLoader(''));
  };

  useEffect(() => {
    dispatch(ToggleAdminLoader('Fetching User Requests'));
    getFileRequests(token)
      .then(setRequestData)
      .catch(() => {
        toast.error('Error in fetching requests');
        dispatch(ToggleAdminLoader(''));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    switch (store.activeTab) {
      case constants.ALL_TAB:
        setRows(activeData);
        break;

      case constants.TUT_TAB:
        setRows(getFilteredArray(activeData, 'Tutorials'));
        break;

      case constants.BOOKS_TAB:
        setRows(getFilteredArray(activeData, 'Books'));
        break;

      case constants.NOTES_TAB:
        setRows(getFilteredArray(activeData, 'Notes'));
        break;

      case constants.EXAM_TAB:
        setRows(getFilteredArray(activeData, 'Examination Papers'));
        break;

      default:
        setRows([]);
    }
  }, [store.activeTab, activeData]);

  if (_.isEmpty(rows)) return <EmptyTable />;

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
      {rows.map((item, key) => (
        <div className="admin-table--row" key={key}>
          <div className="admin-table--primary-row">
            <span>{item?.title}</span>
            {store.activeTab === constants.ALL_TAB && (
              <p style={{ opacity: 0.7, margin: '0.6rem 0' }}>{item?.filetype}</p>
            )}
          </div>
          <div className="admin-table--secondary-row">
            <div className="row-item">
              <label htmlFor={'file-input' + key}>
                <TableIconButton
                  type={uploaded.includes(item.id) ? 'approve_confirmed' : 'upload'}
                  loading={loading.uploading.includes(item.id)}
                />
              </label>
              <input
                id={'file-input' + key}
                className="file-upload"
                type="file"
                onChange={() => handleSendFile(key, item.id, item.filetype, item.name)}
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

const getFilteredArray = (rawArray = [], filetype) => {
  let filteredArray = [];
  rawArray.forEach((item) => {
    if (item?.filetype === filetype) filteredArray.push(item);
  });
  return filteredArray;
};

export default UserRequestsTable;
