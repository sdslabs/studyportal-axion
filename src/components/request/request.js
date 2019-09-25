/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react'
import close from 'assets/closereq.png'
import 'styles/main.scss'

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'file', //Represents whether course or file tab is active
            disable: 0, //Enabling elements in file form
            disableCourse: 0 //Enabling elements in course form
        };

        this.switchToCourse = this.switchToCourse.bind(this);
        this.switchToFile = this.switchToFile.bind(this);
        this.activ_file_sel_cour = this.activ_file_sel_cour.bind(this);
        this.activ_file_mat = this.activ_file_mat.bind(this);
        this.activ_name = this.activ_name.bind(this);
        this.activ_cour_sel_cour = this.activ_cour_sel_cour.bind(this);
        this.activ_cour_courid = this.activ_cour_courid.bind(this);
    }

    switchToCourse() {
        this.setState({ type:'course' });
        this.setState({ disable: 0 })
    }

    switchToFile() {
        this.setState({ type:'file' });
        this.setState({ disableCourse: 0 })
    }

    activ_file_sel_cour() {
        this.setState({ disable: 1 })
    }

    activ_file_mat() {
        this.setState({ disable: 2 })
    }

    activ_name() {
        this.setState({ disable: 3 })
    }

    activ_cour_sel_cour() {
        this.setState({ disableCourse: 1 })
    }

    activ_cour_courid() {
        this.setState({ disableCourse: 2 })
    }

    render() {

        if (this.props.request) {
            return(
                <div className='requestcover'>
                        <div className='request'>
                        <div className='request--close' onClick={this.props.handleReq}><img src={close} alt='close'/></div>
                        <div className='request--heading'>Request</div>
                        <div className='request--underline'/>
                        <div className='request--instructions'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat quam ipsum, sit amet luctus turpis efficitur eget. Quisque lacinia, libero vel venenatis dictum, dolor nulla finibus sem, nec vestibulum nunc felis non diam. Phasellus congue nisl odio, non semper nunc ultricies quis. Etiam aliquet convallis nulla, ac viverra leo placerat vel. Fusce dictum metus ac ex convallis, eget sollicitudin metus luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed turpis risus, pretium aliquet pellentesque at, fringilla at erat. Morbi feugiat metus eget leo dictum maximus. Nam sed dolor ut enim sodales facilisis non nec dui. In nec diam aliquam, consequat diam in, posuere leo.Nullam gravida aliquet ex, sed cursus leo gravida eu.</div>
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
                                        <div className='file--course' style={{ color: this.state.disable >=1 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Course Name</div>
                                        <select className='file--course-select' onChange={this.activ_file_mat} disabled={ !(this.state.disable >= 1) } >
                                            <option>--Select Course--</option>
                                            <option>Structural Analysis</option>
                                        </select>
                                        <div className='file--material' style={{ color: this.state.disable >=2 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Material Type</div>
                                            <div className='file--material_tut'>
                                                <input type='radio' name='material' value='tutorial' onChange={this.activ_name} className='radio' disabled={ !(this.state.disable >= 2) } />
                                            </div>
                                                <span className="tut" style={{ color: this.state.disable >=2 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Tutorial</span>
                                            <div className='file--material_books'>
                                                <input type='radio' name='material' value='books' onChange={this.activ_name} className='radio' disabled={ !(this.state.disable >= 2) } />
                                            </div>
                                            <span className="books" style={{ color: this.state.disable >=2 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Books</span>
                                            <div className='file--material_notes'>
                                                <input type='radio' name='material' value='notes' onChange={this.activ_name} className='radio' disabled={ !(this.state.disable >= 2) } />
                                            </div>
                                            <span className="notes" style={{ color: this.state.disable >=2 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Notes</span>
                                            <div className='file--material_exam'>
                                                <input type='radio' name='material' value='exam' onChange={this.activ_name} className='radio' disabled={ !(this.state.disable >= 2) } />
                                            </div>
                                            <span className="exam" style={{ color: this.state.disable >=2 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Examination Papers</span>
                                        <div className='file--name' style={{ color: this.state.disable >=3 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Name</div>
                                        <input className="file--name-input" type='text' disabled={ !(this.state.disable >= 3) } />
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
                                    <div className='course--course' style={{ color: this.state.disableCourse >=1 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Course Name</div>
                                    <input className='course--course-input' type='text' onChange={this.activ_cour_courid} disabled={ !(this.state.disableCourse >= 1) } />
                                    <div className='course--id' style={{ color: this.state.disableCourse >=2 ? "#2B2A28" : "rgba(43, 42, 40, 0.2)" }}>Course ID</div>
                                    <input className='course--id-input' type='text' placeholder="CEN-" disabled={ !(this.state.disableCourse >= 2) } />
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
                <Fragment />
            )
        }
    }
}

export default Request
