import React, {Component} from 'react'
import arrow from '../../assets/left-arrow.png'
import coursedot from '../../assets/coursedot.png'
import '../../styles/main.scss'

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

        if (this.state.login === 'true') {
            return(
                <div className='sidebar'>
                    <div className='sidebar--course'>My Courses ({this.props.login})</div>
                    <div className='sidebar--back'><img src={arrow} alt='arrow' /> Departments</div>
                    <div className='sidebar--course-name'>
                        <div className='sidebar--course-table'>
                            <div className='_tr'><span className='tr'>Structural Analysis</span></div>
                            <div className='_tr'><span className='tr'>Open Channel Hydralyics CEN-207</span></div>
                            <div className='_tr'><span className='tr'>Open Channel Hydralyics CEN-207</span></div>
                            <div className='_tr'><span className='tr'>Open Channel Hydralyics CEN-207</span></div>
                            <div className='_tr'><span className='tr'>Open Channel Hydralyics CEN-207</span><span className='coursedot'><img src={coursedot} alt='coursedot'/></span></div>
                            <div className='_tr'><span className='tr'>Open Channel Hydralyics CEN-207</span></div>
                        </div>
                    </div>
                    <div className='sidebar--form-cover'>
                        <form className='sidebar--form'>
                            <div className='sidebar--form-header'>Add Course</div>
                            <div className='sidebar--form-header_department'>Department</div>
                            <select className='sidebar--form-select_department'>
                                <option value={this.props.key}></option>
                            </select>
                            <div className='sidebar--form-header_course'>Course Name</div>
                            <select className='sidebar--form-select_course'>
                                <option value={this.props.key}>{this.props.key}</option>
                            </select>
                            <button type='submit' className='sidebar--form-button'>Add Course</button>
                        </form>
                    </div>
                </div>
            )
        }

        else {
            return(
                <div className='sidebar'>
                    <div className='sidebar--course'>{this.props.course}Electrical Engineering</div>
                    <div className='sidebar--back'><img src={arrow} alt='arrow' /> Departments</div>
                    <div className='sidebar--course-name'>
                        <div className='sidebar--course-table_logout'>
                            <div className='_tr'><span className='tr'>Open Channel Hydralyics CEN-207</span></div>
                            <div className='_tr'><span className='tr'>Open Channel Hydralyics CEN-207</span></div>
                            <div className='_tr'><span className='tr'>Open Channel Hydralyics CEN-207</span><span className='mycourse'>My Course</span></div>
                            <div className='_tr'><span className='tr'>Open Channel Hydralyics CEN-207</span></div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Sidebar