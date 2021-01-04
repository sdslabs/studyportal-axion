import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import arrow from 'assets/left-arrow.svg';
import CourseHandle from './courseHandle';
import 'styles/main.scss';
import { Link } from 'react-router-dom';
import { getCourseByDepartment } from 'api/courseApi';
import { loginUserWithToken, loginUserWithCookie, addCourseForUser } from 'api/userApi';
import { getCookie, removeCookie } from 'utils/handleCookies';
import { SET_USER, RESET_APP, CLOSE_MODAL } from 'constants/action-types';

function mapStateToProps(state) {
  return {
    user: state.user,
    content: state.content,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch({ type: SET_USER, payload: user }),
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
   * Fetch user details.
   */
  getUser = () => {
    const token = getCookie('token');
    const cookie = getCookie('sdslabs');
    if (token) {
      loginUserWithToken(token)
        .then((res) => {
          const user = {
            id: res.user.falcon_id,
            username: res.user.username,
            email: res.user.email,
            profile_image: res.user.profile_image,
            courses: res.courses,
          };
          this.props.setUser(user);
          // Logged in with token
        })
        .catch(() => {
          // Token is corrupted
          if (cookie) {
            loginUserWithCookie()
              .then((res) => {
                const user = {
                  login: true,
                  id: res.user.falcon_id,
                  username: res.user.username,
                  email: res.user.email,
                  profile_image: res.user.profile_image,
                  courses: res.courses,
                };
                // TODO
                this.props.setUser(user);
                // Logged in with cookie and the invalid token has been replaced
              })
              .catch(() => {
                this.props.resetApp();
                removeCookie('sdslabs');
                removeCookie('token');
                // The cookie is corrupted, both the token and the cookie have been removed
              });
          } else {
            this.props.resetApp();
            removeCookie('token');
            // No cookie present and the token is corrupted
          }
        });
    } else if (cookie) {
      loginUserWithCookie()
        .then((res) => {
          const user = {
            id: res.user.falcon_id,
            username: res.user.username,
            email: res.user.email,
            profile_image: res.user.profile_image,
            courses: res.courses,
          };
          // TODO
          this.props.setUser(user);
          // The user did not have the token but is logged in by the cookie and the token has been created
        })
        .catch(() => {
          this.props.resetApp();
          removeCookie('sdslabs');
          // The cookie is corrupted and removed
        });
    } else {
      this.props.resetApp();
      // Neither cookie nor token present
    }
  };

  /**
   * Fetches course from API.
   *
   * @param {object} e
   */
  getCourse = (e) => {
    getCourseByDepartment(e.target[e.target.selectedIndex].id).then((res, err) => {
      if (err) {
        //TODO handle error
      } else {
        this.setState({ courses: res });
      }
    });
  };

  /**
   * Sets selected course into state.
   *
   * @param {object} e
   */
  setCourse = (e) => {
    this.setState({ course: e.target[e.target.selectedIndex].id });
  };

  /**
   * Registers course for the user.
   *
   * @param {object} e
   */
  addCourse = (e) => {
    e.preventDefault();
    const token = getCookie('token');
    addCourseForUser(token, this.state.course).then((res, err) => {
      if (err) {
        //TODO handle error
      } else {
        this.getUser();
      }
    });
    e.target.reset();
  };

  render() {
    return (
      <div className="sidebar_login" onClick={() => this.props.closeModal()}>
        <div className="sidebar--coursecontent">
          <div className="sidebar--course">My Courses ({this.props.user.id})</div>
          <div className="sidebar--back">
            <Link to="/">
              <img src={arrow} alt="arrow" /> <span className="back">Departments</span>
            </Link>
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
            <select
              className="sidebar--form-select_department"
              onChange={this.getCourse}
              name="department"
            >
              <option>--Select Department--</option>
              {this.props.content.departments.map((department) => (
                <option key={department.id} id={department.id}>
                  {department.title}
                </option>
              ))}
            </select>
            <div className="sidebar--form-header_course">Course Name</div>
            <select className="sidebar--form-select_course" onChange={this.setCourse}>
              <option>--Select Course--</option>
              {this.state.courses.map((course) => (
                <option key={course.id} id={course.id}>
                  {course.title} {course.code}
                </option>
              ))}
            </select>
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
  /** Holds user data which is handled through Redux. */
  user: PropTypes.object,
  /** Holds the various content paramateres used across different contexts. */
  content: PropTypes.object,
  /** Fetch user details from API. */
  getUserDetails: PropTypes.func,
  /** Function to close modals. */
  closeModal: PropTypes.func,
  /** Function to set user details. */
  setUser: PropTypes.func,
  /** Resets all user related data in the redux store. */
  resetApp: PropTypes.func,
};
