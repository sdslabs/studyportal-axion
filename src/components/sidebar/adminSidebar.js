/* eslint-disable react/prop-types */
import React from 'react';
import arrow from 'assets/back.svg';
import { useDispatch, useSelector } from 'react-redux';
import { SwitchMainMenu, SwitchSubMenu, SwitchTab } from 'actions/adminPanelActions';
import MainMenu from 'components/sidebar/adminMainMenu';
import SubMenu from 'components/sidebar/adminSubMenu';

/**
 * Sidebar component for  admin panel.
 */
const AdminSidebar = () => {
  const store = useSelector((state) => state.adminPanel);
  const dispatch = useDispatch();

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
      <div className="sidebar--head">
        <div className="sidebar--course">
          {store.activeMainMenu === '' ? 'Admin Panel' : store.activeMainMenu}
        </div>
        {store.activeMainMenu !== '' ? (
          <div className="sidebar--back" onClick={handleBackClick}>
            <img src={arrow} alt="arrow" /> <span className="back">Back</span>
          </div>
        ) : (
          <div className="sidebar--padded-div" />
        )}
      </div>
      <MainMenu />
      <SubMenu />
    </div>
  );
};

export default AdminSidebar;
