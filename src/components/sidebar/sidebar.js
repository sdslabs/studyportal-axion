import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import arrow from 'assets/left-arrow.svg';
import CourseHandle from './courseHandle';
import 'styles/main.scss';
import { Link } from 'react-router-dom';
import { getDepartmentsList } from 'api/departmentApi';
import { getCourseByDepartment } from 'api/courseApi';
import { addCourseForUser } from 'api/userApi';
import { getCookie } from 'utils/handleCookies';

const mapStateToProps = state => {
  return { user: state };
};

/**
 * Sidebar component for Studyportal homepage.
 */
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          login: props.activity,
          departments: [],
          courses: [],
          course: 0,
          department: props.department
        };

        this.active = this.props.active;
        this.handleClick = this.handleClick.bind(this);
        this.getCourse = this.getCourse.bind(this);
        this.setCourse = this.setCourse.bind(this);
        this.addCourse = this.addCourse.bind(this);
    }

    componentDidMount() {
      getDepartmentsList().then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.setState({ departments:res.department });
        }
      });
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
      this.active = nextProps.active;
      this.setState({ login:nextProps.activity, department: nextProps.department });
    }

    /**
    * Activates course.
    */
    handleClick(active) {
        this.active = active;
        this.forceUpdate();
    }

    /**
    * Fetches course from API.
    *
    * @param {object} e
    */
    getCourse(e) {
      getCourseByDepartment(e.target[e.target.selectedIndex].id).then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.setState({ courses:res });
        }
      });
    }

    /**
    * Sets selected course into state.
    *
    * @param {object} e
    */
    setCourse(e) {
      this.setState({ course:e.target[e.target.selectedIndex].id });
    }

    /**
    * Registers course for the user.
    *
    * @param {object} e
    */
    addCourse(e) {
      e.preventDefault();
      const token = getCookie('token');
      addCourseForUser(token,this.state.course).then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          //TODO handle success
          this.props.getUserDetails();
        }
      });
      e.target.reset();
    }

    render() {
        if (this.props.activity === 'mycourse') {
            return(
                <div className='sidebar_login' onClick={this.props.close}>
                  <div className='sidebar--coursecontent'>
                    <div className='sidebar--course'>My Courses ({this.props.user.id})</div>
                    <div className='sidebar--back'>
                      <Link to='/'>
                        <img src={arrow} alt='arrow' /> <span className='back'>Departments</span>
                      </Link>
                    </div>
                    <div className='sidebar--course-name'>
                        <div className='sidebar--course-table'>
                          { this.props.user.courses ? this.props.user.courses.map((course) => (
                            <Link to={ `/mycourse/departments/${course.department.abbreviation}/courses/${course.code}/` } key={ course.id }>
                                <CourseHandle login
                                              name={ `${course.title} ${course.code}` }
                                              title={course.title}
                                              code={course.code}
                                              course={course.id}
                                              active={this.active}
                                              handleClick={this.handleClick}/>
                            </Link>
                          )) : null}
                        </div>
                    </div>
                  </div>
                  <div className='sidebar--form-cover'>
                      <form className='sidebar--form' onSubmit={this.addCourse}>
                          <div className='sidebar--form-header'>Add Another Course</div>
                          <div className='sidebar--form-header_department'>Department</div>
                          <select className='sidebar--form-select_department' onChange={this.getCourse} name='department'>
                              <option>--Select Department--</option>
                              { this.state.departments.map(department => (
                                <option key={ department.id } id={ department.id }>{ department.title }</option>))
                              }
                          </select>
                          <div className='sidebar--form-header_course'>Course Name</div>
                          <select className='sidebar--form-select_course' onChange={this.setCourse}>
                              <option>--Select Course--</option>
                              { this.state.courses.map(course => (
                                <option key={ course.id } id={ course.id }>{ course.title} { course.code }</option>))
                              }
                          </select>
                          <div className='sidebar--form-button'><button type='submit'>Add Course</button></div>
                      </form>
                  </div>
                </div>
            );
        }

        else if (this.props.activity === 'activity') {
          return (
            <div className='sidebar' onClick={this.props.close}>
              <div className='sidebar--course'>Activity</div>
              <div className='sidebar--course-name'>
                  <div className='sidebar--course-table_logout'>
                    <div className={ this.props.active === 'all' || this.props.active === undefined ? 'coursehandle_active' : 'coursehandle'}>
                      <Link to={`/activity/all`} className='link'>
                        <span className={ this.props.active === 'all' || this.props.active === undefined ?
                          'coursehandle--heading_active' : 'coursehandle--heading'}>
                          All Activity Log
                        </span>
                      </Link>
                    </div>
                    <div className={ this.props.active === 'requests' ? 'coursehandle_active' : 'coursehandle'}>
                      <Link to={`/activity/requests`} className='link'>
                        <span className={ this.props.active === 'requests' ? 'coursehandle--heading_active' : 'coursehandle--heading'}>
                          Requests Log
                        </span>
                      </Link>
                    </div>
                    <div className={ this.props.active === 'uploads' ? 'coursehandle_active' : 'coursehandle'}>
                      <Link to={`/activity/uploads`} className='link'>
                        <span className={ this.props.active === 'uploads' ? 'coursehandle--heading_active' : 'coursehandle--heading'}>
                          Uploads Log
                        </span>
                      </Link>
                    </div>
                  </div>
              </div>
          </div>
          );
        }

        else {
            return(
                <div className='sidebar' onClick={this.props.close}>
                    <div className='sidebar--course'>{this.state.department}</div>
                    <div className='sidebar--back'>
                      <Link to='/'>
                        <img src={arrow} alt='arrow' /> <span className='back'>Departments</span>
                      </Link>
                    </div>
                    <div className='sidebar--course-name'>
                        <div className='sidebar--course-table_logout'>
                          { this.props.courses.map((course) => (
                            <Link to={ `/departments/${this.props.department_abbr}/courses/${course.code}/` } key={ course.id }>
                                <CourseHandle login={false}
                                              getCourse = {this.getCourse}
                                              name={ `${course.title} ${course.code}` }
                                              title={course.title} code={course.code}
                                              course={course.id}
                                              active={this.active}
                                              handleClick={this.handleClick}/>
                            </Link>
                          )) }
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps)(Sidebar);

Sidebar.propTypes = {
  /** Holds currently active course. */
  active: PropTypes.string,
  /** Holds status of activity route. */
  activity: PropTypes.string,
  /** Holds current department title. */
  department: PropTypes.string,
  /** Fetch user details from API. */
  getUserDetails: PropTypes.func,
  /** Holds user login status. */
  login: PropTypes.bool,
  /** Function to close modals. */
  close: PropTypes.func,
  /** Holds user data which is handled through Redux. */
  user: PropTypes.object,
  /** Holds course list displayed. */
  courses: PropTypes.array,
  /** Holds department abbreviation for the current department. */
  department_abbr: PropTypes.string
};
