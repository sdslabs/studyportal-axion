import React, { useState } from 'react';
import TableIconButton from './tableIconButtons';
import { useSelector } from 'react-redux';
import { addUpload, deleteUpload } from 'api/uploadsApi';
import { getCookie } from 'utils/handleCookies';
import file_preview from 'assets/file_preview.svg';
import EmptyTable from 'components/error/adminEmptyTable';

const UserUploadsTable = () => {
  const store = useSelector((state) => state.adminPanel);
  const activeData = store.tableData[Object.keys(store.tableData)[store.activeSubMenu]];
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [previewLink, setPreviewLink] = useState('');
  const token = getCookie('token');

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
    window.open(link, '_blank');
  };

  if (!activeData || activeData?.length === 0) return <EmptyTable />;

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
      {previewLink !== '' ? (
        <iframe src={previewLink} className="file-preview"></iframe>
      ) : (
        <div className="file-preview">
          <img src={file_preview} />
          <p>Click on preview to preview a file.</p>
        </div>
      )}
    </>
  );
};

export default UserUploadsTable;
