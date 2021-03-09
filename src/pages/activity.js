import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/activity';
import ActivityLog from 'components/activitylog/activityLog';
import Error from 'components/error/error';
import { useDispatch } from 'react-redux';
import { RESET_ACTIVES } from 'constants/action-types';

const useDidMount = () => {
  const didMountRef = useRef(true);
  useEffect(() => {
    didMountRef.current = false;
  }, []);
  return didMountRef.current;
};

/**
 * Component to render different pages in Studyportal.
 */
const Activity = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const didMount = useDidMount();

  useEffect(() => {
    const route = props.match.params.activitytype;
    const possibleRoutes = [undefined, 'all', 'requests', 'uploads'];
    if (!(possibleRoutes.indexOf(route) > -1)) setError(true);
    if (didMount) dispatch({ type: RESET_ACTIVES }); // eslint-disable-next-line
  }, [didMount]);

  return (
    <div>
      <Header />
      {error ? (
        <Error />
      ) : (
        <>
          <Sidebar />
          <ActivityLog route={props.match.params.activitytype} />
        </>
      )}
    </div>
  );
};

export default Activity;

Activity.propTypes = {
  /** Holds URL decriptors. */
  match: PropTypes.object,
};
