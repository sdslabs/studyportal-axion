import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import arrow from 'assets/left-arrow.svg';
import CourseHandle from './courseHandle';
import 'styles/main.scss';
import { Link } from 'react-router-dom';
import { CLOSE_MODAL } from 'constants/action-types';

/**
 * Sidebar component for Studyportal homepage.
 */
const Sidebar = () => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.content);

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <div className="sidebar" onClick={() => closeModal()}>
      <div className="sidebar--course">{content.activeDepartment.title}</div>
      <div className="sidebar--back">
        <Link to="/">
          <img src={arrow} alt="arrow" /> <span className="back">Departments</span>
        </Link>
      </div>
      <div className="sidebar--course-name">
        <div className="sidebar--course-table_logout">
          {content.courses.map((course) => (
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
    </div>
  );
};

export default Sidebar;
