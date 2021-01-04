import React from 'react';
import PropTypes from 'prop-types';
import parseDate from 'utils/parseDate';
import pdf from 'assets/material_pdf.svg';
import docx from 'assets/material_docx.svg';
import ppt from 'assets/material_ppt.svg';
import img from 'assets/material_img.svg';
import 'styles/main.scss';

/**
 * Component to render files.
 */
const SearchResult = (props) => {
  const material_map = {
    pdf,
    docx,
    ppt,
    jpeg: img,
    png: img,
    bmp: img,
  };

  return (
    <a
      href={`https://drive.google.com/a/iitr.ac.in/uc?id=${props.file_url}&export=download`}
      target="blank"
      style={{ textDecoration: 'none' }}
    >
      <div className="file--card">
        <div className="file--card-icon">
          <img src={material_map[props.ext]} alt="icon" />
        </div>
        <div className="file--card-heading">{props.file_name}</div>
        <div className="file--card-info">
          <span className="file--card-info_name">{props.course_name}</span>
          <span className="file--card-info_course">{props.course_code}</span>
        </div>
        <div className="file--card-detail">
          <span className="file--card-detail_date">{parseDate(props.date_modified)}</span>
          <span className="file--card-detail_type">{props.file_type}</span>
        </div>
      </div>
    </a>
  );
};

export default SearchResult;

SearchResult.propTypes = {
  /** Holds file name. */
  file_name: PropTypes.string,
  /** Holds driveid of the file. */
  file_url: PropTypes.string,
  /** Holds creation date of file. */
  date_modified: PropTypes.string,
  /** Holds course title related to file. */
  course_name: PropTypes.string,
  /** Holds course code related to file. */
  course_code: PropTypes.string,
  /** Holds the type of file. */
  file_type: PropTypes.string,
  /** Holds extension of file. */
  ext: PropTypes.string,
};
