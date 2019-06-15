import React, {Component} from 'react'
import '../styles/_customCheckbox.scss'

class CustomCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            disabled: ''
        };

        this.check = React.createRef();
        this.checkmark = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({disable: nextProps});
    }

    componentDidMount() {
        if (this.props.disable === 'true') {
            this.check.current.disabled = true;
        }

        else {
            this.check.current.disabled = false;
        }

        this.checkmark.current.style.border = this.props.border;
    }

    render() {
        return(
            <div className='customcheckbox'>
                <input className='customcheckbox--checkbox' type='checkbox' value={this.props.value} ref={this.check} onChange={this.props.handleChange} />
                <span className='customcheckbox--checkmark' ref={this.checkmark} ></span>
            </div> 
        )
    }
}

export default CustomCheckbox