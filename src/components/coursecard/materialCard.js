import React, { useState } from 'react';
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
const MaterialCard = (props) => {
  const [queue, setQueue] = useState(false);

  const material_map = {
    pdf,
    docx,
    ppt,
    jpeg: img,
    png: img,
    bmp: img,
  };

  /**
   * Highlight download icon.
   */
  const hover = () => {
    setQueue(true);
  };

  /**
   * Remove highlight from download icon.
   */
  const leave = () => {
    setQueue(false);
  };

  /**
   * Handle download button click
   */
  const downloadFile = (id, url) => {
    // TODO
    const link = `https://drive.google.com/a/iitr.ac.in/uc?id=${url}&export=download`;
    window.open(link, '_blank');
    downloadFiles(id).then((res) => {
      this.props.updateFileState(id, res[0].downloads);
    });
  };

  return (
    <div className="material">
      <div className="material--namecheck">
        <div className="material--checkbox">
          <CustomCheckbox
            border="1px solid rgba(43, 42, 40, 0.4)"
            hover="rgba(56, 167, 222, 0.15)"
            borderhover="1px solid #38A7DE"
          />
        </div>
        <div className="material--info">
          <div className="material--icon">
            <img src={material_map[props.ext]} alt="icon" />
          </div>
          <div className="material--name" onClick={() => downloadFile(props.id, props.url)}>
            {props.name}
          </div>
          <div className="material--download">Downloads: {props.downloads}</div>
        </div>
      </div>
      <div className="material--sizemod">
        {queue ? (
          <div
            className="material--downloadicon-active"
            onMouseLeave={leave}
            onClick={() => downloadFile(props.id, props.url)}
          >
            <img src={download1} alt="download" />
          </div>
        ) : (
          <div
            className="material--downloadicon-other"
            onMouseOver={hover}
            onClick={() => downloadFile(props.id, props.url)}
          >
            <img src={download2} alt="download" />
          </div>
        )}
        <div className="material--size">{props.size}</div>
        <div className="material--datemodified">{parseDate(props.date_modified)}</div>
      </div>
    </div>
  );
};

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
  updateFileState: PropTypes.func,
};
