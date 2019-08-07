/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import icon from 'assets/material_icon.svg'
import 'styles/main.scss'
import download1 from 'assets/download.svg'
import download2 from 'assets/download1.svg'
import CustomCheckbox from 'components/customcheckbox/customCheckbox'

class MaterialCard extends Component {
    constructor(props) {
        super(props);
<<<<<<< HEAD
      this.state = {
        queue: '2'
      };
=======
        this.state = {
            queue:'2'
        }
>>>>>>> bdc926616ceb874b6492bbb006c66aa5a4fadc2e

        this.hover = this.hover.bind(this);
        this.leave = this.leave.bind(this);
    }

    componentWillMount() {
        this.setState({ queue: this.props.queue });
    }

    hover() {
        this.setState({ queue: '1' });
    }

    leave() {
        this.setState({ queue: '2' });
    }

    render() {
        return(
            <div className='material'>
                <div className='material--checkbox'>
                    <CustomCheckbox border='1px solid rgba(43, 42, 40, 0.4)' hover='rgba(56, 167, 222, 0.15)' borderhover='1px solid #38A7DE'/>
                </div>
                <div className='material--info'>
                    <div className='material--icon'><img src={icon} alt='icon' /></div>
                    <div className='material--name'>Tutorial 1</div>
                    <div className='material--download'>Downloads: 2048</div>
                </div>
                { this.state.queue === '1' ?
                    <div className='material--downloadicon-active' onMouseLeave={this.leave}><img src={download1} alt='download' /></div> :
                    <div className='material--downloadicon-other' onMouseOver={this.hover}><img src={download2} alt='download' /></div> }
                <div className='material--size'>10.5 MB</div>
                <div className='material--datemodified'>Dec 14, 2018</div>
            </div>
        )
    }
}

export default MaterialCard
