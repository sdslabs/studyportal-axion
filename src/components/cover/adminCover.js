import React from 'react';
import loader from 'assets/fileloader.svg';
import 'styles/main.scss';
import PropTypes from 'prop-types';

/**
 * Admin Panel Loader component for Studyportal.
 */
const AdminCover = ({ customText }) => (
  <div className="admincover--wrapper">
    <img className="admincover--loader" src={loader} alt="loader" />
    <div className="admincover--subtext">{customText || 'Loading'}</div>
  </div>
);

AdminCover.propTypes = {
  customText: PropTypes.string,
};

export default AdminCover;
