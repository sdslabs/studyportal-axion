import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'styles/main.scss';

class CustomCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            hover: false
        };

        this.hover = this.hover.bind(this);
        this.leave = this.leave.bind(this);
    }

    hover() {
        this.setState({ hover: true });
    }

    leave() {
        this.setState({ hover: false });
    }

    render() {
        return(
            <div className='customcheckbox' onMouseOver={this.hover} onMouseLeave={this.leave}>
                <input className='customcheckbox--checkbox' type='checkbox' value={this.props.value} onChange={this.props.handleChange} />
                <span className='customcheckbox--checkmark'
                    style={{
                        border: this.state.hover ? this.props.borderhover : this.props.border,
                        backgroundColor: this.state.hover ? this.props.hover : "#FFFFFF"
                    }}/>
            </div>
        );
    }
}

export default CustomCheckbox;

CustomCheckbox.propTypes = {
    value: PropTypes.bool,
    handleChange: PropTypes.func,
    border: PropTypes.string,
    borderhover: PropTypes.string,
    hover: PropTypes.string
};
