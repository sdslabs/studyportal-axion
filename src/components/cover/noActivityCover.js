import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import error from 'assets/error.svg';
import 'styles/main.scss';
import { CLOSE_MODAL } from 'constants/action-types';

/**
 * NoActivityCover component for Studyportal.
 */
function NoActivityCover() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.modal);

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };
  console.log(state);

  return (
    <div className="noactivitycover" onClick={() => closeModal()}>
      <div className="noactivitycover--loader">
        <img className="loader" src={error} alt="loader" />
      </div>
      <div className="noactivitycover--hold">
        You currently have no registered activity. Please make a request or upload.
      </div>
    </div>
  );
}

export default NoActivityCover;
