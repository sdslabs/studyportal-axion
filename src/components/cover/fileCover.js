import React from 'react';
import { useDispatch } from 'react-redux';
import loader from 'assets/fileloader.svg';
import 'styles/main.scss';
import { CLOSE_MODAL } from 'constants/action-types';

/**
 * Filecover component for Studyportal.
 */
function FileCover() {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <div className="filecover" onClick={() => closeModal()}>
      <div className="filecover--loader">
        <img className="loader" src={loader} alt="loader" />
      </div>
      <div className="filecover--hold">Loading course files</div>
    </div>
  );
}

export default FileCover;
