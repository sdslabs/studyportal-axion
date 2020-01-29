/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import 'styles/main.scss'

class FileUploadContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          files: props.files
        }

        this.updateFileType = this.updateFileType.bind(this)
        this.handleRemove = this.handleRemove.bind(this);
    }

    updateFileType(e) {
      this.props.files[this.props.index].type = e.target.value;
    }

    handleRemove() {
        this.props.handleRemove(this.props.index);
    }

    render() {
        return(
            <div className='customfileuploader--fileholder'>
                    <div className='customfileuploader--fileholder_name'>{this.props.name}</div>
                    <select className='customfileuploader--fileholder_category' onChange={this.updateFileType}>
                        <option value='default'>Select</option>
                        <option value='Tutorial'>Tutorial</option>
                        <option value='Book'>Books</option>
                        <option value='Notes'>Notes</option>
                        <option value='Exam Papers'>Exam Papers</option>
                    </select>
                    <div className='customfileuploader--fileholder_remove' onClick={this.handleRemove}>Remove</div>
            </div>
        )
    }
}

export default FileUploadContainer
