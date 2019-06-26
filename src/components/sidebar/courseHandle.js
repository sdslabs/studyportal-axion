import React, {Component} from 'react'
import coursedot from '../../assets/coursedot.png'
import '../../styles/main.scss'

class CourseHandle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: ''
        }

        this.radio = React.createRef();
        this.course = React.createRef();
        this.header = React.createRef();

        this.loginradio = React.createRef();

        this.activatecourse = this.activatecourse.bind(this);
    }

    activatecourse() {
        this.props.handleClick(this.props.name);
    }

    componentWillReceiveProps(props) {
        if (props.login === 'true') {
            if (props.name === props.active) {
                this.setState({active: true})
            }

            else {
                this.setState({active: false})
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
        if (this.props.login === 'true') {
            if (this.props.name === this.props.active) {
                this.setState({active: true})
            }

            else {
                this.setState({active: false})
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
        if (this.props.login === 'true') {
            return(
                <div className='coursehandle'>
                    <span className='coursehandle--heading' onClick={this.activatecourse}>{this.props.name}</span>
                    { this.state.active ? <span className='coursehandle--activedot'><img src={coursedot} alt='coursedot'/></span> : <span></span> }
                </div>
            )
        }

        else {
            return(
                <div className='coursehandle' ref={this.course}>
                    <span className='coursehandle--heading' onClick={this.activatecourse} ref={this.header}>{this.props.name}</span>
                    { this.props.mycourse === 'true' ? <span className='coursehandle--mycourse'>My Course</span> : <span></span>}
                </div>
            )
        }
    }
}

export default CourseHandle