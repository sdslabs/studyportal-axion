import React, {Component, Fragment} from 'react'
import CustomCheckbox from './customCheckbox'
import CustomFileUploader from './customFileUploader'
import close from '../assets/closereq.png'
import '../styles/upload.scss'

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disable: ''
        };

        this.uplo_cour = React.createRef();
        this.uplo_cour_sel = React.createRef();
        this.uplo_mat = React.createRef();
        this.mat_tut = React.createRef();
        this.mat_books = React.createRef();
        this.mat_notes = React.createRef();
        this.mat_exam = React.createRef();
        this.check_tut = React.createRef();
        this.check_books = React.createRef();
        this.check_notes = React.createRef();
        this.check_exam = React.createRef();
        this.tut = React.createRef();
        this.books = React.createRef();
        this.notes = React.createRef();
        this.exam = React.createRef();

        this.header = React.createRef();
        this.main = React.createRef();
        this.material = React.createRef();
        this.fileuploader = React.createRef();

        this.activ_uplo_sel_cour = this.activ_uplo_sel_cour.bind(this);
        this.activ_uplo_mat = this.activ_uplo_mat.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    activ_uplo_sel_cour() {
        this.uplo_cour.current.style.color='#2B2A28';
        this.uplo_cour_sel.current.disabled=false;
    }

    activ_uplo_mat() {
        this.uplo_mat.current.style.color = '#2B2A28'
        this.tut.current.style.color = '#2B2A28'
        this.books.current.style.color = '#2B2A28'
        this.notes.current.style.color = '#2B2A28'
        this.exam.current.style.color = '#2B2A28'
    }

    handleUpload() {
        this.header.current.style.display ='none'
        this.main.current.style.top = '10%'
        this.material.current.style.display = 'none'
        this.fileuploader.current.style.top = '52.33%'
    }

    render() {

        if (this.props.upload === 'true') {
            return(
                <div className='upload_cover'>
                    <div className='upload_div'>
                        <div className='close_uplo' onClick={this.props.handleUplo}><img src={close} alt='close'/></div>
                        <div className='upload--header' ref={this.header}>
                            <div className='uplo_head'>Upload</div>
                            <div className='uplo_und'></div>
                        </div>
                        <div className='upload--main' ref={this.main}>
                            <div className='uplo_instruc'>
                                <div className="ins_uplo_head">Instructions</div>
                                <div className="ins_uplo">
                                    Total upload size allowed is 100MB at a time. For eg: If you are uploading 4 files then their combined size should never be over 100MB.<br/>
                                    Please upload zipped folders in case you want to share file like photographs of notes.<br/>
                                    Please try to tag all files appropriately to ensure that others can find them easily.
                                </div>
                            </div>
                            
                            <div className='uploform'>
                                <form>
                                    <div className='uplo_depa'>Department</div>
                                    <select className='uplo_sel_dep' onChange={this.activ_uplo_sel_cour}>
                                        <option>--Select Department--</option>
                                        <option>Civil Engineering</option>
                                    </select>
                                    <div className='uplo_cour' ref={this.uplo_cour}>Course Name</div>
                                    <select className='uplo_sel_cour' ref={this.uplo_cour_sel} onChange={this.activ_uplo_mat} disabled>
                                        <option>--Select Course--</option>
                                        <option>Structural Analysis</option>
                                    </select>
                                    <div className='mat_sel' ref={this.material}>
                                    <div className='uplo_mat_type' ref={this.uplo_mat}>Material Type</div>
                                        <div className='_check_tut'><CustomCheckbox disable = {this.state.disable} handleChange={this.activ_name} /></div><span className="_tut" ref={this.tut}>Tutorial</span> 
                                        <div className='_check_books'><CustomCheckbox disable = {this.state.disable} handleChange={this.activ_name} /></div><span className="_books" ref={this.books}>Books</span> 
                                        <div className='_check_notes'><CustomCheckbox disable = {this.state.disable} handleChange={this.activ_name} /></div><span className="_notes" ref={this.notes}>Notes</span> 
                                        <div className='_check_exam'><CustomCheckbox disable = {this.state.disable} handleChange={this.activ_name} /></div><span className="_exam" ref={this.exam}>Examination Papers</span>
                                    </div>
                                    <div className='uplo_file' ref={this.fileuploader}><CustomFileUploader handleUpload={this.handleUpload}/></div>
                                </form>
                            </div>   
                        </div> 
                    </div>
                </div>
            )
        }

        else {
            return(
                <Fragment></Fragment>
            )
        }
    }
}

export default Upload