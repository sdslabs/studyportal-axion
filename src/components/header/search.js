/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
import React, { Component, Fragment } from 'react'
import SearchResult from './searchResult'
import 'styles/main.scss'
import { getSearchResults } from 'api/searchApi'
import { Link } from 'react-router-dom';
import emoji from 'assets/mdi_sentiment_very_dissatisfied.svg';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
          search: props.search,
          value: props.value,
          files: [],
          departments: [],
          courses: [],
          showFiles: 6,
          showmore: false,
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ search:props.search })
        this.setState({ value: props.value })
        this.getResults(props.value)
    }

    getResults(query) {
      getSearchResults(query).then((res,err) => {
        if(err){
          //TODO handle error
        }
        else {
          if(res.departments){
            this.setState({departments: res.departments})
          }
          if(res.courses){
            this.setState({courses: res.courses})
          }
          if(res.files){
            this.setState({files: res.files})
          }
        }
      })
    }

    render() {
      if(this.state.search)
          if(this.state.departments.length || this.state.courses.length || this.state.files.length)
            return(
              <div>
                <div className='search'>
                    <div className='search--file'>Files</div>
                    {!this.state.files.length ? 
                      <div className='search--file-noresults'>
                        <span className='search--file-noresults_icon'><img src={emoji} alt='emoji'/></span>
                        <span className='search--file-noresults-outer'>
                          <div className='search--file-noresults_text'>Sorry! We couldn't find any file for you.</div>
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
                          <div className='search--file-seeall' onClick={() => this.props.handleSeeAllClick(this.state.files,this.state.value)}>See All</div>
                      </div>
                    }
                    <div className='search--courses'>Courses</div>
                    { !this.state.courses.length ? 
                    <div className='search--courses-noresults'>
                      <span className='search--courses-noresults_icon'><img src={emoji} alt='emoji'/></span>
                      <span className='search--courses-noresults_outer'>
                        <div className='search--courses-noresults_text'>Sorry! We couldn't find any course for you.</div>
                        <span className='search--courses-noresults_text'>However,you can request what you are looking for.</span>
                        <span className='search--courses-noresults_requestcourse' onClick={this.props.handleReqClick}>Request Here!</span>
                      </span>
                    </div> :
                    <div>
                        {this.state.courses.map((course) => (
                          <Link to={ `/departments/${course.department.abbreviation}/courses/${course.code}/` } key={ course.id } style={{ textDecoration: 'none' }}>
                            <div className='search--courses-name' key = {course.id}>{course.title} {course.code}</div>
                          </Link>
                        ))}                      
                    </div>}
                    <div className='search--department'>Department</div>
                    {!this.state.departments.length  ?
                    <div className='search--department-noresults'>
                      <span className='search--department-noresults_icon'><img src={emoji} alt='emoji'/></span>
                      <span className='search--department-noresults_text'>Sorry! We couldn't find any department for you.</span>
                    </div> :
                    <div>
                      {this.state.departments.map((department) => (
                        <Link to={ `/departments/${department.abbreviation}` } key={ department.id } style={{ textDecoration: 'none' }}>
                          <div className='search--department-name' key={department.id}>{department.title}</div>
                        </Link>
                      ))}
                    </div>}
                </div>
              </div>
            )
          else
            return(
              <div className='nosearchresults'>
                <span className='nosearchresults_emoji'><img src={emoji} alt='emoji'/></span>
                <span className='nosearchresults--message'>
                  <div className='nosearchresults--message_plaintext'>Sorry! We couldn't find any file for you.</div>
                  <span className='nosearchresults--message_plaintext'> However,you can request what you are looking for.</span>
                  <span className='nosearchresults--message_request' onClick={this.props.handleReqClick}>Request Here!</span>
                </span>
              </div>
            )
      else
        return(<Fragment/>)
    }
}

export default Search
