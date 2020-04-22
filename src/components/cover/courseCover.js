import React from 'react';
import PropTypes from 'prop-types';
import courseselect from 'assets/course_select.svg';
import 'styles/main.scss';

function CourseCover(props) {
  return (
  <div className='coursecover' onClick={props.close}>
    <div className='coursecover--image'><img src={courseselect} alt='Choose course'/></div>
    <div className='coursecover--hold'>Select course to view its files</div>
  </div>
  );
}

export default CourseCover;

CourseCover.propTypes = {
  close: PropTypes.func
};
