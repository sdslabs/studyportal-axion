/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import '../../styles/main.scss'

class CustomCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            disabled: '',
            hover: false
        };

        this.check = React.createRef();

        this.hover = this.hover.bind(this);
        this.leave = this.leave.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ disable: nextProps });
     }

    componentDidMount() {
        if (this.props.disable === 'true') {
            this.check.current.disabled = true;
        }

        else {
            this.check.current.disabled = false;
        }
    }

    hover() {
        this.setState({ hover: true })
    }

    leave() {
        this.setState({ hover: false })
    }

    render() {
        return(
            <div className='customcheckbox' onMouseOver={this.hover} onMouseLeave={this.leave}>
                <input className='customcheckbox--checkbox' type='checkbox' value={this.props.value} ref={this.check} onChange={this.props.handleChange} />
                <span className='customcheckbox--checkmark' 
                style={{ border: this.state.hover ? this.props.borderhover : this.props.border , backgroundColor: this.state.hover ? this.props.hover : "#FFFFFF" }}/>
            </div> 
        )
    }
}

export default CustomCheckbox