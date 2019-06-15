import React, {Component, Fragment} from 'react'
import CustomCheckbox from '../components/customCheckbox'
import close from '../assets/closereq.png'
import '../styles/request.scss'

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'file',
            disable: 'true'
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
        this.check_tut = React.createRef();
        this.check_books = React.createRef();
        this.check_notes = React.createRef();
        this.check_exam = React.createRef();

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
        this.setState({disable: 'false'});
        this.file_mat.current.style.color = '#2B2A28'
        this.tut.current.style.color = '#2B2A28'
        this.books.current.style.color = '#2B2A28'
        this.notes.current.style.color = '#2B2A28'
        this.exam.current.style.color = '#2B2A28'
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

        if (this.props.request === 'true') {

            if(this.state.type === 'file') {
            return(
                <div className='req_cover'>
                        <div className='req_div'>
                        <div className='close_req' onClick={this.props.handleReq}><img src={close} alt='close'/></div>
                        <div className='req_head'>Request</div>
                        <div className='req_und'></div>
                        <div className='req_instruc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat quam ipsum, sit amet luctus turpis efficitur eget. Quisque lacinia, libero vel venenatis dictum, dolor nulla finibus sem, nec vestibulum nunc felis non diam. Phasellus congue nisl odio, non semper nunc ultricies quis. Etiam aliquet convallis nulla, ac viverra leo placerat vel. Fusce dictum metus ac ex convallis, eget sollicitudin metus luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed turpis risus, pretium aliquet pellentesque at, fringilla at erat. Morbi feugiat metus eget leo dictum maximus. Nam sed dolor ut enim sodales facilisis non nec dui. In nec diam aliquam, consequat diam in, posuere leo. Nullam gravida aliquet ex, sed cursus leo gravida eu.</div>
                        <div className='req_type'>Request Type</div>
                        <button className='file_req' onClick={this.switchToFile}>File</button>
                        <button className='cour'onClick={this.switchToCourse}>Courses</button>

                        <div className='file_reqform'>
                            <form>
                                <div className='file_req_depa'>Department</div>
                                <select className='file_sel_dep' onChange={this.activ_file_sel_cour}>
                                    <option>--Select Department--</option>
                                    <option>Civil Engineering</option>
                                </select>
                                <div className='file_req_cour' ref={this.file_cour}>Course Name</div>
                                <select className='file_sel_cour' ref={this.file_cour_sel} onChange={this.activ_file_mat} disabled>
                                    <option>--Select Course--</option>
                                    <option>Structural Analysis</option>
                                </select>
                                <div className='file_mat_type' ref={this.file_mat}>Material Type</div>
                                    <div className='check_tut'><CustomCheckbox disable = {this.state.disable} handleChange={this.activ_name} /></div><span className="tut" ref={this.tut}>Tutorial</span> 
                                    <div className='check_books'><CustomCheckbox disable = {this.state.disable} handleChange={this.activ_name} /></div><span className="books" ref={this.books}>Books</span> 
                                    <div className='check_notes'><CustomCheckbox disable = {this.state.disable} handleChange={this.activ_name} /></div><span className="notes" ref={this.notes}>Notes</span> 
                                    <div className='check_exam'><CustomCheckbox disable = {this.state.disable} handleChange={this.activ_name} /></div><span className="exam" ref={this.exam}>Examination Papers</span>
                                    <div className='req_file_name' ref={this.file_name}>Name</div>
                                <input className="req_file_in" type='text' ref={this.file_name_in} disabled />
                                <button type='submit' className='file_reqformbtn'>Request</button>
                            </form>
                        </div> 
                    </div>
                </div>
            )}
            else {
                return(
                    <div className='req_cover'>
                    <div className='req_div'>
                    <div className='close_req' onClick={this.props.handleReq}><img src={close} alt='close'/></div>
                    <div className='req_head'>Request</div>
                    <div className='req_und'></div>
                    <div className='req_instruc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat quam ipsum, sit amet luctus turpis efficitur eget. Quisque lacinia, libero vel venenatis dictum, dolor nulla finibus sem, nec vestibulum nunc felis non diam. Phasellus congue nisl odio, non semper nunc ultricies quis. Etiam aliquet convallis nulla, ac viverra leo placerat vel. Fusce dictum metus ac ex convallis, eget sollicitudin metus luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed turpis risus, pretium aliquet pellentesque at, fringilla at erat. Morbi feugiat metus eget leo dictum maximus. Nam sed dolor ut enim sodales facilisis non nec dui. In nec diam aliquam, consequat diam in, posuere leo. Nullam gravida aliquet ex, sed cursus leo gravida eu.</div>
                    <div className='req_type'>Request Type</div>
                    <button className='file' onClick={this.switchToFile}>File</button>
                    <button className='cour_req' onClick={this.switchToCourse}>Courses</button>
                
                    <div className='cour_reqform'>
                        <form>
                            <div className='cour_req_depa'>Department</div>
                            <input className='cour_in_dep' type='text' onChange={this.activ_cour_sel_cour} />
                            <div className='cour_req_cour' ref={this.cour_cour}>Course Name</div>
                            <input className="cour_in_cour" type='text' ref={this.cour_cour_in} onChange={this.activ_cour_courid} disabled/>
                            <div className='cour_id_cour' ref={this.cour_courid}>Course ID</div>
                            <input className='cour_in_id' type='text' placeholder="CEN-" ref={this.cour_courid_in} disabled />
                            <button type='submit' className='cour_reqformbtn'>Request</button>
                        </form>
                    </div>
                </div>
                </div>
            )}
        }

        else {
            return(
                <Fragment></Fragment>
            )
        }
    }
}

export default Request