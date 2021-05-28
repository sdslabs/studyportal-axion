import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserRequestsTable from './userRequestsTable';
import * as constants from 'constants/adminPanelMenu';
import { SwitchTab } from 'actions/adminPanelActions';
import CourseRequestsTable from './courseRequestsTable';

const Tabs = [
  constants.ALL_TAB,
  constants.TUT_TAB,
  constants.BOOKS_TAB,
  constants.NOTES_TAB,
  constants.EXAM_TAB,
];

const AdminMainContainer = () => {
  const store = useSelector((state) => state.adminPanel);
  const dispatch = useDispatch();

  const getTable = () => {
    switch (store.activeMainMenu) {
      case constants.COURSE_REQUEST_MENU:
        return <CourseRequestsTable />;

      case constants.USER_REQUEST_MENU:
        return <UserRequestsTable />;

      case constants.USER_UPLOADS_MENU:
        return <h1>User Uploads</h1>;

      default:
        return <p>No option selected</p>;
    }
  };

  return (
    <div className="coursepage">
      {store.activeMainMenu !== constants.COURSE_REQUEST_MENU && (
        <div className="coursepage--head">{store.subMenuData[store.activeSubMenu]?.title}</div>
      )}
      {store.activeMainMenu === constants.USER_REQUEST_MENU && (
        <div className="coursepage--category">
          {Tabs.map((tab, index) => (
            <span
              className={`${
                store.activeTab === tab ? 'active-tab-admin' : ''
              } ${'coursepage--category_tut tab-admin'}`}
              style={index === 0 ? { borderLeft: 'none' } : null}
              key={index}
              onClick={() => dispatch(SwitchTab(tab))}
            >
              {tab}
              {store.activeTab === tab && <div className="active-tab-underline" />}
            </span>
          ))}
        </div>
      )}
      {getTable()}
    </div>
  );
};

export default AdminMainContainer;
