import $ from 'jquery';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import close from 'assets/closereq.png';
import { getCourseByDepartment } from 'api/courseApi';
import { requestFiles, requestCourse } from 'api/requestApi';
import { getCookie } from 'utils/handleCookies';
import { connect } from 'react-redux';
import small_loader from 'assets/loader_small.svg';
import check from 'assets/check.svg';
import 'styles/main.scss';
import { Link } from 'react-router-dom';
import { CLOSE_MODAL } from 'constants/action-types';

function mapStateToProps(state) {
  return {
    modal: state.modal,
    content: state.content,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeModal: () => dispatch({ type: CLOSE_MODAL }),
  };
}

/**
 * Component to render request modal.
 */
class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'file', //Represents whether course or file tab is active
      disable: 0, //Enabling elements in file form
      disableCourse: 0, //Enabling elements in course form
      courses: [],
      requesting: false,
      requested: false,
      alreadyExist: false,
      message: '',
    };
  }

  /**
   * Switches to course request.
   */
  switchToCourse = () => {
    this.setState({ type: 'course' });
    this.setState({ disable: 0 });
    this.refreshRequest();
  };

  /**
   * Switches to file request.
   */
  switchToFile = () => {
    this.setState({ type: 'file' });
    this.setState({ disableCourse: 0 });
    this.refreshRequest();
  };

  /**
   * Activates course select input.
   *
   * @param {object} e
   */
  file_active_course = (e) => {
    this.setState({ disable: 1 });
    getCourseByDepartment(e.target[e.target.selectedIndex].id).then((res) => {
      this.setState({ courses: res });
    });
  };

  /**
   * Activates material select input.
   *
   * @param {object} e
   */
  file_active_material = (e) => {
    $('input:radio').prop('checked', false);
    $('input:text').val('');
    this.setState({ disable: 2 });
  };

  /**
   * Activates file name input.
   */
  active_name = () => {
    this.setState({ disable: 3 });
  };

  /**
   * Activates request button in file.
   */
  active_request_file = () => {
    this.setState({ disable: 4 });
  };

  /**
   * Activates course name input.
   */
  course_active_course = () => {
    this.setState({ disableCourse: 1 });
  };

  /**
   * Activates course code input.
   */
  course_active_courseid = () => {
    this.setState({ disableCourse: 2 });
  };

  /**
   * Activates request button in course.
   */
  active_request_course = () => {
    this.setState({ disableCourse: 4 });
  };

  /**
   * Requests file through API.
   *
   * @param {object} e
   */
  requestFile = (e) => {
    e.preventDefault();
    const course = e.target.course[e.target.course.selectedIndex].id;
    const material = e.target.material.value;
    const name = e.target.name.value;
    const token = getCookie('token');
    if (course && material && name && token) {
      this.setState({ disable: -1, requesting: true });
      requestFiles(token, material, name, course).then((res) => {
        if (res.message === 'Request already exists')
          this.setState({ alreadyExist: true, message: res.message });
        this.setState({ requesting: false, requested: true });
      });
    }
  };

  /**
   * Requests course through API.
   *
   * @param {object} e
   */
  requestCourse = (e) => {
    e.preventDefault();
    const department = e.target.department[e.target.department.selectedIndex].id;
    const course = e.target.course.value;
    const code = e.target.code.value;
    const token = getCookie('token');
    this.setState({ disableCourse: -1, requesting: true });
    requestCourse(token, department, course, code).then((res) => {
      if (res.message === 'Request already exists' || res.message === 'Course already exists')
        this.setState({ alreadyExist: true, message: res.message });
      this.setState({ requesting: false, requested: true });
    });
  };

  /**
   * Closes request modal using the x button.
   */
  closeRequest = () => {
    this.refreshRequest();
    this.props.closeModal();
  };

  /**
   * Refreshes request modal.
   */
  refreshRequest = () => {
    this.setState((prevState) => ({
      type: prevState.type,
      disable: 0,
      disableCourse: 0,
      courses: [],
      requesting: false,
      requested: false,
      alreadyExist: false,
      message: '',
    }));
    $('select').prop('selectedIndex', 0);
    $('input:radio').prop('checked', false);
    $('input:text').val('');
  };

  render() {
    if (this.props.modal.request) {
      return (
        <div className="requestcover">
          <div className="request">
            <div className="request--close" onClick={() => this.closeRequest()}>
              <img src={close} alt="close" />
            </div>
            <div className="request--heading">Request</div>
            <div className="request--underline" />
            <div className="request--instructions">
              To request file make sure to specify the material type and any name associated with it
              in the name text field. For example, to request 3rd Sem Examination Papers of CEN-204
              CE, select
              <span style={{ fontWeight: 'bold' }}> Examination Papers </span>
              and fill{' '}
              <span style={{ fontWeight: 'bold' }}>
                “3rd Sem Examination Papers of CEN-204 Civil Eng”
              </span>
            </div>
            <div className="request--type">Request Type</div>
            {this.state.type === 'file' ? (
              <div className="request--form">
                <button className="request--filebutton-active" onClick={this.switchToFile}>
                  File
                </button>
                <button className="request--coursebutton-inactive" onClick={this.switchToCourse}>
                  Courses
                </button>
                <div className="request--form-file">
                  <form onSubmit={this.requestFile}>
                    <div
                      className="file--department"
                      style={{
                        color: this.state.disable >= 0 ? '#2B2A28' : 'rgba(43, 42, 40, 0.2)',
                      }}
                    >
                      Department
                    </div>
                    <select
                      className="file--department-select"
                      onChange={this.file_active_course}
                      id="file_department_select"
                      disabled={!(this.state.disable >= 0)}
                      name="department"
                    >
                      <option>--Select Department--</option>
                      {this.props.content.departments.map((department) => (
                        <option key={department.id} id={department.id}>
                          {department.title}
                        </option>
                      ))}
                    </select>
                    <div
                      className="file--course"
                      style={{
                        color: this.state.disable >= 1 ? '#2B2A28' : 'rgba(43, 42, 40, 0.2)',
                      }}
                    >
                      Course Name
                    </div>
                    <select
                      className="file--course-select"
                      id="file_course_select"
                      onChange={this.file_active_material}
                      disabled={!(this.state.disable >= 1)}
                      name="course"
                    >
                      <option>--Select Course--</option>
                      {this.state.courses.map((course) => (
                        <option key={course.id} id={course.id}>
                          {course.title} {course.code}
                        </option>
                      ))}
                    </select>
                    <div
                      className="file--material"
                      style={{
                        color: this.state.disable >= 2 ? '#2B2A28' : 'rgba(43, 42, 40, 0.2)',
                      }}
                    >
                      Material Type
                    </div>
                    <div className="file--material-container">
                      <div className="file--material_tut">
                        <input
                          type="radio"
                          name="material"
                          value="Tutorials"
                          onChange={this.active_name}
                          className="radio"
                          disabled={!(this.state.disable >= 2)}
                        />
                      </div>
                      <span
                        className="tut"
                        style={{
                          color: this.state.disable >= 2 ? '#2B2A28' : 'rgba(43, 42, 40, 0.2)',
                        }}
                      >
                        Tutorials
                      </span>
                      <div className="file--material_books">
                        <input
                          type="radio"
                          name="material"
                          value="Books"
                          onChange={this.active_name}
                          className="radio"
                          disabled={!(this.state.disable >= 2)}
                        />
                      </div>
                      <span
                        className="books"
                        style={{
                          color: this.state.disable >= 2 ? '#2B2A28' : 'rgba(43, 42, 40, 0.2)',
                        }}
                      >
                        Books
                      </span>
                      <div className="file--material_notes">
                        <input
                          type="radio"
                          name="material"
                          value="Notes"
                          onChange={this.active_name}
                          className="radio"
                          disabled={!(this.state.disable >= 2)}
                        />
                      </div>
                      <span
                        className="notes"
                        style={{
                          color: this.state.disable >= 2 ? '#2B2A28' : 'rgba(43, 42, 40, 0.2)',
                        }}
                      >
                        Notes
                      </span>
                      <div className="file--material_exam">
                        <input
                          type="radio"
                          name="material"
                          value="Examination Papers"
                          onChange={this.active_name}
                          className="radio"
                          disabled={!(this.state.disable >= 2)}
                        />
                      </div>
                      <span
                        className="exam"
                        style={{
                          color: this.state.disable >= 2 ? '#2B2A28' : 'rgba(43, 42, 40, 0.2)',
                        }}
                      >
                        Examination Papers
                      </span>
                    </div>
                    <div
                      className="file--name"
                      style={{
                        color: this.state.disable >= 3 ? '#2B2A28' : 'rgba(43, 42, 40, 0.2)',
                      }}
                    >
                      Name
                    </div>
                    <input
                      className="file--name-input"
                      type="text"
                      disabled={!(this.state.disable >= 3)}
                      name="name"
                      onChange={this.active_request_file}
                    />
                    {this.state.requested ? (
                      <div className="request--confirmation">
                        <img className="request--confirmation-check" src={check} alt="check" />
                        {this.state.alreadyExist ? (
                          <span className="request--confirmation-text">{this.state.message}</span>
                        ) : (
                          <div>
                            <span className="request--confirmation-text">
                              Request placed successfully
                            </span>
                            <span className="request--confirmation-activity">
                              Check request status in{' '}
                              <Link
                                to="/activity/requests"
                                className="linkactive"
                                onClick={() => this.closeRequest()}
                              >
                                Activity Log
                              </Link>
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Fragment />
                    )}
                    {this.state.requested ? (
                      <div onClick={this.refreshRequest} className="request--button-file_requested">
                        Request More
                      </div>
                    ) : this.state.requesting ? (
                      <div className="request--button-file_requesting">
                        Requesting{' '}
                        <img className="request--loader" alt="loader" src={small_loader} />
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="request--button-file"
                        disabled={!(this.state.disable >= 4)}
                        style={{
                          background: this.state.disable >= 4 ? '#38a7de' : '#88CAEB',
                        }}
                      >
                        Request
                      </button>
                    )}
                  </form>
                </div>
              </div>
            ) : (
              <div className="request--form">
                <button className="request--filebutton-inactive" onClick={this.switchToFile}>
                  File
                </button>
                <button className="request--coursebutton-active" onClick={this.switchToCourse}>
                  Courses
                </button>
                <div className="request--form-course">
                  <form onSubmit={this.requestCourse}>
                    <div className="course--department">Department</div>
                    <select
                      className="course--department-input"
                      onChange={this.course_active_course}
                      disabled={!(this.state.disableCourse >= 0)}
                      name="department"
                    >
                      <option>--Select Department--</option>
                      {this.props.content.departments.map((department) => (
                        <option key={department.id} id={department.id}>
                          {department.title}
                        </option>
                      ))}
                    </select>
                    <div
                      className="course--course"
                      style={{
                        color: this.state.disableCourse >= 1 ? '#2B2A28' : 'rgba(43, 42, 40, 0.2)',
                      }}
                    >
                      Course Name
                    </div>
                    <input
                      className="course--course-input"
                      type="text"
                      name="course"
                      onChange={this.course_active_courseid}
                      disabled={!(this.state.disableCourse >= 1)}
                    />
                    <div
                      className="course--id"
                      style={{
                        color: this.state.disableCourse >= 2 ? '#2B2A28' : 'rgba(43, 42, 40, 0.2)',
                      }}
                    >
                      Course ID
                    </div>
                    <input
                      className="course--id-input"
                      type="text"
                      name="code"
                      disabled={!(this.state.disableCourse >= 2)}
                      onChange={this.active_request_course}
                    />
                    {this.state.requested ? (
                      <div className="request--confirmation">
                        <img className="request--confirmation-check" src={check} alt="check" />
                        {this.state.alreadyExist ? (
                          <span className="request--confirmation-text">{this.state.message}</span>
                        ) : (
                          <div>
                            <span className="request--confirmation-text">
                              Request placed successfully
                            </span>
                            <span className="request--confirmation-activity">
                              Check request status in{' '}
                              <Link to="/activity/requests" className="linkactive">
                                Activity Log
                              </Link>
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Fragment />
                    )}
                    {this.state.requested ? (
                      <div onClick={this.refreshRequest} className="request--button-file_requested">
                        Request More
                      </div>
                    ) : this.state.requesting ? (
                      <div className="request--button-file_requesting">
                        Requesting{' '}
                        <img className="request--loader" alt="loader" src={small_loader} />
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="request--button-course"
                        disabled={!(this.state.disableCourse >= 4)}
                        style={{
                          background: this.state.disableCourse >= 4 ? '#38a7de' : '#88CAEB',
                        }}
                      >
                        Request
                      </button>
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return <Fragment />;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Request);

Request.propTypes = {
  /** Holds status of various modals and popups. */
  modal: PropTypes.object,
  /** Holds the various content paramateres used across different contexts. */
  content: PropTypes.object,
  /** Function to close modals. */
  closeModal: PropTypes.func,
};
