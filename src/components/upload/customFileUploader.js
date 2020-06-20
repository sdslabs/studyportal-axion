/* eslint-disable no-nested-ternary */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FileUploadContainer from './fileUploadContainer';
import { Link } from 'react-router-dom';
import small_loader from 'assets/loader_small.svg';
import check from 'assets/check.svg';
import 'styles/main.scss';

/**
 * Component to render file uploader.
 */
class CustomFileUploader extends Component {
    constructor(props) {
        super(props);

        this.files = [];

        this.addFiles = this.addFiles.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    /**
    * Adds files to upload queue.
    *
    * @param {object} e
    */
    addFiles(e) {
        const file = e.target.files;

        for (let i=0; i<file.length; i++) {
            this.files.push({ 'file':file[i], 'type':'', 'progress': '' });
        }

        this.props.getFiles(this.files);
        this.props.handleUpload();
        this.forceUpdate();
    }

    /**
    * Removes files from upload queue.
    *
    * @param {number} index
    */
    handleRemove(index) {
        this.files.splice(index,1);
        this.props.getFiles(this.files);
        this.forceUpdate();
    }

    render() {
        if (this.files.length === 0) {
            return(
                <div className='customfileuploader'>
                    <div className='customfileuploader--input'>
                        <input className='customfileuploader--choosefile' type='file' multiple onChange={this.addFiles}/>
                        <label className='customfileuploader--label'>Choose File</label>
                        <span className='customfileuploader--filechoose'>No Files Added</span>
                        <span className='customfileuploader--instruc'>(Max total File Size allowed is 100MB)</span>
                    </div>
                    {this.props.uploaded ?
                        <div className='customfileuploader--button_uploaded' onClick={this.props.refreshUpload}>
                            Upload More</div> : this.props.uploading ?
                        <button type='submit' className='customfileuploader--button_uploading'>
                            Uploading<img src={small_loader} className='customfileuploader--button-loader' alt='loader' />
                        </button> : <button type='submit' className='customfileuploader--button'>Upload</button>
                    }
                </div>
            );
        }

        else {
            return(
                <div className='customfileuploader'>
                <div>
                    {this.files.map((fileObj, index) => (
                        <FileUploadContainer uploading={this.props.uploadings[index]}
                            uploaded={this.props.uploadeds[index]}
                            name={fileObj.file.name}
                            files={this.files}
                            key={fileObj.file.name}
                            disabled={this.props.disabled}
                            index={index}
                            handleRemove={this.handleRemove}/>
                        ))}
                </div>
                    <div className={this.props.disabled ? 'customfileuploader--input-disabled' : 'customfileuploader--input'}>
                        <input className='customfileuploader--choosefile' type='file' multiple onChange={this.addFiles}/>
                        <label className='customfileuploader--label'>Choose File</label>
                        <span className='customfileuploader--filechoose'>Add More Files</span>
                        <span className='customfileuploader--instruc'>(Max total File Size allowed is 100MB)</span>
                    </div>
                    {this.props.uploaded ?
                        <div className='customfileuploader--confirmation'>
                            <img className='customfileuploader--confirmation-check' src={check} alt='check' />
                            <span className='customfileuploader--confirmation-text'>All files uploaded successfully</span>
                            <span className='customfileuploader--confirmation-activity'>
                                Check upload status in <Link to='/activity/uploads' className='linkactive'>Activity Log</Link>
                            </span>
                        </div> : <Fragment/>
                    }
                    {this.props.uploaded ?
                        <div className='customfileuploader--button_uploaded' onClick={this.props.refreshUpload}>
                            Upload More
                        </div> :
                        this.props.uploading ?
                            <button type='submit' className='customfileuploader--button_uploading'>
                                Uploading<img src={small_loader} className='customfileuploader--button-loader' alt='loader' />
                            </button> :
                        <button type='submit' className='customfileuploader--button'>Upload</button>
                    }
                </div>
            );
        }
    }
}

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
    refreshUpload: PropTypes.func
};
