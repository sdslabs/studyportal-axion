/* eslint-disable react/prop-types */
import React from 'react';
import arrow from 'assets/back.svg';
import { useDispatch, useSelector } from 'react-redux';
import { SwitchMainMenu, SwitchSubMenu, SwitchTab } from 'actions/adminPanelActions';
import MainMenu from 'components/sidebar/adminMainMenu';
import SubMenu from 'components/sidebar/adminSubMenu';
import { useHistory, useLocation } from 'react-router-dom';

/**
 * Sidebar component for  admin panel.
 */
const AdminSidebar = () => {
  const store = useSelector((state) => state.adminPanel);
  const dispatch = useDispatch();
  const history = useHistory();
  const isAdminHome = useLocation().pathname === '/';

  const handleBackClick = () => {
    const payload = {
      type: '',
      data: [],
    };
    dispatch(SwitchMainMenu(payload));
    dispatch(SwitchSubMenu(-1));
    dispatch(SwitchTab(payload));
    history.push('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar--head">
        <div className="sidebar--course">{isAdminHome ? 'Admin Panel' : store.activeMainMenu}</div>
        {!isAdminHome ? (
          <div className="sidebar--back" onClick={handleBackClick}>
            <img src={arrow} alt="arrow" /> <span className="back">Back</span>
          </div>
        ) : (
          <div className="sidebar--padded-div" />
        )}
      </div>
      {isAdminHome ? <MainMenu /> : <SubMenu />}
    </div>
  );
};

export default AdminSidebar;
