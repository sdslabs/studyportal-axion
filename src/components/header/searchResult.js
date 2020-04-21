import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pdf from 'assets/material_pdf.svg';
import docx from 'assets/material_docx.svg';
import ppt from 'assets/material_ppt.svg';
import img from 'assets/material_img.svg';
import 'styles/main.scss';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state={
      file_name: props.name,
      file_url: props.url,
      date_modified: props.date_modified,
      course_name: props.course_name,
      course_code: props.course_code,
      file_type: props.file_type
    };
    this.material_map = {
      pdf,
      docx,
      ppt,
      'jpeg': img,
      'png': img,
      'bmp': img
    };
  }

  parseDate(date) {
    const parts = date.split('-');
    const months = {
      '01': 'Jan',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec'
    };
    return `${months[parts[1]]} ${parts[2]}, ${parts[0]}`;
  }

  render() {
      return(
        <a href={`https://drive.google.com/a/iitr.ac.in/uc?id=${this.state.file_url}&export=download`}
          target='blank'
          style={{ textDecoration: 'none' }}>
          <div className='file--card'>
              <div className='file--card-icon'><img src={this.material_map[this.props.ext]} alt='icon'/></div>
                <div className='file--card-heading'>{this.state.file_name}</div>
                <div className='file--card-info'>
                  <span className='file--card-info_name'>{this.state.course_name}</span>
                  <span className='file--card-info_course'>{this.state.course_code}</span>
                </div>
                <div className='file--card-detail'>
                  <span className='file--card-detail_date'>{this.parseDate(this.state.date_modified)}</span>
                  <span className='file--card-detail_type'>{this.state.file_type}</span>
                </div>
          </div>
        </a>
      );
    }
}

export default SearchResult;

SearchResult.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  date_modified: PropTypes.string,
  course_name: PropTypes.string,
  course_code: PropTypes.string,
  file_type: PropTypes.string,
  ext: PropTypes.string
};
