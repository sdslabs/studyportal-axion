import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import arrow from 'assets/back.svg';
import CourseHandle from './courseHandle';
import 'styles/main.scss';
import { Link } from 'react-router-dom';
import { getCourseByDepartment } from 'api/courseApi';
import { addCourseForUser } from 'api/userApi';
import { getCookie } from 'utils/handleCookies';
import { getUser } from 'utils/getUser';
import { RESET_APP, CLOSE_MODAL } from 'constants/action-types';

function mapStateToProps(state) {
  return {
    user: state.user,
    content: state.content,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => getUser(dispatch),
    resetApp: () => dispatch({ type: RESET_APP }),
    closeModal: () => dispatch({ type: CLOSE_MODAL }),
  };
}

/**
 * Sidebar component for Studyportal homepage.
 */
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      course: 0,
    };
  }

  /**
   * Fetches course from API.
   *
   * @param {object} e
   */
  getCourse = (selectedOption) => {
    getCourseByDepartment(selectedOption.value).then((res) => {
      this.setState({ courses: res });
    });
  };

  /**
   * Sets selected course into state.
   *
   * @param {object} e
   */
  setCourse = (selectedOption) => {
    this.setState({ course: selectedOption.value });
  };

  /**
   * Registers course for the user.
   *
   * @param {object} e
   */
  addCourse = (e) => {
    e.preventDefault();
    const token = getCookie('token');
    addCourseForUser(token, this.state.course).then(() => {
      this.props.getUser();
    });
    e.target.reset();
  };

  render() {
    return (
      <div className="sidebar_login" onClick={() => this.props.closeModal()}>
        <div className="sidebar--coursecontent">
          <div className="sidebar--head_login">
            <div className="sidebar--course">My Courses</div>
            <div className="sidebar--back">
              <Link to="/">
                <img src={arrow} alt="arrow" /> <span className="back">Departments</span>
              </Link>
            </div>
          </div>
          <div className="sidebar--course-name">
            <div className="sidebar--course-table">
              {this.props.user.courses
                ? this.props.user.courses.map((course) => (
                    <Link
                      to={`/mycourse/departments/${course.department.abbreviation}/courses/${course.code}/`}
                      key={course.id}
                    >
                      <CourseHandle
                        login
                        title={course.title}
                        code={course.code}
                        course={course.id}
                        department={course.department}
                      />
                    </Link>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="sidebar--form-cover">
          <form className="sidebar--form" onSubmit={this.addCourse}>
            <div className="sidebar--form-header">Add Another Course</div>
            <div className="sidebar--form-header_department">Department</div>
            <Select
              className="sidebar--form-select_department"
              onChange={this.getCourse}
              options={this.props.content.departments.map(({ id, title }) => {
                return { value: id, label: title };
              })}
            />
            <div className="sidebar--form-header_course">Course Name</div>
            <Select
              className="sidebar--form-select_course"
              onChange={this.setCourse}
              options={this.state.courses.map(({ id, title }) => {
                return { value: id, label: title };
              })}
            />
            <div className="sidebar--form-button">
              <button type="submit">Add Course</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

Sidebar.propTypes = {
  /** Function to fetch user details. */
  getUser: PropTypes.func,
  /** Holds user data which is handled through Redux. */
  user: PropTypes.object,
  /** Holds the various content paramateres used across different contexts. */
  content: PropTypes.object,
  /** Function to close modals. */
  closeModal: PropTypes.func,
  /** Resets all user related data in the redux store. */
  resetApp: PropTypes.func,
};
