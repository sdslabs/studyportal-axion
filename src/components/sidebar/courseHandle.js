import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import coursedot from 'assets/coursedot.png';
import 'styles/main.scss';
import shortName from 'utils/short-name';
import { SWITCH_ACTIVE_COURSE } from 'constants/action-types';

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
    if(user.courses) {
        if(user.courses.find(o => o.code === props.code) !== undefined)
            return true;
        else return false;
    }
    else return false;
  };
  const [mycourse] = useState(checkMyCourse(props));

  /**
   * Activates associated course.
   */
  const activatecourse = (props) => {
    const activeCourse = {
      id: props.course,
      code: props.code,
      title: props.title
    };
    dispatch({ type: SWITCH_ACTIVE_COURSE, payload: activeCourse });
  };

  if (props.login) {
      return(
          <div className='coursehandle'>
              <span className='coursehandle--heading' onClick={() => activatecourse(props)}>
                  {`${ props.title.length >= 30 ? shortName(props.title) : props.title } ${props.code}`}
              </span>
              <span>{ props.code === content.activeCourse.code ?
                  <span className='coursehandle--activedot'>
                      <img src={coursedot} alt='coursedot'/>
                  </span> : <span /> }
              </span>
          </div>
      );
  }

  else {
      return(
          <div className={ props.code === content.activeCourse.code ? 'coursehandle_active' : 'coursehandle'}>
              <span className={ props.code === content.activeCourse.code ?
                  'coursehandle--heading_active' : 'coursehandle--heading'} onClick={() => activatecourse(props)}>
                  {`${ props.title.length >= 30 ? shortName(props.title) : props.title } ${props.code}`}
              </span>
              { mycourse ? <span className='coursehandle--mycourse'>My Course</span> : <span />}
          </div>
      );
  }
};

export default CourseHandle;
