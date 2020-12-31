import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Header from 'components/home/header';
import Request from 'components/request/request';
import Upload from 'components/upload/upload';
import ShowMoreFiles from 'components/header/showMoreFiles';
import SubjectCard from 'components/home/subjectCard';
import 'styles/main.scss';
import { getDepartmentsList } from 'api/departmentApi';
import { Link } from 'react-router-dom';
import { CONFIG } from 'config/config';
import { resetApp } from 'actions/actions';
import { removeCookie } from 'utils/handleCookies';
import { CLOSE_MODAL } from 'constants/action-types';

/**
 * Homepage component for Studyportal.
 */
const Home = () => {
    const dispatch = useDispatch();
    const content = useSelector((state) => state.content);
    const modal = useSelector((state) => state.modal);

    const closeModal = () => {
      dispatch({ type: CLOSE_MODAL });
    };

    return(
        <div className='home'>
          <div className='home--header'>
            <Header />
          </div>
          <div className='home--choosedept' onClick={() => closeModal()}>
            <div onClick={() => closeModal()}>Click on department to continue</div>
            <div className='home--choosedept_und'/>
          </div>
          <div className={ modal.request || modal.upload || modal.showMore ?
            'home--sub_list_modal' : 'home--sub_list'} onClick={() => closeModal()}>
            { content.departments.map((department) => (
            <Link to={ `/departments/${department.abbreviation}` } key={department.abbreviation}>
              <SubjectCard name={ department.title } url={ department.imageurl } id={ department.id } />
            </Link>)
            ) }
          </div>
          <Request request={modal.request} close={() => {}} refreshRequest={() => {}}/>
          <Upload upload={modal.upload} close={() => {}}/>
        </div>
    );
};

export default Home;

Home.propTypes = {
  /** Holds user data which is handled through Redux. */
  user: PropTypes.object,
  /** Resets the app to a new logged out session */
  resetApp: PropTypes.func
};
