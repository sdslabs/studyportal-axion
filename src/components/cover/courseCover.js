import React from 'react';
import { useDispatch } from 'react-redux';
import courseselect from 'assets/course_select.svg';
import 'styles/main.scss';
import { CLOSE_MODAL } from 'constants/action-types';

/**
 * Coursecover component for Studyportal.
 */
const CourseCover = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <div className="coursecover" onClick={() => closeModal()}>
      <div className="coursecover--image">
        <img src={courseselect} alt="Choose course" />
      </div>
      <div className="coursecover--hold">Select course to view its files</div>
    </div>
  );
};

export default CourseCover;
