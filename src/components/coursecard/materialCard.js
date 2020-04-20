import React, { Component } from 'react';
import PropTypes from 'prop-types';
import icon from 'assets/material_icon.svg';
import 'styles/main.scss';
import download1 from 'assets/download.svg';
import download2 from 'assets/download1.svg';
import CustomCheckbox from 'components/customcheckbox/customCheckbox';

class MaterialCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          queue: props.queue,
          name: props.name,
          size: props.size,
          downloads: props.downloads
        };

        this.hover = this.hover.bind(this);
        this.leave = this.leave.bind(this);
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(props) {
        this.setState({ name: props.name, size: props.size, downloads: props.downloads });
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
                <div className='material--namecheck'>
                    <div className='material--checkbox'>
                        <CustomCheckbox border='1px solid rgba(43, 42, 40, 0.4)' hover='rgba(56, 167, 222, 0.15)' borderhover='1px solid #38A7DE'/>
                    </div>
                    <div className='material--info'>
                        <div className='material--icon'><img src={icon} alt='icon' /></div>
                        <a href={`https://drive.google.com/a/iitr.ac.in/uc?id=${this.props.url}&export=download`}
                            target='blank' style={{ textDecoration:'none' }}>
                        <div className='material--name'>{this.state.name}</div>
                        </a>
                        <div className='material--download'>Downloads: {this.state.downloads}</div>
                    </div>
                </div>
                <div className='material--sizemod'>
                    { this.state.queue === '1' ?
                        <div className='material--downloadicon-active' onMouseLeave={this.leave}><img src={download1} alt='download' /></div> :
                        <div className='material--downloadicon-other' onMouseOver={this.hover}><img src={download2} alt='download' /></div> }
                    <div className='material--size'>{this.state.size}</div>
                    <div className='material--datemodified'>Dec 14, 2018</div>
                </div>
            </div>
        );
    }
}

export default MaterialCard;

MaterialCard.propTypes = {
    queue: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.string,
    downloads: PropTypes.number,
    url: PropTypes.string
};
