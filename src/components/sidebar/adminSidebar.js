/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import arrow from 'assets/left-arrow.svg';

const tabHeadings = ['Course Requests', 'User Requests', 'User Uploads'];

/*************** Sidebar for admin panel *****************/
const AdminSidebar = () => {
  const [currTab, setCurrTab] = useState(-1);

  const handleClick = (index) => {
    setCurrTab(index);
    //dispatch action here
  };

  return (
    <div className="sidebar">
      <div className="sidebar--course">{currTab === -1 ? 'Admin Panel' : tabHeadings[currTab]}</div>
      {currTab > -1 && (
        <div className="sidebar--back" onClick={() => handleClick(-1)}>
          <img src={arrow} alt="arrow" /> <span className="back">Back</span>
        </div>
      )}
      {currTab === -1 ? <MainMenu currTab={currTab} handleClick={handleClick} /> : <SubMenu />}
    </div>
  );
};

const MainMenu = ({ currTab, handleClick }) => {
  return (
    <div className="sidebar--course-name">
      {tabHeadings.map((heading, key) => (
        <div
          className={currTab === key ? 'coursehandle_active' : 'coursehandle'}
          key={key}
          onClick={() => handleClick(key)}
        >
          <span className="coursehandle--heading">{heading}</span>
        </div>
      ))}
    </div>
  );
};

const SubMenu = ({ menuitems }) => {
  return (
    <div className="sidebar--course-name">
      <div className={'coursehandle'}>
        <span className="coursehandle--heading">Sub Menu Title</span>
      </div>
      <div className={'coursehandle'}>
        <span className="coursehandle--heading">Sub Menu Title</span>
      </div>
      <div className={'coursehandle'}>
        <span className="coursehandle--heading">Sub Menu Title</span>
      </div>
      <div className={'coursehandle'}>
        <span className="coursehandle--heading">Sub Menu Title</span>
      </div>
      <div className={'coursehandle'}>
        <span className="coursehandle--heading">Sub Menu Title</span>
      </div>
      <div className={'coursehandle'}>
        <span className="coursehandle--heading">Sub Menu Title</span>
      </div>
    </div>
  );
};

export default AdminSidebar;
