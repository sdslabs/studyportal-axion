import React from 'react';
import PropTypes from 'prop-types';
import parseDate from 'utils/parseDate';
import pdf from 'assets/material_pdf.svg';
import docx from 'assets/material_docx.svg';
import ppt from 'assets/material_ppt.svg';
import img from 'assets/material_img.svg';
import shortName from 'utils/short-name';
import 'styles/main.scss';

/**
 * Component to render files.
 */
const SearchResult = (props) => {
  const material_map = {
    pdf,
    docx,
    ppt,
  };

  return (
    <a
      href={`https://drive.google.com/a/iitr.ac.in/uc?id=${props.url}&export=download`}
      target="blank"
      style={{ textDecoration: 'none' }}
    >
      <div className="file--card">
        <div className="file--card-icon">
          <img src={material_map[props.ext] ? material_map[props.ext] : img} alt="icon" />
        </div>
        <div className="file--card-heading" title={props.name}>
          {props.name.length < 20 ? props.name : shortName(props.name)}
        </div>
        <div className="file--card-info">
          <span className="file--card-info_name" title={props.course_name}>
            {props.course_name.length > 15 ? shortName(props.course_name) : props.course_name}
          </span>
          <span className="file--card-info_course">{props.course_code}</span>
        </div>
        <div className="file--card-detail">
          <span className="file--card-detail_date">{parseDate(props.date_modified)}</span>
          <span className="file--card-detail_type">{props.filetype}</span>
        </div>
      </div>
    </a>
  );
};

export default SearchResult;

SearchResult.propTypes = {
  /** Holds file name. */
  name: PropTypes.string,
  /** Holds driveid of the file. */
  url: PropTypes.string,
  /** Holds creation date of file. */
  date_modified: PropTypes.string,
  /** Holds course title related to file. */
  course_name: PropTypes.string,
  /** Holds course code related to file. */
  course_code: PropTypes.string,
  /** Holds the type of file. */
  filetype: PropTypes.string,
  /** Holds extension of file. */
  ext: PropTypes.string,
};
