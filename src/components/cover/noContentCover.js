import React from 'react';
import { useDispatch } from 'react-redux';
import error from 'assets/error.svg';
import 'styles/main.scss';
import { CLOSE_MODAL } from 'constants/action-types';

/**
 * NoContentCover component for Studyportal.
 */
function NoContentCover() {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <div className="nocontentcover" onClick={() => closeModal()}>
      <div className="nocontentcover--loader">
        <img className="loader" src={error} alt="loader" />
      </div>
      <div className="nocontentcover--hold">No files available to display.</div>
    </div>
  );
}

export default NoContentCover;
