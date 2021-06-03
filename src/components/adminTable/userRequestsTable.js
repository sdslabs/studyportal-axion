import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TableIconButton from './tableIconButtons';
import * as Tabs from 'constants/adminPanelMenu';
import { rejectFileRequest, uploadFile } from 'api/fileRequestApi';
import { getCookie } from '../../utils/handleCookies';

const UserRequestsTable = () => {
  const [rows, setRows] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [rejected, setRejected] = useState([]);
  const store = useSelector((state) => state.adminPanel);
  const activeData = store.tableData[Object.keys(store.tableData)[store.activeSubMenu]];
  const token = getCookie('token');

  const handleSendFile = (key, id, filetype, name) => {
    if (uploaded.includes(id) || rejected.includes(id)) return null;
    let tagId = 'file-input' + key;
    let file = document.getElementById(tagId).files[0];
    uploadFile(id, file, name, filetype, token).then(() => setUploaded((prev) => [...prev, id]));
  };

  const handleReject = (id) => {
    if (uploaded.includes(id) || rejected.includes(id)) return null;
    rejectFileRequest(id, token).then(() => setRejected((prev) => [...prev, id]));
  };

  useEffect(() => {
    switch (store.activeTab) {
      case Tabs.ALL_TAB:
        setRows(activeData);
        break;

      case Tabs.TUT_TAB:
        setRows(getFilteredArray(activeData, 'Tutorial'));
        break;

      case Tabs.BOOKS_TAB:
        setRows(getFilteredArray(activeData, 'Book'));
        break;

      case Tabs.NOTES_TAB:
        setRows(getFilteredArray(activeData, 'Notes'));
        break;

      case Tabs.EXAM_TAB:
        setRows(getFilteredArray(activeData, 'Examination Papers'));
        break;

      default:
        setRows([]);
    }
  }, [store.activeTab, activeData]);

  if (!rows || rows?.length === 0) return null;

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
            {store.activeTab === Tabs.ALL_TAB && (
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
