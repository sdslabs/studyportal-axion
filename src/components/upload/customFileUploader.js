/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import FileUploadContainer from './fileUploadContainer'
import 'styles/main.scss'

class CustomFileUploader extends Component {
    constructor(props) {
        super(props);

        this.files = [];

        this.addFiles = this.addFiles.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    addFiles(e) {
        const file = e.target.files;

        for (let i=0; i<file.length; i++) {
            this.files.push(file[i].name)
        }

        this.props.handleUpload();
        this.forceUpdate();
    }

    handleRemove(index) {
        this.files.splice(index,1);
        this.forceUpdate();
    }

    render() {
        if (this.files.length === 0) {
            return(
                <div className='customfileuploader'>
                    <div className='customfileuploader--input'>
                        <input className='customfileuploader--choosefile' type='file' multiple onChange={this.addFiles}/><label className='customfileuploader--label'>Choose File</label>
                        <span className='customfileuploader--filechoose'>No Files Added</span>
                        <span className='customfileuploader--instruc'>(Max total File Size allowed is 100MB)</span>
                    </div>
                    <button type='submit' className='customfileuploader--button'>Upload</button>
                </div>
            )
        }

        else {
            return(
                <div className='customfileuploader'>
                <div>
                    {this.files.map((name, index) => (<FileUploadContainer name={name} index={index} handleRemove={this.handleRemove}/>))}
                </div>
                    <div className='customfileuploader--input'>
                        <input className='customfileuploader--choosefile' type='file' multiple onChange={this.addFiles}/><label className='customfileuploader--label'>Choose File</label>
                        <span className='customfileuploader--filechoose'>Add More Files</span>
                        <span className='customfileuploader--instruc'>(Max total File Size allowed is 100MB)</span>
                    </div>
                    <button type='submit' className='customfileuploader--button'>Upload</button>
                </div>
            )
        }
    }
}

export default CustomFileUploader
