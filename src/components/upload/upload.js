/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react'
import CustomFileUploader from './customFileUploader'
import { uploadFile } from 'api/uploadApi'
import close from 'assets/closereq.png'
import { getDepartmentsList } from 'api/departmentApi'
import { getCourseByDepartment } from 'api/courseApi'
import getToken from 'utils/getToken'
import 'styles/main.scss'

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disable: 0,
            active: false,
            files: [],
            departments: [],
            courses: [],
            department: 0,
            course: 0
        };

        this.toggleUploadModal = this.toggleUploadModal.bind(this)
        this.active_course = this.active_course.bind(this);
        this.active_material = this.active_material.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.getFiles = this.getFiles.bind(this);
        this.upload = this.upload.bind(this);
    }

    componentDidMount() {
      getDepartmentsList().then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.setState({ departments:res })
        }
      })
    }

    active_course(e) {
        this.setState({ disable: 1, department: e.target[e.target.selectedIndex].id });
        getCourseByDepartment(e.target[e.target.selectedIndex].id).then((res,err) => {
          if(err) {
            //TODO handle error
          }
          else {
            this.setState({ courses:res })
          }
        })
    }

    active_material(e) {
        this.setState({ disable: 2, course: e.target[e.target.selectedIndex].id });
    }

    toggleUploadModal() {
      this.setState({ active:false })
      this.props.handleUplo();
    }

    handleUpload() {
        this.setState({ active: true });
    }

    getFiles(files) {
      this.setState({ files });
    }

    async upload(e) {
      e.preventDefault();
      const token = getToken();
      this.state.files.forEach((fileObj) => {
        const reader = new FileReader()
        reader.onloadend = (e) => {
          uploadFile(token,this.state.course,fileObj.file.name,fileObj.type,reader.result).then((res) => {
          })
        }
        reader.readAsDataURL(fileObj.file)
      })
    }

    render() {
        if (this.props.upload) {
            return(
                <div className='uploadcover'>
                    <div className='upload'>
                        <div className='upload--close' onClick={this.toggleUploadModal}><img src={close} alt='close'/></div>
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
                                <form onSubmit={this.upload}>
                                    <div className='form--department'>Department</div>
                                    <select className='form--department-select' onChange={ this.active_course } form='uploadform'>
                                        <option>--Select Department--</option>
                                        { this.state.departments.map((department) => (<option key={ department.id } id={ department.id }>{ department.title }</option>)) }
                                    </select>
                                    <div className='form--course' style={{ color: this.state.disable >= 1 ? '#2B2A28' : 'rgba(43, 42, 40, 0.2)' }}>Course Name</div>
                                    <select className='form--course-select' onChange={ this.active_material } form='uploadform' disabled={ !(this.state.disable >= 1) }>
                                        <option>--Select Course--</option>
                                        { this.state.courses.map((course) => (<option key={ course.id } id={ course.id }>{ course.title } { course.code }</option>)) }
                                    </select>
                                    <div className='upload--file' style={{ top: this.state.active ? '52.33%' : '52.766%' }}>
                                        <CustomFileUploader handleUpload={this.handleUpload} getFiles={this.getFiles} disabled={ !(this.state.disable >= 2) }/>
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
