import React, { Component, Fragment } from 'react';
import ShowMoreFiles from './showMoreFiles';
import PropTypes from 'prop-types';
import SearchFiles from 'components/search/files';
import SearchCourse from 'components/search/course';
import SearchDepartment from 'components/search/department';
import search from 'assets/head_search.png';
import search_home from 'assets/search.png';
import 'styles/main.scss';
import { getSearchResults } from 'api/searchApi';
import { connect } from 'react-redux';
import {
  TOGGLE_REQUEST,
  OPEN_SEARCH,
  TOGGLE_SEARCH,
  TOGGLE_SHOWMORE,
  SEARCH_RESULTS,
  CLOSE_MODAL,
} from 'constants/action-types';
import emoji from 'assets/mdi_sentiment_very_dissatisfied.svg';

function mapStateToProps(state) {
  return { modal: state.modal };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleRequest: () => dispatch({ type: TOGGLE_REQUEST }),
    openSearch: () => dispatch({ type: OPEN_SEARCH }),
    toggleSearch: () => dispatch({ type: TOGGLE_SEARCH }),
    toggleShowMore: () => dispatch({ type: TOGGLE_SHOWMORE }),
    searchResults: (payload) => dispatch({ type: SEARCH_RESULTS, payload }),
    closeModal: () => dispatch({ type: CLOSE_MODAL }),
  };
}

/**
 * Component to render search.
 */
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      files: [],
      departments: [],
      courses: [],
      showFiles: 6,
    };
  }

  /**
   * Fetches search result.
   *
   * @param {string} query
   */
  getResults = (query) => {
    getSearchResults(query).then((res) => {
      if (res.departments) {
        this.setState({ departments: res.departments });
      }
      if (res.courses) {
        this.setState({ courses: res.courses });
      }
      if (res.files) {
        this.setState({ files: res.files });
      }
    });
  };

  /**
   * Toggles search popup when text is typed in search bar.
   *
   * @param {object} e
   */
  result = (e) => {
    this.setState({ value: e.target.value });
    if (e.target.value !== '') {
      if (!this.state.search) this.props.openSearch();
      this.getResults(e.target.value);
    } else {
      this.props.closeModal();
    }
  };

  /**
   * Toggles show more files popup when "See All" is clicked in the result box.
   *
   * @param {array} files
   * @param {string} query
   */
  handleShowMoreModal = (files, query) => {
    this.props.toggleShowMore();
    const searchPayload = {
      files,
      query,
    };
    this.props.searchResults(searchPayload);
  };

  render() {
    return (
      <div className="search">
        {!this.props.home ? (
          <div className="search--bar">
            <div className="search--bar-input">
              <input
                className="search--bar-input_holder"
                type="text"
                value={this.state.value}
                placeholder="Search file, courses, departments"
                onChange={this.result}
              />
            </div>
            <div>
              <button className="search--bar-icon">
                <img src={search} alt="search" />
              </button>
            </div>
          </div>
        ) : (
          <div className="search--bar_home">
            <div className="search--bar-input_home">
              <input
                className="search--bar-input_holder_home"
                type="text"
                placeholder="Search file, courses, departments"
                onChange={this.result}
              />
            </div>
            <div>
              <button className="search--bar-icon_home">
                <img src={search_home} alt="search" />
              </button>
            </div>
          </div>
        )}
        {this.props.modal.search ? (
          this.state.departments.length || this.state.courses.length || this.state.files.length ? (
            <div className="search--container">
              <SearchFiles
                files={this.state.files}
                showFiles={this.state.showFiles}
                value={this.state.value}
                handleShowMoreModal={this.handleShowMoreModal}
              />
              <SearchCourse courses={this.state.courses} />
              <SearchDepartment departments={this.state.departments} />
            </div>
          ) : (
            <div className="nosearchresults">
              <span className="nosearchresults_emoji">
                <img src={emoji} alt="emoji" />
              </span>
              <span className="nosearchresults--message">
                <div className="nosearchresults--message_plaintext">
                  Sorry! We couldn&apos;t find any file for you.
                </div>
                <span className="nosearchresults--message_plaintext">
                  {' '}
                  However,you can request what you are looking for.
                </span>
                <span
                  className="nosearchresults--message_request"
                  onClick={() => this.props.toggleRequest()}
                >
                  Request Here!
                </span>
              </span>
            </div>
          )
        ) : (
          <Fragment />
        )}
        <ShowMoreFiles />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

Search.propTypes = {
  /** Holds status of various modals and popups. */
  modal: PropTypes.object,
  /** Identifies whether search is in homepage. */
  home: PropTypes.bool,
  /** Function to close modals. */
  closeModal: PropTypes.func,
  /** Function to toggle state of request modal. */
  toggleRequest: PropTypes.func,
  /** Function to toggle state of upload modal. */
  toggleUpload: PropTypes.func,
  /** Function to toggle state of showMore modal. */
  toggleShowMore: PropTypes.func,
  /** Function to open search modal. */
  openSearch: PropTypes.func,
  /** Function to trigger search. */
  searchResults: PropTypes.func,
};
