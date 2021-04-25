import React, { useEffect, useState } from 'react';
import uploadIcon from 'assets/uploadIcon.svg';
import approveIcon from 'assets/approveIcon.svg';
import rejectIcon from 'assets/rejectIcon.svg';
import reloadIcon from 'assets/reloadIcon.svg';
import rejectConfirmed from 'assets/reject_confirmed.svg';
import approveConfirmed from 'assets/approve_confirmed.svg';
import downloadIcon from 'assets/download.svg';
import previewIcon from 'assets/previewIcon.svg';

/**************** Component to handle all icon ctas in tables *******************/
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

const TableIconButton = ({ type, handleClick }) => {
  return (
    <div onClick={handleClick} className={`admin-icon-btn ${IconDetails[type].class}`}>
      <img src={IconDetails[type].src} alt="" />
    </div>
  );
};

export default TableIconButton;
