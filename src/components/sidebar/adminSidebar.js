/* eslint-disable react/prop-types */
import React from 'react';
import arrow from 'assets/left-arrow.svg';
import { getCourseRequests } from '../../api/courseRequestApi';
import { getFileRequests } from '../../api/fileRequestApi';
import { getUploads } from '../../api/uploadsApi';
import { getCookie } from '../../utils/handleCookies';
import * as constants from 'constants/adminPanelMenu';
import { useDispatch, useSelector } from 'react-redux';
import { SetTableData, SwitchMainMenu, SwitchSubMenu, SwitchTab } from 'actions/adminPanelActions';

/*************** Sidebar for admin panel *****************/
const AdminSidebar = () => {
  const store = useSelector((state) => state.adminPanel);
  const dispatch = useDispatch();
  const token = getCookie('token');

  const handleBackClick = () => {
    const payload = {
      type: '',
      data: [],
    };
    dispatch(SwitchMainMenu(payload));
    dispatch(SwitchSubMenu(-1));
    dispatch(SwitchTab(payload));
  };

  return (
    <div className="sidebar">
      <div className="sidebar--course">
        {store.activeMainMenu === '' ? 'Admin Panel' : store.activeMainMenu}
      </div>
      {store.activeMainMenu !== '' && (
        <div className="sidebar--back" onClick={handleBackClick}>
          <img src={arrow} alt="arrow" /> <span className="back">Back</span>
        </div>
      )}
      <MainMenu store={store} dispatch={dispatch} token={token} />
      <SubMenu store={store} dispatch={dispatch} />
    </div>
  );
};

const MainMenu = ({ store, dispatch, token }) => {
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

const SubMenu = ({ store, dispatch }) => {
  return (
    <div className={`${store.activeSubMenu > -1 ? '' : 'hidden'} sidebar--course-name`}>
      {store.subMenuData.length !== 0 ? (
        store.subMenuData.map((item, key) => (
          <div
            className={store.activeSubMenu === key ? 'coursehandle_active' : 'coursehandle'}
            key={key}
            onClick={() => dispatch(SwitchSubMenu(key))}
          >
            <span className="coursehandle--heading">
              {item.title}
              {item.abbreviation && ` | ${item.abbreviation}`}
            </span>
          </div>
        ))
      ) : (
        <div className="coursehandle">
          <span className="coursehandle--heading" style={{ opacity: 0.5 }}>
            Nothing to show Here
          </span>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
