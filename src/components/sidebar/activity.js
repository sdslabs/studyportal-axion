import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'styles/main.scss';
import { Link } from 'react-router-dom';
import { CLOSE_MODAL } from 'constants/action-types';

/**
 * Sidebar component for Activity Page of Studyportal.
 */
const Sidebar = () => {
  const dispatch = useDispatch();
  const [selector, setSelector] = useState('all');

  const getRoute = () => {
    const url = window.location.href;
    const parts = url.split('/');
    if (parts[parts.length-1] === 'activity' || parts[parts.length-1] === 'all')
      setSelector('all');
    else if (parts[parts.length-1] === 'requests')
      setSelector('requests');
    else if (parts[parts.length-1] === 'uploads')
      setSelector('uploads');
  };

  useEffect(() => {
    getRoute();
  }, [window.location.href]);

  return (
    <div className='sidebar' onClick={() => dispatch({ type: CLOSE_MODAL })}>
      <div className='sidebar--course'>Activity</div>
      <div className='sidebar--course-name'>
          <div className='sidebar--course-table_logout'>
            <div className={ selector === 'all' ? 'coursehandle_active' : 'coursehandle'}>
              <Link to={`/activity/all`} className='link'>
                <span className={ selector === 'all' ?
                  'coursehandle--heading_active' : 'coursehandle--heading'}>
                  All Activity Log
                </span>
              </Link>
            </div>
            <div className={ selector === 'requests' ? 'coursehandle_active' : 'coursehandle'}>
              <Link to={`/activity/requests`} className='link'>
                <span className={ selector === 'requests' ? 'coursehandle--heading_active' : 'coursehandle--heading'}>
                  Requests Log
                </span>
              </Link>
            </div>
            <div className={ selector === 'uploads' ? 'coursehandle_active' : 'coursehandle'}>
              <Link to={`/activity/uploads`} className='link'>
                <span className={ selector === 'uploads' ? 'coursehandle--heading_active' : 'coursehandle--heading'}>
                  Uploads Log
                </span>
              </Link>
            </div>
          </div>
      </div>
  </div>
  );
};

export default Sidebar;
