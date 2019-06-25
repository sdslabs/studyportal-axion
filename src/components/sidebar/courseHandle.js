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

        this.active_course = this.active_course.bind(this);
        this.choose_course = this.choose_course.bind(this);
        this.select_course = this.select_course.bind(this);
    }

    active_course() {
        if (this.radio.current.checked) {
            this.course.current.style.borderLeft = '6px solid #38A7DE';
            this.header.current.style.color = '#38A7DE';
        }

        else {
            this.course.current.style.borderLeft = '0px';
            this.header.current.style.color = '#FFFFFF';
        }
    }

    choose_course() {
        this.radio.current.checked = true;
        this.active_course();
    }

    select_course() {
        this.loginradio.current.checked = true;
        this.setState({active: true})
        this.forceUpdate();
    }

    render() {
        if (this.props.login === 'true') {
            return(
                <div className='_tr'>
                    <span className='tr' onClick={this.select_course}>Open Channel Hydralyics CEN-207</span>
                    { this.state.active ? <span className='coursedot'><img src={coursedot} alt='coursedot'/></span> : <span></span> }
                    <input type='radio' name='coursehandle' ref={this.loginradio}/>
                </div>
            )
        }

        else {
            return(
                <div className='_tr' ref={this.course}>
                    <span className='tr' onClick={this.choose_course} ref={this.header}>Open Channel Hydralyics CEN-207</span>
                    { this.props.mycourse === 'true' ? <span className='mycourse'>My Course</span> : <span></span>}
                    <input type='radio' name='coursehandle' ref={this.radio} />
                </div>
            )
        }
    }
}

export default CourseHandle