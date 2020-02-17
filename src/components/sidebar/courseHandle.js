/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCourse } from 'actions/actions'
import coursedot from 'assets/coursedot.png'
import 'styles/main.scss'
import shortName from 'utils/short-name'

function mapDispatchToProps(dispatch) {
    return {
      getCourse: course => dispatch(getCourse(course))
    }
}

class CourseHandle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: ''
        }

        this.course = React.createRef();
        this.header = React.createRef();

        this.activatecourse = this.activatecourse.bind(this);
    }

    activatecourse() {
        this.props.handleClick(this.props.name);
        let id = this.props.course
        let name = this.props.name
        this.props.getCourse({ id,name })
    }

    componentWillReceiveProps(props) {
        if (props.login) {
            if (props.name === props.active) {
                this.setState({ active: true })
            }

            else {
                this.setState({ active: false })
            }
        }

        else {
            if (props.name === props.active) {
                this.course.current.style.borderLeft = '0.375rem solid #38A7DE';
                this.course.current.style.width = '98%';
                this.header.current.style.color = '#38A7DE';
            }

            else {
                this.course.current.style.borderLeft = '0.0625rem solid rgba(56, 167, 222, 0.15)';
                this.course.current.style.width = '99.5%'
                this.header.current.style.color = '#FFFFFF';
            }
        }
    }

    componentDidMount() {
        if (this.props.login) {
            if (this.props.name === this.props.active) {
                this.setState({ active: true })
            }

            else {
                this.setState({ active: false })
                localStorage.setItem('course',this.props.course)
                localStorage.setItem('courseName',this.props.active)
            }
        }

        else {
            if (this.props.name === this.props.active) {
                this.course.current.style.borderLeft = '0.375rem solid #38A7DE';
                this.course.current.style.width = '98%';
                this.header.current.style.color = '#38A7DE';
            }

            else {
                this.course.current.style.borderLeft = '0.0625rem solid rgba(56, 167, 222, 0.15)';
                this.course.current.style.width = '99.5%'
                this.header.current.style.color = '#FFFFFF';
            }
        }
    }

    render() {
        if (this.props.login) {
            return(
                <div className='coursehandle'>
                    <span className='coursehandle--heading' onClick={this.activatecourse}>{`${ this.props.title.length >= 30 ? shortName(this.props.title) : this.props.title } ${this.props.code}`}</span>
                    <span>{ this.state.active ? <span className='coursehandle--activedot'><img src={coursedot} alt='coursedot'/></span> : <span /> }</span>
                </div>
            )
        }

        else {
            return(
                <div className='coursehandle' ref={this.course}>
                    <span className='coursehandle--heading' onClick={this.activatecourse} ref={this.header}>{`${ this.props.title.length >= 30 ? shortName(this.props.title) : this.props.title } ${this.props.code}`}</span>
                    { this.props.mycourse === 'true' ? <span className='coursehandle--mycourse'>My Course</span> : <span />}
                </div>
            )
        }
    }
}

export default connect(null,mapDispatchToProps)(CourseHandle)
