import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SearchResult from './searchResult';
import search from 'assets/head_search.png';
import 'styles/main.scss';
import { getSearchResults } from 'api/searchApi';
import { Link } from 'react-router-dom';
import emoji from 'assets/mdi_sentiment_very_dissatisfied.svg';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
          search: props.search,
          files: [],
          departments: [],
          courses: [],
          showFiles: 6,
          showmore: false
        };

        this.result = this.result.bind(this);
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(props) {
        this.setState({ search:props.search });
    }

    getResults(query) {
      getSearchResults(query).then((res,err) => {
        if(err){
          //TODO handle error
        }
        else {
          if(res.departments){
            this.setState({ departments: res.departments });
          }
          if(res.courses){
            this.setState({ courses: res.courses });
          }
          if(res.files){
            this.setState({ files: res.files });
          }
        }
      });
    }

    result(e) {
      this.setState({ value: e.target.value });
      if (e.target.value !== '') {
          this.setState({ search: true });
          this.getResults(e.target.value);
      }
      else {
        this.setState({ search:false });
      }
    }

    render() {
      if(this.state.search)
          if(this.state.departments.length || this.state.courses.length || this.state.files.length)
            return(
              <div className='search'>
                <div className='search--bar'>
                  <div className='search--bar-input'>
                    <input className='search--bar-input_holder' type="text" placeholder="Search file, courses, departments" onChange={this.result}/>
                  </div>
                  <div><button className='search--bar-icon'><img src={search} alt='search' /></button></div>
                </div>
                <div className='search--container'>
                  <div className='search--file'>Files</div>
                  {!this.state.files.length ?
                    <div className='search--file-noresults'>
                      <span className='search--file-noresults_icon'><img src={emoji} alt='emoji'/></span>
                      <span className='search--file-noresults-outer'>
                        <div className='search--file-noresults_text'>Sorry! We couldn&apos;t find any file for you.</div>
                        <span className='search--file-noresults_text'>However,you can request what you are looking for.</span>
                        <span className='search--file-noresults_requestfile' onClick={this.props.handleReqClick}>Request Here!</span>
                      </span>
                    </div> :
                      <div>
                        <div className='search--file-holder'>
                        {this.state.files.slice(0,this.state.showFiles).map((file) => (
                          <SearchResult name={ file.title } url={ file.driveid } date_modified={ file.date_modified }
                          course_name={ file.course.title } course_code={ file.course.code } file_type={ file.filetype } key={file.id}/>
                        ))}
                        </div>
                        <div className='search--file-seeall'
                          onClick={() => this.props.handleSeeAllClick(this.state.files,this.state.value)}>See All</div>
                    </div>
                  }
                  <div className='search--courses'>Courses</div>
                  { !this.state.courses.length ?
                  <div className='search--courses-noresults'>
                    <span className='search--courses-noresults_icon'><img src={emoji} alt='emoji'/></span>
                    <span className='search--courses-noresults_outer'>
                      <div className='search--courses-noresults_text'>Sorry! We couldn&apos;t find any course for you.</div>
                      <span className='search--courses-noresults_text'>However,you can request what you are looking for.</span>
                      <span className='search--courses-noresults_requestcourse' onClick={this.props.handleReqClick}>&nbsp;Request Here!</span>
                    </span>
                  </div> :
                  <div>
                      {this.state.courses.map((course) => (
                        <Link to={ `/departments/${course.department.abbreviation}/courses/${course.code}/` } key={ course.id }>
                          <div className='search--courses-name link' key = {course.id}>{course.title} {course.code}</div>
                        </Link>
                      ))}
                  </div>}
                  <div className='search--department'>Department</div>
                  {!this.state.departments.length  ?
                  <div className='search--department-noresults'>
                    <span className='search--department-noresults_icon'><img src={emoji} alt='emoji'/></span>
                    <span className='search--department-noresults_text'>Sorry! We couldn&apos;t find any department for you.</span>
                  </div> :
                  <div>
                    {this.state.departments.map((department) => (
                      <Link to={ `/departments/${department.abbreviation}` } key={ department.id }>
                        <div className='search--department-name link' key={department.id}>{department.title}</div>
                      </Link>
                    ))}
                  </div>}
                </div>
              </div>
            );
          else
            return(
              <div className='search'>
                <div className='search--bar'>
                  <div className='search--bar-input'>
                    <input className='search--bar-input_holder' type="text" placeholder="Search file, courses, departments" onChange={this.result}/>
                  </div>
                  <div><button className='search--bar-icon'><img src={search} alt='search' /></button></div>
                </div>
                <div className='nosearchresults'>
                  <span className='nosearchresults_emoji'><img src={emoji} alt='emoji'/></span>
                  <span className='nosearchresults--message'>
                    <div className='nosearchresults--message_plaintext'>Sorry! We couldn&apos;t find any file for you.</div>
                    <span className='nosearchresults--message_plaintext'> However,you can request what you are looking for.</span>
                    <span className='nosearchresults--message_request' onClick={this.props.handleReqClick}>Request Here!</span>
                  </span>
                </div>
              </div>
            );
      else
        return(
          <div className='search'>
            <div className='search--bar'>
              <div className='search--bar-input'>
                <input className='search--bar-input_holder' type="text" placeholder="Search file, courses, departments" onChange={this.result}/>
              </div>
              <div><button className='search--bar-icon'><img src={search} alt='search' /></button></div>
            </div>
          </div>
        );
    }
}

export default Search;

Search.propTypes = {
  search: PropTypes.bool,
  handleReqClick: PropTypes.func,
  handleSeeAllClick: PropTypes.func
}
