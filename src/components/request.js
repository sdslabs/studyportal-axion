import React, {Component} from 'react'
import close from '../assets/closereq.png'
import '../styles/request.scss'

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'file'
        }

        this.switchToCourse = this.switchToCourse.bind(this);
        this.switchToFile = this.switchToFile.bind(this);
    }

    switchToCourse() {
        this.setState({type:'course'});
    }

    switchToFile() {
        this.setState({type:'file'});
    }

    render() {

        if(this.state.type == 'file') {
        return(
            <div className='req_cover'>
                    <div className='req_div'>
                    <div className='close_req'><img src={close} /></div>
                    <div className='req_head'>Request</div>
                    <div className='req_und'></div>
                    <div className='req_instruc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat quam ipsum, sit amet luctus turpis efficitur eget. Quisque lacinia, libero vel venenatis dictum, dolor nulla finibus sem, nec vestibulum nunc felis non diam. Phasellus congue nisl odio, non semper nunc ultricies quis. Etiam aliquet convallis nulla, ac viverra leo placerat vel. Fusce dictum metus ac ex convallis, eget sollicitudin metus luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed turpis risus, pretium aliquet pellentesque at, fringilla at erat. Morbi feugiat metus eget leo dictum maximus. Nam sed dolor ut enim sodales facilisis non nec dui. In nec diam aliquam, consequat diam in, posuere leo. Nullam gravida aliquet ex, sed cursus leo gravida eu.</div>
                    <div className='req_type'>Request Type</div>
                    <button className='file_req' onClick={this.switchToFile}>File</button>
                    <button className='cour'onClick={this.switchToCourse}>Courses</button>

                    <div className='file_reqform'>
                        <form>
                            <div className='file_req_depa'>Department</div>
                            <select className='file_sel_dep'>
                            </select>
                            <div className='file_req_cour'>Course Name</div>
                            <select className='file_sel_cour'>
                            </select>
                            <div className='file_mat_type'>Material Type</div>
                                <div className='cont_mat_tut'><input className='mat_tut' type='checkbox' /><span className='checkmark_tut'></span></div> <span className="tut">Tutorial</span> 
                                <div className='cont_mat_books'><input className='mat_books' type='checkbox' /><span className='checkmark_books'></span></div> <span className="books">Books</span> 
                                <div className='cont_mat_notes'><input className='mat_notes' type='checkbox' /><span className='checkmark_notes'></span></div> <span className="notes">Notes</span> 
                                <div className='cont_mat_exam'><input className='mat_exam' type='checkbox' /><span className='checkmark_exam'></span></div> <span className="exam">Examination Papers</span>
                                <div className='req_file_name'>Name</div>
                            <input className="req_file_in" type='text' />
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
                <div className='close_req'><img src={close} /></div>
                <div className='req_head'>Request</div>
                <div className='req_und'></div>
                <div className='req_instruc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat quam ipsum, sit amet luctus turpis efficitur eget. Quisque lacinia, libero vel venenatis dictum, dolor nulla finibus sem, nec vestibulum nunc felis non diam. Phasellus congue nisl odio, non semper nunc ultricies quis. Etiam aliquet convallis nulla, ac viverra leo placerat vel. Fusce dictum metus ac ex convallis, eget sollicitudin metus luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed turpis risus, pretium aliquet pellentesque at, fringilla at erat. Morbi feugiat metus eget leo dictum maximus. Nam sed dolor ut enim sodales facilisis non nec dui. In nec diam aliquam, consequat diam in, posuere leo. Nullam gravida aliquet ex, sed cursus leo gravida eu.</div>
                <div className='req_type'>Request Type</div>
                <button className='file' onClick={this.switchToFile}>File</button>
                <button className='cour_req' onClick={this.switchToCourse}>Courses</button>
            
                <div className='cour_reqform'>
                    <form>
                        <div className='cour_req_depa'>Department</div>
                        <input className='cour_in_dep' type='text' />
                        <div className='cour_req_cour'>Course Name</div>
                        <input className="cour_in_cour" type='text' />
                        <div className='cour_id_cour'>Course ID</div>
                        <input className='cour_in_id' type='text' value="CEN-"/>
                        <button type='submit' className='cour_reqformbtn'>Request</button>
                    </form>
                </div>
            </div>
            </div>
        )}
    }
}

export default Request