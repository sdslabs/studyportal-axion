import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'styles/main.scss';

/**
 * Component to render custom checkboxes.
 */
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

    /**
     * Highlight checkbox.
     */
    hover() {
        this.setState({ hover: true });
    }

    /**
     * Remove highlight from checkbox.
     */
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
    /** Identifies checked status of checkbox. */
    value: PropTypes.bool,
    /** Identifies the checkbox toggle status. */
    handleChange: PropTypes.func,
    /** Holds border color for checkbox. */
    border: PropTypes.string,
    /** Holds border color for checkbox on hover. */
    borderhover: PropTypes.string,
    /** Holds colour displayed on higlight. */
    hover: PropTypes.string
};
