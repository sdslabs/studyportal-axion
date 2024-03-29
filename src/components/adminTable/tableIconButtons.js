import React from 'react';
import PropTypes from 'prop-types';
import uploadIcon from 'assets/uploadIcon.svg';
import approveIcon from 'assets/approveIcon.svg';
import rejectIcon from 'assets/rejectIcon.svg';
import reloadIcon from 'assets/reloadIcon.svg';
import rejectConfirmed from 'assets/reject_confirmed.svg';
import approveConfirmed from 'assets/approve_confirmed.svg';
import downloadIcon from 'assets/downloadCloud.svg';
import previewIcon from 'assets/previewIcon.svg';
import small_loader from 'assets/small_loader.svg';

/**
 *  Component to handle all icon ctas in tables
 */
const IconDetails = {
  upload: { src: uploadIcon, class: 'admin-icon--primary' },
  download: { src: downloadIcon, class: 'admin-icon--primary' },
  approve: { src: approveIcon, class: 'admin-icon--success' },
  reject: { src: rejectIcon, class: 'admin-icon--error' },
  approve_confirmed: { src: approveConfirmed, class: '' },
  reject_confirmed: { src: rejectConfirmed, class: '' },
  preview: { src: previewIcon, class: 'admin-icon--primary' },
  reload: { src: reloadIcon, class: 'admin-icon--primary' },
};

const TableIconButton = ({ type, handleClick, loading }) => {
  if (loading)
    return <img src={small_loader} alt="loader" className="customfileuploader--button-loader" />;

  return (
    <div onClick={handleClick} className={`admin-icon-btn ${IconDetails[type].class}`}>
      <img src={IconDetails[type].src} alt={type} />
    </div>
  );
};

TableIconButton.propTypes = {
  handleClick: PropTypes.func,
  type: PropTypes.string,
  loading: PropTypes.bool,
};

export default TableIconButton;
