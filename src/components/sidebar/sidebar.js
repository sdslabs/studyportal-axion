import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import arrow from 'assets/back.svg';
import search from 'assets/search.svg';
import CourseHandle from './courseHandle';
import 'styles/main.scss';
import { Link } from 'react-router-dom';
import { CLOSE_MODAL } from 'constants/action-types';
import MiniSearch from 'minisearch';
import _ from 'lodash';
import { getSearchCourseResults } from 'api/searchApi';

/**
 * Sidebar component for Studyportal homepage.
 */
const Sidebar = () => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.content);
  const [courses, setCourses] = useState(content.courses);

  const miniSearch = new MiniSearch({
    fields: ['title', 'code'], // fields to index for full-text search
    storeFields: ['id', 'title', 'code', 'department'],
    extractField: (document, fieldName) => {
      // Access nested fields
      return fieldName.split('.').reduce((doc, key) => doc && doc[key], document);
    }, // fields to return with search results
  });

  const searchCourse = (e) => {
    if (e.target.value != '') {
      getSearchCourseResults(e.target.value, content.activeDepartment.id, 'null')
        .then((res) => {
          setCourses(res.courses);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    } else {
      setCourses(content.courses);
    }
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  useEffect(() => {
    setCourses(content.courses);
    miniSearch.addAll(content.courses);
    // eslint-disable-next-line
  }, [content]);

  return (
    <div className="sidebar" onClick={() => closeModal()}>
      <div className="sidebar--head">
        <div className="sidebar--course">{content.activeDepartment.title}</div>
        <div className="sidebar--back">
          <Link to="/">
            <img src={arrow} alt="arrow" /> <span className="back">Departments</span>
          </Link>
        </div>
      </div>
      <div className="sidebar--course-name">
        <div className="sidebar--course-table_logout">
          {courses.map((course) => (
            <Link
              to={`/departments/${content.activeDepartment.abbr}/courses/${course.code}/`}
              key={course.id}
            >
              <CourseHandle
                login={false}
                code={course.code}
                title={course.title}
                course={course.id}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="sidebar--search">
        <input className="search" placeholder="Search Course" onChange={searchCourse} />
        <img className="search-button" src={search} alt="search" />
      </div>
    </div>
  );
};

export default Sidebar;
