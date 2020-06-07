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
import { downloadFiles } from 'api/filesApi';

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
        this.downloadFile = this.downloadFile.bind(this);
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

    /**
     * Download the file
     */
    downloadFile(id, url) {

        const link = "https://drive.google.com/a/iitr.ac.in/uc?id=" + url + "&export=download";

        //window.open(link, "_blank");
        downloadFiles(id).then((res, err) => {
            this.props.updateFileDownloads0(id, res[0].downloads);
        });
    }

    render() {
        return (
            <div className='material'>
                <div className='material--namecheck'>
                    <div className='material--checkbox'>
                        <CustomCheckbox border='1px solid rgba(43, 42, 40, 0.4)' hover='rgba(56, 167, 222, 0.15)' borderhover='1px solid #38A7DE' />
                    </div>
                    <div className='material--info'>
                        <div className='material--icon'><img src={this.material_map[this.props.ext]} alt='icon' /></div>
                        <div className='material--name' onClick={() => this.downloadFile(this.props.id, this.props.url)}>{this.props.name}</div>
                        <div className='material--download'>Downloads: {this.props.downloads}</div>
                    </div>
                </div>
                <div className='material--sizemod'>
                    {this.state.queue === '1' ?
                        <div className='material--downloadicon-active' onMouseLeave={this.leave} onClick={() => this.downloadFile(this.props.id, this.props.url)}><img src={download1} alt='download' /></div> :
                        <div className='material--downloadicon-other' onMouseOver={this.hover} onClick={() => this.downloadFile(this.props.id, this.props.url)}><img src={download2} alt='download' /></div>}
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
    date_modified: PropTypes.string,
    /** Holds the id of the file */
    id: PropTypes.number,
    /** updates the downloads field in the state of material card */
    updateFileDownloads0: PropTypes.func
};
