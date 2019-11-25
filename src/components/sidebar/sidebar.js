/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import arrow from 'assets/left-arrow.png'
import CourseHandle from './courseHandle'
import 'styles/main.scss'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
    constructor(props) {
        super(props);
      this.state = {
        login: ''
      };

        this.active = this.props.active;
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount() {
        const login = this.props.login;
        this.setState({ login });
    }

    componentWillReceiveProps(nextProps) {
      this.active = nextProps.active
    }

    handleClick(active) {
        this.active = active;
        this.forceUpdate();
    }

    render() {
        if (this.state.login) {
            return(
                <div className='sidebar'>
                    <div className='sidebar--course'>My Courses ({this.props.login})</div>
                    <Link to='/'>
                        <div className='sidebar--back'><img src={arrow} alt='arrow' /> Departments</div>
                    </Link>
                    <div className='sidebar--course-name'>
                        <div className='sidebar--course-table'>
                            <CourseHandle login name='Sturctural Analysis CEN-201' active={this.active} handleClick={this.handleClick}/>
                            <CourseHandle login name='Open Channel Hydralyics CEN-205' active={this.active} handleClick={this.handleClick}/>
                            <CourseHandle login name='Open Channel Hydralyics CEN-203' active={this.active} handleClick={this.handleClick}/>
                            <CourseHandle login name='Open Channel Hydralyics CEN-202' active={this.active} handleClick={this.handleClick}/>
                            <CourseHandle login name='Open Channel Hydralyics CEN-208' active={this.active} handleClick={this.handleClick}/>
                            <CourseHandle login name='Open Channel Hydralyics CEN-209' active={this.active} handleClick={this.handleClick}/>
                        </div>
                    </div>
                    <div className='sidebar--form-cover'>
                        <form className='sidebar--form'>
                            <div className='sidebar--form-header'>Add Course</div>
                            <div className='sidebar--form-header_department'>Department</div>
                            <select className='sidebar--form-select_department'>
                                <option value={this.props.key} />
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
                    <div className='sidebar--course'>{this.props.department}</div>
                    <Link to='/'>
                        <div className='sidebar--back'><img src={arrow} alt='arrow' /> Departments</div>
                    </Link>
                    <div className='sidebar--course-name'>
                        <div className='sidebar--course-table_logout'>
                          { this.props.courses.map((course) => (
                            <Link to={ `/departments/${this.props.department_abbr}/courses/${course.code}/` } style={{ textDecoration:'none' }}>
                                <CourseHandle login={false} name={ `${course.title} ${course.code}` } title={course.title} code={course.code} course={course.id} active={this.active} handleClick={this.handleClick}/>
                            </Link>
                          )) }
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Sidebar
