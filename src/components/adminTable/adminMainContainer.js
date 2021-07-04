import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as constants from 'constants/adminPanelMenu';
import { SwitchTab } from 'actions/adminPanelActions';

const Tabs = [
  constants.ALL_TAB,
  constants.TUT_TAB,
  constants.BOOKS_TAB,
  constants.NOTES_TAB,
  constants.EXAM_TAB,
];

const AdminMainContainer = (props) => {
  const store = useSelector((state) => state.adminPanel);
  const dispatch = useDispatch();

  return (
    <div className="coursepage">
      {store.activeMainMenu === constants.USER_REQUEST_MENU && (
        <>
          <div className="coursepage--head">{store.subMenuData[store.activeSubMenu]?.title}</div>
          <div className="coursepage--category">
            {Tabs.map((tab, index) => (
              <span
                className={`${store.activeTab === tab ? 'active-tab-admin' : ''} ${
                  !index ? 'coursepage--category_all' : 'coursepage--category_tut'
                } tab-admin`}
                key={index}
                onClick={() => dispatch(SwitchTab(tab))}
              >
                {tab}
                {store.activeTab === tab && <div className="active-tab-underline" />}
              </span>
            ))}
          </div>
        </>
      )}
      {props.children}
    </div>
  );
};

AdminMainContainer.propTypes = {
  children: PropTypes.any,
};

export default AdminMainContainer;
