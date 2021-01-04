import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import error from 'assets/error.svg';

/**
 * 404Page component for Studyportal.
 */
function Error(props) {
  return (
    <div className="error" onClick={props.close}>
      <div className="error--image">
        <img src={error} alt="error" />
      </div>
      <div className="error--page">Whoops! 404</div>
      <div className="error--sorry">Seems like the page you looking for doesn&apos;t exist!</div>
      <div className="error--links">
        <Link to="/">
          <div className="error--home">Go to Home</div>
        </Link>
        <div className="error--back" onClick={() => window.history.back()}>
          Go back
        </div>
      </div>
    </div>
  );
}

export default Error;

Error.propTypes = {
  /** Function to close modals. */
  close: PropTypes.func,
};
