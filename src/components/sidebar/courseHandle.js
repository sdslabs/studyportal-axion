import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import course from 'assets/course.svg';
import 'styles/main.scss';
import shortName from 'utils/short-name';
import { SWITCH_ACTIVE_COURSE, SWITCH_ACTIVE_MYCOURSE } from 'constants/action-types';

/**
 * Component to render course in sidebar.
 */
const CourseHandle = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const content = useSelector((state) => state.content);

  /**
   * Check if course is registered for user.
   */
  const checkMyCourse = (props) => {
    if (user.courses) {
      if (user.courses.find((o) => o.code === props.code) !== undefined) return true;
      else return false;
    } else return false;
  };
  const [mycourse, setMyCourse] = useState(checkMyCourse(props));

  /**
   * Activates associated mycourse.
   */
  const activatemycourse = (props) => {
    const activeMyCourse = {
      id: props.course,
      code: props.code,
      title: props.title,
    };
    dispatch({ type: SWITCH_ACTIVE_MYCOURSE, payload: activeMyCourse });
  };

  /**
   * Activates associated course.
   */
  const activatecourse = (props) => {
    const activeCourse = {
      id: props.course,
      code: props.code,
      title: props.title,
    };
    dispatch({ type: SWITCH_ACTIVE_COURSE, payload: activeCourse });
  };

  useEffect(() => {
    setMyCourse(checkMyCourse(props));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (props.login) {
    return (
      <div
        className={
          props.code === content.activeMyCourse.code ? 'coursehandle_active' : 'coursehandle'
        }
        onClick={() => activatemycourse(props)}
      >
        <span className="coursehandle--heading">
          {`${props.title.length >= 30 ? shortName(props.title) : props.title} ${props.code}`}
        </span>
        <div className="coursehandle--heading-dept">{props.department.abbreviation} Department</div>
      </div>
    );
  } else {
    return (
      <div
        className={
          props.code === content.activeCourse.code ? 'coursehandle_active' : 'coursehandle'
        }
        onClick={() => activatecourse(props)}
      >
        <span className="coursehandle--heading">
          {`${props.title.length >= 30 ? shortName(props.title) : props.title} ${props.code}`}
        </span>
        {mycourse ? <img className="coursehandle--mycourse" src={course} alt="mycourse" /> : null}
      </div>
    );
  }
};

export default CourseHandle;
