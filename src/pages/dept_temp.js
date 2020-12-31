import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/sidebar';
import CoursePage from 'components/coursecard/coursePage';
import CourseCover from 'components/cover/courseCover';
import { getDepartmentInfoByAbbr } from 'api/departmentApi';
import { getCourseInfoByCode } from 'api/courseApi';
import {
  SWITCH_ACTIVE_DEPARTMENT,
  ADD_COURSES,
  SWITCH_ACTIVE_COURSE
} from 'constants/action-types';

/**
 * Component to render different pages in Studyportal.
 */
const Department = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [course] = useState(props.match.params.course);

  const fetchPageDetails = (department, course) => {
    getDepartmentInfoByAbbr(department).then((res,err) => {
      if(err) {
        //TODO handle error
      }
      else {
          dispatch({ type: SWITCH_ACTIVE_DEPARTMENT, payload: {
            id: res.department.id,
            abbr: res.department.abbreviation,
            title: res.department.title
          } });
          dispatch({ type: ADD_COURSES, payload: res.courses });
          if(course !== undefined) {
            getCourseInfoByCode(res.department.id,course).then((response,err) => {
              if(err) {
                //TODO handle error
              }
              else {
                dispatch({ type: SWITCH_ACTIVE_COURSE, payload: {
                  id: response.id,
                  title: response.title,
                  code: response.code
                } });
              }
            });
          }
        }
      });
  };

  useEffect(() => {
    fetchPageDetails(props.match.params.department, props.match.params.course);
  }, [window.location.href]);

  return (
    <div>
        <Header />
        <Sidebar />
        { course !== undefined ?
          <CoursePage login={user.login}
                      getUserDetails={() => {}}
                      course_code={this.props.match.params.course}
                      department_abbr={this.props.match.params.department}
                      file_type={this.props.match.params.file_type}
                      error={this.error}
                      close={() => {}}/> : <CourseCover close={() => {}}/> }
    </div>
  );
};

export default Department;

Department.propTypes = {
  /** Holds user data which is handled through Redux. */
  user: PropTypes.object,
  /** URL of present location. */
  location: PropTypes.object,
  /** Sets 404 page. */
  error: PropTypes.bool,
  /** Sets user data in Redux. */
  setUser: PropTypes.func,
  /** Holds URL decriptors. */
  match: PropTypes.object,
  /** Resets the app to a new logged out session */
  resetApp: PropTypes.func
};
