/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import '../../styles/main.scss'

class FileUploadContainer extends Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove() {
        this.props.handleRemove(this.props.index);
    }

    render() {
        return(
            <div className='customfileuploader--fileholder'>
                    <div className='customfileuploader--fileholder_name'>{this.props.name}</div>
                    <select className='customfileuploader--fileholder_category'>
                        <option value='default'>Select</option>
                        <option value='tutorial'>Tutorial</option>
                        <option value='books'>Books</option>
                        <option value='notes'>Notes</option>
                        <option value='exam'>Exam Papers</option>
                    </select>
                    <div className='customfileuploader--fileholder_remove' onClick={this.handleRemove}>Remove</div>
            </div>
        )
    }
}

export default FileUploadContainer