import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SearchResult from 'components/header/searchResult';
import emoji from 'assets/mdi_sentiment_very_dissatisfied.svg';
import { useDispatch } from 'react-redux';
import { TOGGLE_REQUEST } from 'constants/action-types';

const SearchFiles = ({ files, showFiles, value }) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className="search--file">Files</div>
      {!files.length ? (
        <div className="search--file-noresults">
          <span className="search--file-noresults_icon">
            <img src={emoji} alt="emoji" />
          </span>
          <span className="search--file-noresults-outer">
            <div className="search--file-noresults_text">
              Sorry! We couldn&apos;t find any file for you.
            </div>
            <span className="search--file-noresults_text">
              However,you can request what you are looking for.
            </span>
            <span
              className="search--file-noresults_requestfile"
              onClick={() => dispatch({ type: TOGGLE_REQUEST })}
            >
              Request Here!
            </span>
          </span>
        </div>
      ) : (
        <div>
          <div className="search--file-holder">
            {files.slice(0, showFiles).map((file) => (
              <SearchResult
                name={file.title}
                url={file.driveid}
                date_modified={file.date_modified}
                course_name={file.course.title}
                course_code={file.course.code}
                file_type={file.filetype}
                ext={file.fileext}
                key={file.id}
              />
            ))}
          </div>
          <div
            className="search--file-seeall"
            onClick={() => this.props.handleShowMoreModal(files, value)}
          >
            See All
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SearchFiles;

SearchFiles.propTypes = {
  /** Holds the search result for the file query. */
  files: PropTypes.array,
  /** Holds the number of files to be displayed in the search result. */
  showFiles: PropTypes.number,
  /** Holds the query string. */
  value: PropTypes.string,
  /** Function to open ShowMore modal. */
  handleShowMoreModal: PropTypes.func,
};
