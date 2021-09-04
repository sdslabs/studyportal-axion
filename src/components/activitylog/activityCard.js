import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import download from 'assets/download.svg';
import blue from 'assets/coursedot.png';
import green from 'assets/green_status.svg';
import yellow from 'assets/yellow_status.svg';
import { getFileById } from 'api/filesApi';
import shortName from 'utils/short-name';
import 'styles/main.scss';

/**
 * Component to render activities.
 */
const ActivityCard = (props) => {
  const [file, setFileDetails] = useState({});

  /**
   * Parse month for date.
   *
   * @param {string} month
   */
  const getMonth = (month) => {
    if (month === '01') return 'Jan';
    else if (month === '02') return 'Feb';
    else if (month === '03') return 'Mar';
    else if (month === '04') return 'Apr';
    else if (month === '05') return 'May';
    else if (month === '06') return 'Jun';
    else if (month === '07') return 'Jul';
    else if (month === '08') return 'Aug';
    else if (month === '09') return 'Sep';
    else if (month === '10') return 'Oct';
    else if (month === '11') return 'Nov';
    else if (month === '12') return 'Dec';
  };

  /**
   * Parse date for activity.
   *
   * @param {string} date
   */
  const parseDate = (date) => {
    if (date) {
      let datePart = date.match(/\d+/g);
      let month = getMonth(`${datePart[1]}`);
      let ordinal = 'th';
      if (datePart[2] === '01' || datePart[2] === '21' || datePart[2] === '31') {
        ordinal = 'st';
      } else if (datePart[2] === '02' || datePart[2] === '22') {
        ordinal = 'nd';
      } else if (datePart[2] === '03' || datePart[2] === '23') {
        ordinal = 'rd';
      }
      let dateString = `${datePart[2]}${ordinal} ${month}, ${datePart[0]}`;
      return dateString;
    }
  };

  useEffect(() => {
    if (props.status === 3) {
      getFileById(props.file).then((res) => {
        setFileDetails(res);
      });
    }
  }, [props]);

  return (
    <div className="activitycard">
      <div className="activitycard--info">
        <div className="activitycard--info_date">
          <span className="activitycard--info_head">
            {props.type === 'request' ? 'Requested On: ' : 'Uploaded On: '}
          </span>
          {parseDate(props.date)}
        </div>
        <div className="activitycard--info_name">
          <span className="activitycard--info_head">Name: </span>
          <span className="activitycard--info_heading">
            {props.title.length > 20 ? shortName(props.title) : props.title}
          </span>
        </div>
        <div className="activitycard--course">
          <span>{props.code}</span>
          <span> . </span>
          <span>{props.course}</span>
        </div>
      </div>
      {props.status === 1 ? (
        <Fragment>
          <div className="activitycard--status_blue">
            <img className="activitycard--status_color" src={blue} alt="blue" /> Request Filed (
            {props.status}/3)
          </div>
          <div className="activitycard--file" />
        </Fragment>
      ) : props.status === 2 ? (
        <Fragment>
          <div className="activitycard--status_yellow">
            <img className="activitycard--status_color" src={yellow} alt="yellow" /> Request
            Approved ({props.status}/3)
          </div>
          <div className="activitycard--file" />
        </Fragment>
      ) : (
        <Fragment>
          <div className="activitycard--status_green">
            <img className="req_color" src={green} alt="green" /> Files Uploaded ({props.status}/3)
          </div>
          <div className="activitycard--file">
            <a
              href={`https://drive.google.com/a/iitr.ac.in/uc?id=${file.driveid}&export=download`}
              target="_blank"
              rel="noreferrer"
              className="linkactive"
            >
              <img className="activitycard--file_download" src={download} alt="download" />{' '}
              {file.title}
            </a>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ActivityCard;

ActivityCard.propTypes = {
  /** Identifies activity status */
  status: PropTypes.number,
  /** Identifies activity type. */
  type: PropTypes.string,
  /** Holds activity creation date. */
  date: PropTypes.string,
  /** Holds activity related title/name. */
  title: PropTypes.string,
  /** Holds course code related to activity. */
  code: PropTypes.string,
  /** Holds course title related to activity. */
  course: PropTypes.string,
  /** Holds the file id of the uploaded file. */
  file: PropTypes.number,
  /** Holds the driveid of the uploaded file. */
  url: PropTypes.string,
};
