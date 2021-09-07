import React, { useEffect, useState } from 'react';
import TableIconButton from './tableIconButtons';
import { useDispatch, useSelector } from 'react-redux';
import { addUpload, deleteUpload, getUploads } from 'api/uploadsApi';
import { getCookie } from 'utils/handleCookies';
import file_preview from 'assets/file_preview.svg';
import EmptyTable from 'components/error/adminEmptyTable';
import _ from 'lodash';
import { SetTableData, SwitchMainMenu, SwitchSubMenu } from 'actions/adminPanelActions';
import { USER_UPLOADS_MENU } from 'constants/adminPanelMenu';
import ShortName from 'utils/short-name';

const UserUploadsTable = () => {
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [previewLink, setPreviewLink] = useState('');

  const token = getCookie('token');
  const store = useSelector((state) => state.adminPanel);
  const activeData = store.tableData[Object.keys(store.tableData)[store.activeSubMenu]];
  const dispatch = useDispatch();

  const previewFile = (url) => {
    const link = `https://drive.google.com/file/d/${url}/preview`;
    setPreviewLink(link);
  };

  const handleApprove = (id) => {
    if (approved.includes(id) || rejected.includes(id)) return null;
    addUpload(id, token).then(() => setApproved((prev) => [...prev, id]));
  };

  const handleReject = (id) => {
    if (approved.includes(id) || rejected.includes(id)) return null;
    deleteUpload(id, token).then(() => setRejected((prev) => [...prev, id]));
  };

  const downloadFile = (url) => {
    const link = `https://drive.google.com/a/iitr.ac.in/uc?id=${url}&export=download`;

    let newTab = window.open(link, '_blank');
    newTab.opener = null;
    newTab.location = link;
  };

  const setRequestData = (res) => {
    dispatch(
      SwitchMainMenu({
        type: USER_UPLOADS_MENU,
        data: res.courses,
      }),
    );
    dispatch(SetTableData(res.uploads));
    dispatch(SwitchSubMenu(0));
  };

  useEffect(() => {
    getUploads(token).then(setRequestData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPreviewLink('');
  }, [activeData]);

  if (_.isEmpty(activeData)) return <EmptyTable />;

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
      <div className="admin-table--inner-container">
        {activeData.map((item, key) => (
          <div className="admin-table--row" key={key}>
            <div className="admin-table--primary-row">
              <span title={item?.title}>
                {item?.title.length < 70 ? item?.title : ShortName(item?.title)}
              </span>
            </div>
            <div className="admin-table--secondary-row">
              <div className="row-item">
                <TableIconButton
                  type="download"
                  handleClick={() => {
                    downloadFile(item.driveid);
                  }}
                />
              </div>
              <div className="row-item">
                <TableIconButton type="preview" handleClick={() => previewFile(item.driveid)} />
              </div>
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
      </div>
      {previewLink !== '' ? (
        <iframe src={previewLink} className="file-preview" title="preview"></iframe>
      ) : (
        <div className="file-preview">
          <img src={file_preview} alt="preview" />
          <p>Click on preview to preview a file.</p>
        </div>
      )}
    </>
  );
};

export default UserUploadsTable;
