import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/activity';
import ActivityLog from 'components/activitylog/activityLog';
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
  const didMount = useDidMount();

  useEffect(() => {
    if (didMount) dispatch({ type: RESET_ACTIVES }); // eslint-disable-next-line
  }, [didMount]);

  return (
    <div>
      <Header />
      <Sidebar />
      <ActivityLog route={props.match.params.activitytype} />
    </div>
  );
};

export default Activity;

Activity.propTypes = {
  /** Holds URL decriptors. */
  match: PropTypes.object,
};
