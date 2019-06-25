import React, {Component} from 'react'
import '../styles/_customCheckbox.scss'

class CustomCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            disable: 'true'
        };

        this.check = React.createRef();
        this.checkmark = React.createRef();

        this.hover = this.hover.bind(this);
        this.leave = this.leave.bind(this);
    }

    componentWillReceiveProps(disable) {
        this.check.current.disabled = false;
        this.checkmark.current.style.border = this.props.activeborder;
        this.setState({disable:disable});
    }

    componentDidMount() {
        this.checkmark.current.style.border = this.props.border;
        if (this.state.disable === 'true') {
            this.check.current.disabled = true;
        }
    }

    hover() {
        this.checkmark.current.style.background = this.props.hover;
        this.checkmark.current.style.border = this.props.borderhover;
    }

    leave() {
        this.checkmark.current.style.background = '#FFFFFF';
        this.checkmark.current.style.border = this.props.border;
    }

    render() {
        return(
            <div className='customcheckbox' onMouseOver={this.hover} onMouseLeave={this.leave}>
                <input className='customcheckbox--checkbox' type='checkbox' value={this.props.value} ref={this.check} onChange={this.props.handleChange} />
                <span className='customcheckbox--checkmark' ref={this.checkmark}></span>
            </div> 
        )
    }
}

export default CustomCheckbox