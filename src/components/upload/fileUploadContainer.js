/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import small_loader from 'assets/small_loader.svg';
import check from 'assets/check.svg';
import retry from 'assets/retry.svg';
import ShortName from 'utils/short-name';
import 'styles/main.scss';

/**
 * Component to render uploading file.
 */
const FileUploadContainer = (props) => {
  /**
   * Updates file type for queued file.
   *
   * @param {object} e
   */
  const updateFileType = (e) => {
    props.files[props.index].type = e.target.value;
  };

  /**
   * Removes file from upload queue.
   */
  const handleRemove = () => {
    props.handleRemove(props.index);
  };

  return (
    <div className="customfileuploader--fileholder">
      <div className="customfileuploader--fileholder_name">
        {props.name.length <= 30 ? props.name : ShortName(props.name)}
      </div>
      <select
        className="customfileuploader--fileholder_category"
        onChange={updateFileType}
        disabled={props.disabled}
      >
        <option value="default">Select</option>
        <option value="tutorials">Tutorials</option>
        <option value="books">Books</option>
        <option value="notes">Notes</option>
        <option value="exampapers">Exam Papers</option>
      </select>
      {props.uploaded ? (
        <div>
          {props.success ? (
            <img className="customfileuploader--fileholder_status" src={check} alt="success" />
          ) : (
            <img className="customfileuploader--fileholder_status" src={retry} alt="failure" />
          )}
        </div>
      ) : props.uploading ? (
        <div>
          <img className="customfileuploader--fileholder_loader" src={small_loader} alt="loader" />
        </div>
      ) : (
        <div className="customfileuploader--fileholder_remove" onClick={handleRemove}>
          Remove
        </div>
      )}
    </div>
  );
};

export default FileUploadContainer;

FileUploadContainer.propTypes = {
  /** Holds files in upload queue. */
  files: PropTypes.array,
  /** Holds running status of ongoing upload for current file. */
  uploading: PropTypes.bool,
  /** Holds completed status of ongoing upload for current file. */
  uploaded: PropTypes.bool,
  /** Holds success status of completed upload for current file. */
  success: PropTypes.bool,
  /** Holds index of current file in upload queue. */
  index: PropTypes.number,
  /** Holds name of file. */
  name: PropTypes.string,
  /** Holds status of select input. */
  disabled: PropTypes.bool,
  /** Function to remove file from upload queue. */
  handleRemove: PropTypes.func,
};
