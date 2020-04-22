import React from 'react';
import PropTypes from 'prop-types';
import loader from 'assets/fileloader.svg';
import 'styles/main.scss';

function FileCover(props) {
  return (
  <div className='filecover' onClick={props.close}>
    <div className='filecover--loader'><img className='loader' src={loader} alt='loader'/></div>
    <div className='filecover--hold'>Loading course files</div>
  </div>
  );
}

export default FileCover;

FileCover.propTypes = {
  close: PropTypes.func
};