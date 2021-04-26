/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import arrow from 'assets/left-arrow.svg';
import { getCourseRequests } from '../../admin/api/courseRequestApi';
import { getFileRequests } from '../../admin/api/fileRequestApi';
import { getUploads } from '../../admin/api/uploadsApi';

import { getCookie } from '../../utils/handleCookies';

const tabHeadings = ['Course Requests', 'User Requests', 'User Uploads'];

/*************** Sidebar for admin panel *****************/
const AdminSidebar = ({ setActiveTab }) => {
  const [currTab, setCurrTab] = useState(-1);
  const [menuitems, setmenuitems] = useState([]);
  const [items, setitems] = useState({});

  const handleClick = (index) => {
    const token = getCookie('token');
    setCurrTab(index);
    setmenuitems([]);
    //dispatch action here
    if (index === 0) {
      getCourseRequests(token).then((res) => {
        setmenuitems(res.departments);
        setitems(res.requests);
      });
    } else if (index === 1) {
      getFileRequests(token).then((res) => {
        setmenuitems(res.courses);
        setitems(res.requests);
      });
    } else if (index === 2) {
      getUploads(token).then((res) => {
        setmenuitems(res.courses);
        setitems(res.requests);
      });
    }

    setActiveTab(index); //temprory switch tab logic
  };
  return (
    <div className="sidebar">
      <div className="sidebar--course">{currTab === -1 ? 'Admin Panel' : tabHeadings[currTab]}</div>
      {currTab > -1 && (
        <div className="sidebar--back" onClick={() => handleClick(-1)}>
          <img src={arrow} alt="arrow" /> <span className="back">Back</span>
        </div>
      )}
      {currTab === -1 ? (
        <MainMenu currTab={currTab} handleClick={handleClick} />
      ) : (
        <SubMenu menuitems={menuitems} currTab={currTab} />
      )}
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

const SubMenu = ({ menuitems, currTab }) => {
  return (
    <div className="sidebar--course-name">
      {menuitems.length !== 0 ? (
        menuitems.map((request, key) => (
          <div className={'coursehandle'} key={key}>
            {currTab === 0 ? (
              <span className="coursehandle--heading">{request.title}</span>
            ) : (
              <span className="coursehandle--heading">
                {request.title} | {request.code}
              </span>
            )}
          </div>
        ))
      ) : (
        <div>Nothing to show</div>
      )}
    </div>
  );
};

export default AdminSidebar;
