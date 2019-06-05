import React, {Component} from 'react'
import arrow from '../assets/left-arrow.png'
import close from '../assets/close.png'
import coursedot from '../assets/coursedot.png'
import '../styles/sidebar.scss'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: ''
        }
    }

    componentWillMount() {
        const login = this.props.login
        this.setState({login: login});
    }

    render() {

        if (this.state.login == 'true') {
            return(
                <div className="sidebar">
                    <div className="course">My Courses ({this.props.login})</div>
                    <div className="back_departments"><img src={arrow} alt='arrow' /> Departments</div>
                    <div className="course_name">
                        <table className="course_table">
                            <tr><span className="tr">Structural Analysis</span></tr>
                            <tr><span className="tr">Open Channel Hydralyics CEN-207</span></tr>
                            <tr><span className="tr">Open Channel Hydralyics CEN-207</span></tr>
                            <tr><span className="tr">Open Channel Hydralyics CEN-207</span></tr>
                            <tr><span className="tr">Open Channel Hydralyics CEN-207</span><span className='coursedot'><img src={coursedot} alt='coursedot'/></span></tr>
                        </table>
                    </div>
                    <div className="course_formdiv">
                        <form className="course_addform">
                            <div className="add_course">Add Course</div>
                            <div className="dep_add">Department</div>
                            <select className="sel_dep">
                                <option value={this.props.key}></option>
                            </select>
                            <div className="course_add">Course Name</div>
                            <select className="sel_course">
                                <option value={this.props.key}>{this.props.key}</option>
                            </select>
                            <button type="submit" className="addcoursebtn">Add Course</button>
                        </form>
                    </div>
                </div>
            )
        }

        else {
            return(
                <div className="sidebar">
                    <div className="close"><img src={close} alt='close' /></div>
                    <div className="course">{this.props.course}Electrical Engineering</div>
                    <div className="back_departments"><img src={arrow} alt='arrow' /> Departments</div>
                    <div className="course_name">
                        <table className="course_table">
                            <tr><span className="tr">Structural Analysis</span></tr>
                            <tr><span className="tr">Open Channel Hydralyics CEN-207</span></tr>
                            <tr><span className="tr">Open Channel Hydralyics CEN-207</span></tr>
                            <tr><span className="tr">Open Channel Hydralyics CEN-207</span></tr>
                            <tr><span className="tr">Open Channel Hydralyics CEN-207</span></tr>
                            <tr><span className="tr">Open Channel Hydralyics CEN-207</span></tr>
                            <tr><span className="tr">Open Channel Hydralyics CEN-207</span></tr>
                            <tr><span className="tr">Open Channel Hydralyics CEN-207</span></tr>
                            <tr><span className="tr">Open Channel Hydralyics CEN-207</span><span className='mycourse'>My Course</span></tr>
                        </table>
                    </div>
                </div>
            )
        }
    }
}

export default Sidebar