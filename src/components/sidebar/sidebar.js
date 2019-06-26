import React, {Component} from 'react'
import arrow from '../../assets/left-arrow.png'
import CourseHandle from './courseHandle'
import '../../styles/main.scss'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: ''
        }

        this.active = 'Open Channel Hydralyics CEN-207'

        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount() {
        const login = this.props.login
        this.setState({login: login});
    }

    handleClick(active) {
        this.active = active;
        this.forceUpdate();
    }

    render() {

        if (this.state.login === 'true') {
            return(
                <div className='sidebar'>
                    <div className='sidebar--course'>My Courses ({this.props.login})</div>
                    <div className='sidebar--back'><img src={arrow} alt='arrow' /> Departments</div>
                    <div className='sidebar--course-name'>
                        <div className='sidebar--course-table'>
                            <CourseHandle login='true' name='Sturctural Analysis CEN-201' active={this.active} handleClick={this.handleClick}/>
                            <CourseHandle login='true' name='Open Channel Hydralyics CEN-205' active={this.active} handleClick={this.handleClick}/>
                            <CourseHandle login='true' name='Open Channel Hydralyics CEN-203' active={this.active} handleClick={this.handleClick}/>
                            <CourseHandle login='true' name='Open Channel Hydralyics CEN-202' active={this.active} handleClick={this.handleClick}/>
                            <CourseHandle login='true' name='Open Channel Hydralyics CEN-208' active={this.active} handleClick={this.handleClick}/>
                            <CourseHandle login='true' name='Open Channel Hydralyics CEN-209' active={this.active} handleClick={this.handleClick}/>
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
                            <CourseHandle login='false' name='Sturctural Analysis CEN-201' active={this.active} handleClick={this.handleClick}/>
                            <CourseHandle login='false' name='Open Channel Hydralyics CEN-207' active={this.active} handleClick={this.handleClick}/>
                            <CourseHandle login='false' mycourse='true' name='Open Channel Hydralyics CEN-205' active={this.active} handleClick={this.handleClick}/>
                            <CourseHandle login='false' name='Open Channel Hydralyics CEN-203' active={this.active} handleClick={this.handleClick}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Sidebar