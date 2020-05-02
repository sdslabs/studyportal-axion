/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import small_loader from 'assets/small_loader.svg';
import check from 'assets/check.svg';
import 'styles/main.scss';

/**
 * Component to render uploading file.
 */
class FileUploadContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          files: props.files,
          uploading: props.uploading,
          uploaded: props.uploaded
        };

        this.updateFileType = this.updateFileType.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
      this.setState({ uploading:nextProps.uploading,uploaded:nextProps.uploaded });
    }

    /**
    * Updates file type for queued file.
    *
    * @param {object} e
    */
    updateFileType(e) {
      this.props.files[this.props.index].type = e.target.value;
    }

    /**
    * Removes file from upload queue.
    */
    handleRemove() {
        this.props.handleRemove(this.props.index);
    }

    render() {
        return(
            <div className='customfileuploader--fileholder'>
                    <div className='customfileuploader--fileholder_name'>{this.props.name}</div>
                    <select className='customfileuploader--fileholder_category' onChange={this.updateFileType} disabled={this.props.disabled}>
                        <option value='default'>Select</option>
                        <option value='Tutorial'>Tutorial</option>
                        <option value='Book'>Books</option>
                        <option value='Notes'>Notes</option>
                        <option value='Exam Papers'>Exam Papers</option>
                    </select>
                    {this.state.uploaded ?
                      <div>
                        <img className='customfileuploader--fileholder_status' src={check} alt='status'/>
                      </div> :
                      this.state.uploading ?
                        <div>
                          <img className='customfileuploader--fileholder_loader' src={small_loader} alt='loader'/>
                        </div> :
                        <div className='customfileuploader--fileholder_remove' onClick={this.handleRemove}>Remove</div>
                      }
            </div>
        );
    }
}

export default FileUploadContainer;

FileUploadContainer.propTypes = {
  /** Holds files in upload queue. */
  files: PropTypes.array,
  /** Holds running status of ongoing upload for current file. */
  uploading: PropTypes.bool,
  /** Holds completed status of ongoing upload for current file. */
  uploaded: PropTypes.bool,
  /** Holds index of current file in upload queue. */
  index: PropTypes.number,
  /** Holds name of file. */
  name: PropTypes.string,
  /** Holds status of select input. */
  disabled: PropTypes.bool,
  /** Function to remove file from upload queue. */
  handleRemove: PropTypes.func
};
