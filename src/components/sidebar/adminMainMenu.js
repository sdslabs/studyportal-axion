import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  COURSE_REQUEST_MENU,
  USER_REQUEST_MENU,
  USER_UPLOADS_MENU,
} from 'constants/adminPanelMenu';

const MainMenu = () => {
  const store = useSelector((state) => state.adminPanel);

  const menuItems = [
    { type: COURSE_REQUEST_MENU, route: '/course-requests' },
    { type: USER_REQUEST_MENU, route: '/user-requests' },
    { type: USER_UPLOADS_MENU, route: '/user-uploads' },
  ];

  return (
    <div className={'sidebar--course-name'}>
      {menuItems.map((item, key) => (
        <Link to={item.route} key={key}>
          <div
            className={store.activeMainMenu === item.type ? 'coursehandle_active' : 'coursehandle'}
          >
            <span className="coursehandle--heading">{item.type}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MainMenu;
