import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/sidebar';
import CoursePage from 'components/coursecard/coursePage';
import CourseCover from 'components/cover/courseCover';
import Error from 'components/error/error';
import { getDepartmentInfoByAbbr } from 'api/departmentApi';
import { getCourseInfoByCode } from 'api/courseApi';
import {
  SWITCH_ACTIVE_DEPARTMENT,
  ADD_COURSES,
  SWITCH_ACTIVE_COURSE,
  SET_FILETYPE,
} from 'constants/action-types';

/**
 * Component to render Department pages in Studyportal.
 */
const Department = (props) => {
  const dispatch = useDispatch();
  const [course, setCourse] = useState(props.match.params.course);
  const [error, setError] = useState(false);

  const fetchPageDetails = (department, course) => {
    getDepartmentInfoByAbbr(department)
      .then((res) => {
        dispatch({
          type: SWITCH_ACTIVE_DEPARTMENT,
          payload: {
            id: res.department.id,
            abbr: res.department.abbreviation,
            title: res.department.title,
          },
        });
        dispatch({ type: ADD_COURSES, payload: res.courses });
        if (course !== undefined) {
          getCourseInfoByCode(res.department.id, course)
            .then((response) => {
              dispatch({
                type: SWITCH_ACTIVE_COURSE,
                payload: {
                  id: response.id,
                  title: response.title,
                  code: response.code,
                },
              });
            })
            .catch(() => {
              setError(true);
            });
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    setCourse(props.match.params.course);
    fetchPageDetails(props.match.params.department, props.match.params.course);
    dispatch({ type: SET_FILETYPE, payload: props.match.params.filetype }); // eslint-disable-next-line
  }, [props.match.params.department, props.match.params.course, props.match.params.filetype]);

  return (
    <div>
      <Header />
      {error ? (
        <Error />
      ) : (
        <>
          <Sidebar />
          {course !== undefined ? <CoursePage /> : <CourseCover />}
        </>
      )}
    </div>
  );
};

export default Department;

Department.propTypes = {
  /** Holds URL decriptors. */
  match: PropTypes.object,
};
