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

const UserRequestsTable = () => {
  const [rows, setRows] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [rejected, setRejected] = useState([]);

  const dispatch = useDispatch();
  const store = useSelector((state) => state.adminPanel);
  const activeData = store.tableData[Object.keys(store.tableData)[store.activeSubMenu]];
  const token = getCookie('token');

  const setLoading = (loaderText = '') => dispatch(ToggleAdminLoader(loaderText));

  const handleSendFile = (key, id, filetype, name) => {
    if (uploaded.includes(id) || rejected.includes(id)) return null;
    let tagId = 'file-input' + key;
    let file = document.getElementById(tagId).files[0];
    setLoading('Uploading File');
    uploadFile(id, file, name, filetype, token)
      .then(() => {
        setUploaded((prev) => [...prev, id]);
        setLoading('');
      })
      .catch(() => setLoading(''));
  };

  const handleReject = (id) => {
    if (uploaded.includes(id) || rejected.includes(id)) return null;
    setLoading('Rejecting User Request');
    rejectFileRequest(id, token)
      .then(() => {
        setRejected((prev) => [...prev, id]);
        dispatch(ToggleAdminLoader(''));
      })
      .catch(() => setLoading(''));
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
    getFileRequests(token).then(setRequestData);
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
