import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CustomFileUploader from './customFileUploader';
import { uploadFile } from 'api/uploadApi';
import close from 'assets/closereq.png';
import { getCourseByDepartment } from 'api/courseApi';
import { getCookie } from 'utils/handleCookies';
import { connect } from 'react-redux';
import 'styles/main.scss';
import { CLOSE_MODAL } from 'constants/action-types';
import $ from 'jquery';

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
 * Component to render upload modal.
 */
class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: 0,
      active: false,
      files: [],
      courses: [],
      department: 0,
      course: 0,
      uploadings: [],
      uploadeds: [],
      success: [],
      results: [],
      uploading: false,
      uploaded: false,
    };
  }

  /**
   * Activates course select input.
   *
   * @param {object} e
   */
  active_course = (e) => {
    this.setState({ disable: 1, department: e.target[e.target.selectedIndex].id });
    getCourseByDepartment(e.target[e.target.selectedIndex].id).then((res) => {
      this.setState({ courses: res });
    });
  };

  /**
   * Activates material select input.
   *
   * @param {object} e
   */
  active_material = (e) => {
    this.setState({ disable: 2, course: e.target[e.target.selectedIndex].id });
  };

  /**
   * Closes upload modal.
   */
  toggleUploadModal = () => {
    this.setState({ active: false });
    this.refreshUpload();
    this.props.closeModal();
  };

  /**
   * Switches to upload queue.
   */
  handleUpload = () => {
    this.setState({ active: true });
  };

  /**
   * Fetches files list from upload queue.
   *
   * @param {array} files
   */
  getFiles = (files) => {
    this.setState({ files });
  };

  /**
   * Uploads files through API.
   *
   * @param {object} e
   */
  upload = (e) => {
    e.preventDefault();
    const token = getCookie('token');
    if (token) {
      this.setState({ disable: -1, uploading: true });
      this.state.files.forEach((fileObj, index, array) => {
        let uploading = this.state.uploadings;
        let uploaded = this.state.uploadeds;
        uploading.push(true);
        uploaded.push(false);
        this.setState({ uploadings: uploading, uploadeds: uploaded });
        const reader = new FileReader();
        reader.onloadend = (e) => {
          uploadFile(token, this.state.course, fileObj.file.name, fileObj.type, reader.result)
            .then(() => {
              let { uploadeds, success } = this.state;
              uploadeds[index] = true;
              success[index] = true;
              this.setState({ uploadeds, success });
              if (index === array.length - 1) {
                this.setState({ uploaded: true });
              }
            })
            .catch(() => {
              let { uploadeds, success } = this.state;
              uploadeds[index] = true;
              success[index] = false;
              this.setState({ uploadeds, success });
              if (index === array.length - 1) {
                this.setState({ uploaded: true });
              }
            });
        };
        reader.readAsDataURL(fileObj.file);
      });
    }
  };

  /**
   * Refreshes upload modal.
   */
  refreshUpload = () => {
    this.setState({
      disable: 0,
      active: false,
      files: [],
      courses: [],
      department: 0,
      course: 0,
      uploadings: [],
      uploadeds: [],
      success: [],
      results: [],
      uploading: false,
      uploaded: false,
    });
    $('select').prop('selectedIndex', 0);
  };

  render() {
    if (this.props.modal.upload) {
      return (
        <div className="uploadcover">
          <div className="upload">
            <div className="upload--close" onClick={() => this.toggleUploadModal()}>
              <img src={close} alt="close" />
            </div>
            <div
              className="upload--header"
              style={{ display: this.state.active ? 'none' : 'block' }}
            >
              <div className="upload--heading">Upload</div>
              <div className="upload--underline" />
            </div>
            <div className="upload--main" style={{ top: this.state.active ? '10%' : '14.788%' }}>
              <div className="upload--instruction">
                <div className="upload--instruction-head">Instructions</div>
                <div className="upload--instruction-body">
                  Total upload size allowed is 100MB at a time. For eg: If you are uploading 4 files
                  then their combined size should never be over 100MB.
                  <br />
                  Please upload zipped folders in case you want to share file like photographs of
                  notes.
                  <br />
                  Please try to tag all files appropriately to ensure that others can find them
                  easily.
                </div>
              </div>
              <div className="upload--form" id="uploadform">
                <form onSubmit={this.upload}>
                  <div
                    className="form--department"
                    style={{ color: this.state.disable >= 0 ? '#2B2A28' : 'rgba(43, 42, 40, 0.2)' }}
                  >
                    Department
                  </div>
                  <select
                    className="form--department-select"
                    onChange={this.active_course}
                    disabled={!(this.state.disable >= 0)}
                    form="uploadform"
                  >
                    <option>--Select Department--</option>
                    {this.props.content.departments.map((department) => (
                      <option key={department.id} id={department.id}>
                        {department.title}
                      </option>
                    ))}
                  </select>
                  <div
                    className="form--course"
                    style={{ color: this.state.disable >= 1 ? '#2B2A28' : 'rgba(43, 42, 40, 0.2)' }}
                  >
                    Course Name
                  </div>
                  <select
                    className="form--course-select"
                    onChange={this.active_material}
                    form="uploadform"
                    disabled={!(this.state.disable >= 1)}
                  >
                    <option>--Select Course--</option>
                    {this.state.courses.map((course) => (
                      <option key={course.id} id={course.id}>
                        {course.title} {course.code}
                      </option>
                    ))}
                  </select>
                  <div className="upload--file">
                    <CustomFileUploader
                      uploading={this.state.uploading}
                      uploadings={this.state.uploadings}
                      uploaded={this.state.uploaded}
                      uploadeds={this.state.uploadeds}
                      success={this.state.success}
                      handleUpload={this.handleUpload}
                      getFiles={this.getFiles}
                      disabled={!(this.state.disable >= 2)}
                      refreshUpload={this.refreshUpload}
                      toggleUploadModal={this.toggleUploadModal}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Fragment />;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);

Upload.propTypes = {
  /** Holds status of various modals and popups. */
  modal: PropTypes.object,
  /** Holds the various content paramateres used across different contexts. */
  content: PropTypes.object,
  /** Function to close modals. */
  closeModal: PropTypes.func,
};
