import React, {Component, Fragment} from 'react'
import close from '../../assets/closereq.png'
import '../../styles/main.scss'

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'file',
            disable: true
        }

        this.file_cour = React.createRef();
        this.file_cour_sel = React.createRef();
        this.file_mat = React.createRef();
        this.file_mat_tut = React.createRef();
        this.file_mat_books = React.createRef();
        this.file_mat_notes = React.createRef();
        this.file_mat_exam = React.createRef();
        this.file_name = React.createRef();
        this.file_name_in = React.createRef();

        this.tut = React.createRef();
        this.books = React.createRef();
        this.notes = React.createRef();
        this.exam = React.createRef();
        this.radiotut = React.createRef();
        this.radiobooks = React.createRef();
        this.radionotes = React.createRef();
        this.radioexam = React.createRef();

        this.cour_cour = React.createRef();
        this.cour_cour_in = React.createRef();
        this.cour_courid = React.createRef();
        this.cour_courid_in = React.createRef();

        this.switchToCourse = this.switchToCourse.bind(this);
        this.switchToFile = this.switchToFile.bind(this);
        this.activ_file_sel_cour = this.activ_file_sel_cour.bind(this);
        this.activ_file_mat = this.activ_file_mat.bind(this);
        this.activ_name = this.activ_name.bind(this);
        this.activ_cour_sel_cour = this.activ_cour_sel_cour.bind(this);
        this.activ_cour_courid = this.activ_cour_courid.bind(this);
    }

    switchToCourse() {
        this.setState({type:'course'});
    }

    switchToFile() {
        this.setState({type:'file'});
    }

    activ_file_sel_cour() {
        this.file_cour.current.style.color = '#2B2A28';
        this.file_cour_sel.current.disabled = false;
    }

    activ_file_mat() {
        this.file_mat.current.style.color = '#2B2A28'
        this.tut.current.style.color = '#2B2A28'
        this.books.current.style.color = '#2B2A28'
        this.notes.current.style.color = '#2B2A28'
        this.exam.current.style.color = '#2B2A28'
        this.radiotut.current.disabled = false
        this.radiobooks.current.disabled = false
        this.radionotes.current.disabled = false
        this.radioexam.current.disabled = false
    }

    activ_name() {
        this.file_name.current.style.color = "#2B2A28";
        this.file_name_in.current.disabled = false;
    }

    activ_cour_sel_cour() {
        this.cour_cour.current.style.color = "#2B2A28";
        this.cour_cour_in.current.disabled = false;
    }

    activ_cour_courid() {
        this.cour_courid.current.style.color = "#2B2A28";
        this.cour_courid_in.current.disabled = false;
    }

    render() {

        if (this.props.request) {
            return(
                <div className='requestcover'>
                        <div className='request'>
                        <div className='request--close' onClick={this.props.handleReq}><img src={close} alt='close'/></div>
                        <div className='request--heading'>Request</div>
                        <div className='request--underline'></div>
                        <div className='request--instructions'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat quam ipsum, sit amet luctus turpis efficitur eget. Quisque lacinia, libero vel venenatis dictum, dolor nulla finibus sem, nec vestibulum nunc felis non diam. Phasellus congue nisl odio, non semper nunc ultricies quis. Etiam aliquet convallis nulla, ac viverra leo placerat vel. Fusce dictum metus ac ex convallis, eget sollicitudin metus luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed turpis risus, pretium aliquet pellentesque at, fringilla at erat. Morbi feugiat metus eget leo dictum maximus. Nam sed dolor ut enim sodales facilisis non nec dui. In nec diam aliquam, consequat diam in, posuere leo. Nullam gravida aliquet ex, sed cursus leo gravida eu.</div>
                        <div className='request--type'>Request Type</div>
                        {this.state.type === 'file' ?
                            (<Fragment>
                                <button className='request--filebutton-active' onClick={this.switchToFile}>File</button>
                                <button className='request--coursebutton-inactive'onClick={this.switchToCourse}>Courses</button>
                                <div className='request--form-file'>
                                    <form action='' method='GET'>
                                        <div className='file--department'>Department</div>
                                        <select className='file--department-select' onChange={this.activ_file_sel_cour}>
                                            <option>--Select Department--</option>
                                            <option>Civil Engineering</option>
                                        </select>
                                        <div className='file--course' ref={this.file_cour}>Course Name</div>
                                        <select className='file--course-select' ref={this.file_cour_sel} onChange={this.activ_file_mat} disabled>
                                            <option>--Select Course--</option>
                                            <option>Structural Analysis</option>
                                        </select>
                                        <div className='file--material' ref={this.file_mat}>Material Type</div>
                                            <div className='file--material_tut'>
                                                <input type='radio' name='material' value='tutorial' ref={this.radiotut} onChange={this.activ_name} className='radio' disabled/>
                                            </div>
                                                <span className="tut" ref={this.tut}>Tutorial</span> 
                                            <div className='file--material_books'>
                                                <input type='radio' name='material' value='books' ref={this.radiobooks} onChange={this.activ_name} className='radio' disabled/>
                                            </div>
                                            <span className="books" ref={this.books}>Books</span> 
                                            <div className='file--material_notes'>
                                                <input type='radio' name='material' value='notes' ref={this.radionotes} onChange={this.activ_name} className='radio' disabled/>
                                            </div>
                                            <span className="notes" ref={this.notes}>Notes</span> 
                                            <div className='file--material_exam'>
                                                <input type='radio' name='material' value='exam' ref={this.radioexam} onChange={this.activ_name} className='radio' disabled/>
                                            </div>
                                            <span className="exam" ref={this.exam}>Examination Papers</span>
                                        <div className='file--name' ref={this.file_name}>Name</div>
                                        <input className="file--name-input" type='text' ref={this.file_name_in} disabled />
                                        <button type='submit' className='request--button-file'>Request</button>
                                    </form>
                                </div>
                            </Fragment>) :
                            (<Fragment>
                                <button className='request--filebutton-inactive' onClick={this.switchToFile}>File</button>
                                <button className='request--coursebutton-active'onClick={this.switchToCourse}>Courses</button>
                                <div className='request--form-course'>
                                <form>
                                    <div className='course--department'>Department</div>
                                    <input className='course--department-input' type='text' onChange={this.activ_cour_sel_cour} />
                                    <div className='course--course' ref={this.cour_cour}>Course Name</div>
                                    <input className='course--course-input' type='text' ref={this.cour_cour_in} onChange={this.activ_cour_courid} disabled/>
                                    <div className='course--id' ref={this.cour_courid}>Course ID</div>
                                    <input className='course--id-input' type='text' placeholder="CEN-" ref={this.cour_courid_in} disabled />
                                    <button type='submit' className='request--button-course'>Request</button>
                                </form>
                            </div>
                        </Fragment>)
                    }
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

export default Request