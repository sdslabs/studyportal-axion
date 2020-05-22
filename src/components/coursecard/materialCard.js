import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parseDate from 'utils/parseDate';
import pdf from 'assets/material_pdf.svg';
import docx from 'assets/material_docx.svg';
import ppt from 'assets/material_ppt.svg';
import img from 'assets/material_img.svg';
import 'styles/main.scss';
import download1 from 'assets/download.svg';
import download2 from 'assets/download1.svg';
import CustomCheckbox from 'components/customcheckbox/customCheckbox';

/**
 * Component to render files.
 */
class MaterialCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          queue: props.queue
        };
        this.material_map = {
            pdf,
            docx,
            ppt,
            'jpeg': img,
            'png': img,
            'bmp': img
        };

        this.hover = this.hover.bind(this);
        this.leave = this.leave.bind(this);
    }

    /**
     * Highlight download icon.
     */
    hover() {
        this.setState({ queue: '1' });
    }

    /**
     * Remove highlight from download icon.
     */
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
                        <div className='material--icon'><img src={this.material_map[this.props.ext]} alt='icon' /></div>
                        <a href={`https://drive.google.com/a/iitr.ac.in/uc?id=${this.props.url}&export=download`}
                            target='blank' style={{ textDecoration:'none' }}>
                        <div className='material--name'>{this.props.name}</div>
                        </a>
                        <div className='material--download'>Downloads: {this.props.downloads}</div>
                    </div>
                </div>
                <div className='material--sizemod'>
                    <a href={`https://drive.google.com/a/iitr.ac.in/uc?id=${this.props.url}&export=download`}
                            target='blank' style={{ textDecoration:'none' }}>
                        { this.state.queue === '1' ?
                            <div className='material--downloadicon-active' onMouseLeave={this.leave}><img src={download1} alt='download' /></div> :
                            <div className='material--downloadicon-other' onMouseOver={this.hover}><img src={download2} alt='download' /></div> }
                    </a>
                    <div className='material--size'>{this.props.size}</div>
                    <div className='material--datemodified'>{parseDate(this.props.date_modified)}</div>
                </div>
            </div>
        );
    }
}

export default MaterialCard;

MaterialCard.propTypes = {
    /** Holds download icon highlight status. */
    queue: PropTypes.string,
    /** Holds file name. */
    name: PropTypes.string,
    /** Holds file size. */
    size: PropTypes.string,
    /** Holds number of downloads. */
    downloads: PropTypes.number,
    /** Holds driveid of the file. */
    url: PropTypes.string,
    /** Holds file extension to display icon. */
    ext: PropTypes.string,
    /** Holds creation date of file. */
    date_modified: PropTypes.string
};
