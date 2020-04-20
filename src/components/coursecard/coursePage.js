import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FileCover from 'components/cover/fileCover';
import MaterialCard from './materialCard';
import CustomCheckbox from 'components/customcheckbox/customCheckbox';
import { getFilesByCourse,getFilesByType } from 'api/filesApi';
import { getCourseInfoByCode } from 'api/courseApi';
import { getDepartmentInfoByAbbr } from 'api/departmentApi';
import { addCourseForUser, deleteCourseForUser } from 'api/userApi';
import { getCookie } from 'utils/handleCookies';
import 'styles/main.scss';

function mapStateToProps(state) {
  return { user: state };
}

class CoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mycourse: false,
            id: '',
            name: '',
            login: props.user.login,
            loading: false,
            files: []
        };
        this.filemap = {
          "tutorials": "Tutorials",
          "books": "Book",
          "notes": "Notes",
          "exampapers": "Examination Papers"
        };
        this.getFiles = this.getFiles.bind(this);
        this.checkCourse = this.checkCourse.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentDidMount() {
      this.checkCourse(this.props);
      this.getFiles(this.props);
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
      this.checkCourse(nextProps);
      this.getFiles(nextProps);
    }

    getFiles(nextProps) {
      this.setState({ loading:true });
      getDepartmentInfoByAbbr(nextProps.department_abbr).then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          if(!res) nextProps.error();
          else
          getCourseInfoByCode(res.department.id,nextProps.course_code).then((response,err) => {
            if(err) {
              //TODO handle error
            }
            else {
              if(!response) nextProps.error();
              else {
                this.setState({ name:response.title,id:response.id });
                if (nextProps.file_type === undefined || nextProps.file_type === 'all')
                getFilesByCourse(response.id).then((resp,err) => {
                  if(err) {
                    //TODO handle error
                  }
                  else {
                    this.setState({ files:resp, loading:false });
                  }
                });
                else
                getFilesByType(response.id,this.filemap[nextProps.file_type]).then((resp,err) => {
                  if(err) {
                    //TODO handle error
                  }
                  else {
                    this.setState({ files:resp, loading:false });
                  }
              });}}});}});
    }

    async checkCourse(props) {
      if(props.user.login) {
        this.setState({ mycourse:false });
        await props.user.courses.forEach(course => {
          if(course.code === props.course_code)
            this.setState({ mycourse:true });
        });
      }
    }

    addCourse() {
      const token = getCookie('token');
      addCourseForUser(token,this.state.id).then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.props.getUserDetails();
          this.setState({ mycourse:true });
        }
      });
    }

    deleteCourse() {
      const token = getCookie('token');
      deleteCourseForUser(token,this.state.id).then((res,err) => {
        if(err) {
          //TODO handle error
        }
        else {
          this.props.getUserDetails();
          this.setState({ mycourse:false });
        }
      });
    }

    render() {
      if(this.state.loading)
        return(
          <FileCover/>
        );
        else
          return(
              <div className='coursepage' onClick={this.props.close}>
                  <div className="coursepage--head">{ this.state.name } { this.props.course_code }</div>
                  <div className='coursepage--underline' />
                  { this.state.login ? <span>{ !this.state.mycourse ?
                  <div className='coursepage--addcourse' onClick={this.addCourse}>+ Add Course</div> :
                  <div className='coursepage--removecourse' onClick={this.deleteCourse}>- Remove Course</div> }</span> : null}
                  <div className='coursepage--category'>
                      <div className={this.props.file_type === 'all' || this.props.file_type === undefined ?
                                        'coursepage--category_all_' : 'coursepage--category_all'}>
                        <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/all`}
                              className={this.props.file_type === 'all' || this.props.file_type === undefined ? 'linkactive' : 'link'}>
                          <div>All<div className={this.props.file_type === 'all' || this.props.file_type === undefined ?
                                                    'coursepage--underline_all_' : 'coursepage--underline_all'}/></div>
                        </Link>
                      </div>
                      <div className={this.props.file_type === 'tutorials' ? 'coursepage--category_tut_' : 'coursepage--category_tut'}>
                        <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/tutorials`}
                              className={this.props.file_type === 'tutorials' ? 'linkactive' : 'link'}>
                          <div>Tutorials<div className={this.props.file_type === 'tutorials' ?
                                                          'coursepage--underline_tut_' : 'coursepage--underline_tut'}/></div>
                        </Link>
                      </div>
                      <div className={this.props.file_type === 'books' ? 'coursepage--category_books_' : 'coursepage--category_books'}>
                        <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/books`}
                              className={this.props.file_type === 'books' ? 'linkactive' : 'link'}>
                          <div>Books<div className={this.props.file_type === 'books' ?
                                                      'coursepage--underline_books_' : 'coursepage--underline_books'}/></div>
                        </Link>
                      </div>
                      <div className={this.props.file_type === 'notes' ? 'coursepage--category_notes_' : 'coursepage--category_notes'}>
                        <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/notes`}
                              className={this.props.file_type === 'notes' ? 'linkactive' : 'link'}>
                          <div className='category'>Notes<div className={this.props.file_type === 'notes' ?
                                                                            'coursepage--underline_notes_' : 'coursepage--underline_notes'}/></div>
                        </Link>
                      </div>
                      <div className={this.props.file_type === 'exampapers' ? 'coursepage--category_exam_' : 'coursepage--category_exam'}>
                        <Link to={`/departments/${this.props.department_abbr}/courses/${this.props.course_code}/exampapers`}
                              className={this.props.file_type === 'exampapers' ? 'linkactive' : 'link'}>
                          <div>Examination Papers<div className={this.props.file_type === 'exampapers' ?
                                                                  'coursepage--underline_exam_' : 'coursepage--underline_exam'}/></div>
                        </Link>
                      </div>
                  </div>
                  <div className='coursepage--material-sort'>
                      <div className='coursepage--material-sort_namecheck'>
                        <div className='coursepage--material-sort_checkbox'>
                          <CustomCheckbox border='1px solid rgba(43, 42, 40, 0.4)' borderhover='1px solid #38A7DE'/>
                        </div>
                        <div className='coursepage--material-sort_name'>Name</div>
                      </div>
                      <div className='coursepage--material-sort_sizemod'>
                        <div className='coursepage--material-sort_size'>Size</div>
                        <div className='coursepage--material-sort_lastmod'>Last Modified</div>
                      </div>
                  </div>
                  <div className='coursepage--material'>
                      { this.state.files.map((file) => (
                        <MaterialCard key={ file.driveid }
                                      name={ file.title }
                                      url={ file.driveid }
                                      downloads={ file.downloads }
                                      size={ file.size }
                                      date_modified={ file.date_modified } />
                      )) }
                      <div className='coursepage--material_year'>2017</div>
                  </div>
              </div>
          );
    }
}

export default connect(mapStateToProps)(CoursePage);

CoursePage.propTypes = {
  user: PropTypes.object,
  getUserDetails: PropTypes.func,
  close: PropTypes.func,
  course_code: PropTypes.string,
  file_type: PropTypes.string,
  department_abbr: PropTypes.string
};
