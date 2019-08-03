/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react'
import CustomCheckbox from '../customcheckbox/customCheckbox'
import CustomFileUploader from './customFileUploader'
import close from '../../assets/closereq.png'
import '../../styles/main.scss'

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disable: 0,
            active: false
        };

        this.activ_uplo_sel_cour = this.activ_uplo_sel_cour.bind(this);
        this.activ_uplo_mat = this.activ_uplo_mat.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    activ_uplo_sel_cour() {
        this.setState({ disable: 1 })
    }

    activ_uplo_mat() {
        this.setState({ disable: 2 })
    }

    handleUpload() {
        this.setState({ active: true })
    }

    render() {

        if (this.props.upload) {
            return(
                <div className='uploadcover'>
                    <div className='upload'>
                        <div className='upload--close' onClick={this.props.handleUplo}><img src={close} alt='close'/></div>
                        <div className='upload--header' style={{ display: this.state.active ? 'none' : 'block' }}>
                            <div className='upload--heading'>Upload</div>
                            <div className='upload--underline' />
                        </div>
                        <div className='upload--main' style={{ top: this.state.active ? '10%' : '14.788%' }}>
                            <div className='upload--instruction'>
                                <div className='upload--instruction-head'>Instructions</div>
                                <div className='upload--instruction-body'>
                                    Total upload size allowed is 100MB at a time. For eg: If you are uploading 4 files then their combined size should never be over 100MB.<br/>
                                    Please upload zipped folders in case you want to share file like photographs of notes.<br/>
                                    Please try to tag all files appropriately to ensure that others can find them easily.
                                </div>
                            </div>
                            <div className='upload--form' id='uploadform'>
                                <form>
                                    <div className='form--department'>Department</div>
                                    <select className='form--department-select' onChange={this.activ_uplo_sel_cour} form='uploadform'>
                                        <option>--Select Department--</option>
                                        <option>Civil Engineering</option>
                                    </select>
                                    <div className='form--course' style={{ color: this.state.disable >= 1 ? '#2B2A28' : 'rgba(43, 42, 40, 0.2)' }}>Course Name</div>
                                    <select className='form--course-select' onChange={this.activ_uplo_mat} form='uploadform' disabled={ !(this.state.disable >= 1) }>
                                        <option>--Select Course--</option>
                                        <option>Structural Analysis</option>
                                    </select>
                                    <div className='upload--file' style={{ top: this.state.active ? '52.33%' : '52.766%' }}>
                                        <CustomFileUploader handleUpload={this.handleUpload} disabled={ !(this.state.disable >= 2) }/>
                                    </div>
                                </form>
                            </div>   
                        </div> 
                    </div>
                </div>
            )
        }

        else {
            return(
                <Fragment />
            )
        }
    }
}

export default Upload