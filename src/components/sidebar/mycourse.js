import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import arrow from 'assets/back.svg';
import search from 'assets/search.svg';
import add from 'assets/add.svg';
import CourseHandle from './courseHandle';
import 'styles/main.scss';
import { Link } from 'react-router-dom';
import { getCourseByDepartment } from 'api/courseApi';
import { addCourseForUser } from 'api/userApi';
import { getCookie } from 'utils/handleCookies';
import { getUser } from 'utils/getUser';
import { RESET_APP, CLOSE_MODAL } from 'constants/action-types';
import { toast } from 'react-toastify';
import MiniSearch from 'minisearch';
import _ from 'lodash';
import { getSearchCourseResults } from 'api/searchApi';

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

const customStyles = {
  control: (base) => ({
    ...base,
    width: 315,
    background: '#fff',
    borderRadius: 2,
  }),
  valueContainer: (base) => ({
    ...base,
    width: 315,
  }),
  menu: (base) => ({
    ...base,
    width: 315,
  }),
};

const theme = (theme) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    text: 'orangered',
    primary: 'black',
  },
});

/**
 * Sidebar component for Studyportal homepage.
 */
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      course: 0,
      userCourses: props.user.courses,
      search: false,
      addCourse: false,
    };

    this.miniSearch = new MiniSearch({
      fields: ['title', 'code'], // fields to index for full-text search
      storeFields: ['id', 'title', 'code', 'department'],
      extractField: (document, fieldName) => {
        // Access nested fields
        return fieldName.split('.').reduce((doc, key) => doc && doc[key], document);
      }, // fields to return with search results
    });
  }

  componentDidMount() {
    this.setState({ userCourses: this.props.user.courses });
    this.miniSearch.addAll(this.props.user.courses);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.courses !== this.props.user.courses)
      this.setState({ userCourses: this.props.user.courses });
  }

  searchCourse = (e) => {
    if (e.target.value != '') {
      getSearchCourseResults(e.target.value, 'null', this.props.user.id)
        .then((res) => {
          this.setState({ userCourses: res.courses });
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    } else {
      this.setState({ userCourses: this.props.user.courses });
    }
  };

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
      toast('Course has been added to your course list');
    });
    e.target.reset();
    this.setState({ addCourse: false });
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
            <div
              className={
                this.state.addCourse ? 'sidebar--course-table' : 'sidebar--course-table_long'
              }
            >
              {this.state.courses
                ? this.state.userCourses.map((course) => (
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
        {!this.state.search && !this.state.addCourse ? (
          <div className="sidebar--addons">
            <button
              className="sidebar--button"
              onClick={() => this.setState({ search: true, addCourse: false })}
            >
              Search Course <img src={search} alt="search" />
            </button>
            <button
              className="sidebar--button"
              onClick={() => this.setState({ addCourse: true, search: false })}
            >
              Add Course <img src={add} alt="add course" />
            </button>
          </div>
        ) : null}
        {this.state.search ? (
          <div className="sidebar--search_login">
            <div>
              <input className="search" placeholder="Search Course" onChange={this.searchCourse} />
              <img className="search-button" src={search} alt="search" />
            </div>
            <div>
              <button
                className="button"
                onClick={() => this.setState({ addCourse: true, search: false })}
              >
                <img src={add} alt="add course" />
              </button>
            </div>
          </div>
        ) : null}
        {this.state.addCourse ? (
          <div className="sidebar--form-cover">
            <form className="sidebar--form" onSubmit={this.addCourse}>
              <div className="sidebar--form-header">Add Another Course</div>
              <Select
                className="sidebar--form-select_department"
                placeholder="Select Department"
                id="sidebar_dept_select"
                styles={customStyles}
                theme={theme}
                onChange={this.getCourse}
                menuPlacement="top"
                options={this.props.content.departments.map(({ id, title }) => {
                  return { value: id, label: title };
                })}
              />
              <Select
                className="sidebar--form-select_course"
                placeholder="Select Course"
                styles={customStyles}
                theme={theme}
                onChange={this.setCourse}
                menuPlacement="top"
                options={this.state.courses.map(({ id, title }) => {
                  return { value: id, label: title };
                })}
              />
              <div className="sidebar--form-addons">
                <div>
                  <button
                    className="sidebar--form-search"
                    onClick={() => this.setState({ search: true, addCourse: false })}
                  >
                    <img src={search} alt="search" />
                  </button>
                </div>
                <div className="sidebar--form-button">
                  <button type="submit">
                    Add Course <img src={add} alt="add course" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : null}
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
