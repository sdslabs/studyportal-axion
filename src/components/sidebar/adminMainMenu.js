import React from 'react';
import { getCookie } from 'utils/handleCookies';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseRequests } from 'api/courseRequestApi';
import { getFileRequests } from 'api/fileRequestApi';
import { getUploads } from 'api/uploadsApi';
import * as constants from 'constants/adminPanelMenu';
import { SetTableData, SwitchMainMenu, SwitchSubMenu, SwitchTab } from 'actions/adminPanelActions';

const MainMenu = () => {
  const store = useSelector((state) => state.adminPanel);
  const dispatch = useDispatch();
  const token = getCookie('token');

  const menuItems = [
    constants.COURSE_REQUEST_MENU,
    constants.USER_REQUEST_MENU,
    constants.USER_UPLOADS_MENU,
  ];

  const handleDispatch = (type, subMenu, tableData) => {
    dispatch(
      SwitchMainMenu({
        type: type,
        data: subMenu,
      }),
    );
    dispatch(SetTableData(tableData));
    dispatch(SwitchTab(constants.ALL_TAB));
    dispatch(SwitchSubMenu(0));
  };

  const handleClick = (type) => {
    switch (type) {
      case menuItems[0]:
        getCourseRequests(token).then((res) => {
          handleDispatch(type, res.departments, res.requests);
        });
        break;

      case menuItems[1]:
        getFileRequests(token).then((res) => {
          handleDispatch(type, res.courses, res.requests);
        });
        break;

      case menuItems[2]:
        getUploads(token).then((res) => {
          handleDispatch(type, res.courses, res.uploads);
        });
        break;

      default:
        return null;
    }
  };

  return (
    <div className={`${store.activeMainMenu === '' ? '' : 'hidden'} sidebar--course-name`}>
      {menuItems.map((type, key) => (
        <div
          className={store.activeMainMenu === type ? 'coursehandle_active' : 'coursehandle'}
          key={key}
          onClick={() => handleClick(type)}
        >
          <span className="coursehandle--heading">{type}</span>
        </div>
      ))}
    </div>
  );
};

export default MainMenu;
