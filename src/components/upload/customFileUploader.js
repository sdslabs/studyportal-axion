import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import FileUploadContainer from './fileUploadContainer';
import { Link } from 'react-router-dom';
import small_loader from 'assets/loader_small.svg';
import check from 'assets/check.svg';
import 'styles/main.scss';

/**
 * Component to render file uploader.
 */
const CustomFileUploader = (props) => {
  const [files, setFiles] = useState([]);

  /**
   * Adds files to upload queue.
   *
   * @param {object} e
   */
  const addFiles = (e) => {
    const file = e.target.files;
    const files_temp = files;

    for (let i = 0; i < file.length; i++) {
      files_temp.push({ file: file[i], type: '', progress: '' });
    }

    setFiles(files_temp);
    props.getFiles(files);
    props.handleUpload();
  };

  /**
   * Removes files from upload queue.
   *
   * @param {number} index
   */
  const handleRemove = (index) => {
    const files_temp = files;
    files_temp.splice(index, 1);
    props.getFiles(files_temp);
    setFiles(files_temp);
  };

  /**
   * Refreshes upload container.
   */
  const refreshUpload = () => {
    setFiles([]);
    props.refreshUpload();
  };

  if (files.length === 0) {
    return (
      <div className="customfileuploader">
        <div className="customfileuploader--input">
          <input
            className="customfileuploader--choosefile"
            type="file"
            multiple
            onChange={addFiles}
          />
          <label className="customfileuploader--label">Choose File</label>
          <span className="customfileuploader--filechoose">No Files Added</span>
          <span className="customfileuploader--instruc">(Max File Size allowed is 100MB)</span>
        </div>
        {props.uploaded ? (
          <div className="customfileuploader--button_uploaded" onClick={() => refreshUpload()}>
            Upload More
          </div>
        ) : props.uploading ? (
          <button type="submit" className="customfileuploader--button_uploading">
            Uploading
            <img src={small_loader} className="customfileuploader--button-loader" alt="loader" />
          </button>
        ) : (
          <button type="submit" className="customfileuploader--button">
            Upload
          </button>
        )}
      </div>
    );
  } else {
    return (
      <div className="customfileuploader">
        <div>
          {files.map((fileObj, index) => (
            <FileUploadContainer
              uploading={props.uploadings[index]}
              uploaded={props.uploadeds[index]}
              success={props.success[index]}
              name={fileObj.file.name}
              files={files}
              key={fileObj.file.name}
              disabled={props.disabled}
              index={index}
              handleRemove={handleRemove}
            />
          ))}
        </div>
        <div
          className={
            props.disabled ? 'customfileuploader--input-disabled' : 'customfileuploader--input'
          }
        >
          <input
            className="customfileuploader--choosefile"
            type="file"
            multiple
            onChange={addFiles}
          />
          <label className="customfileuploader--label">Add Files</label>
          <span className="customfileuploader--filechoose"></span>
          <span className="customfileuploader--instruc">(Max File Size allowed is 100MB)</span>
        </div>
        {props.uploaded ? (
          <div className="customfileuploader--confirmation">
            <img className="customfileuploader--confirmation-check" src={check} alt="check" />
            <span className="customfileuploader--confirmation-text">
              {props.success.every((value) => value)
                ? 'All files'
                : props.success.filter((status) => {
                    return status;
                  }).length}{' '}
              uploaded successfully
            </span>
            <span className="customfileuploader--confirmation-activity">
              Check upload status in{' '}
              <Link to="/activity/uploads" className="linkactive">
                Activity Log
              </Link>
            </span>
          </div>
        ) : (
          <Fragment />
        )}
        {props.uploaded ? (
          <div className="customfileuploader--button_uploaded" onClick={() => refreshUpload()}>
            Upload More
          </div>
        ) : props.uploading ? (
          <button type="submit" className="customfileuploader--button_uploading">
            Uploading
            <img src={small_loader} className="customfileuploader--button-loader" alt="loader" />
          </button>
        ) : (
          <button type="submit" className="customfileuploader--button">
            Upload
          </button>
        )}
      </div>
    );
  }
};

export default CustomFileUploader;

CustomFileUploader.propTypes = {
  /** Function to get files in upload queue. */
  getFiles: PropTypes.func,
  /** Function to modify upload modal. */
  handleUpload: PropTypes.func,
  /** Holds completed status of ongoing upload. */
  uploaded: PropTypes.bool,
  /** Holds list of ongoing uploads. */
  uploadings: PropTypes.array,
  /** Holds list of uploaded files. */
  uploadeds: PropTypes.array,
  /** Holds disabled status of upload queue. */
  disabled: PropTypes.bool,
  /** Holds running status of ongoing upload. */
  uploading: PropTypes.bool,
  /** Function to refresh the upload fields */
  refreshUpload: PropTypes.func,
};
