import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/activity';
import ActivityLog from 'components/activitylog/activityLog';

/**
 * Component to render different pages in Studyportal.
 */
const Activity = (props) => {
  return (
    <div>
      <Header />
      <Sidebar />
      <ActivityLog route={props.match.params.activitytype}/>
    </div>
  );
};

export default Activity;

Activity.propTypes = {
  /** Holds URL decriptors. */
  match: PropTypes.object
};
