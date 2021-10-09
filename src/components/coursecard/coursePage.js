import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import FileCover from 'components/cover/fileCover';
import MaterialCard from './materialCard';
import NoContentCover from 'components/cover/noContentCover';
import { getFilesByCourse, getFilesByType } from 'api/filesApi';
import { addCourseForUser, deleteCourseForUser } from 'api/userApi';
import { getCookie } from 'utils/handleCookies';
import shortName from 'utils/short-name';
import { getUser } from 'utils/getUser';
import { toast } from 'react-toastify';
import 'styles/main.scss';
import { CLOSE_MODAL } from 'constants/action-types';

/**
 * Coursepage component for Studyportal.
 */
const CoursePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const content = useSelector((state) => state.content);

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [year, setYear] = useState(0);
  const [mycourse, setMycourse] = useState(false);

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const updateFileState = () => {
    getFiles(content);
  };

  /**
   * Fetches files according to params.
   *
   * @param {object} content
   */
  const getFiles = (content) => {
    setLoading(true);
    if (content.filetype === undefined)
      getFilesByCourse(content.activeCourse.id).then((resp) => {
        setFiles(sortFilesByYear(resp));
        setLoading(false);
      });
    else
      getFilesByType(content.activeCourse.id, content.filetype).then((resp) => {
        setFiles(sortFilesByYear(resp));
        setLoading(false);
      });
  };

  /**
   * Sorts files by creation date.
   *
   * @param {array} files
   */
  const sortFilesByYear = (files) => {
    if (!_.isEmpty(files)) {
      let years = [];
      files.forEach((file) => {
        let year = file.date_modified.split('-');
        if (years.find((o) => o.year === year[0]) === undefined)
          years.push({
            year: year[0],
            files: [],
          });
        years.find((o) => o.year === year[0]).files.push(file);
      });
      years.sort((a, b) => {
        return parseInt(b.year) - parseInt(a.year);
      });
      setYear(years[0].year);
      return years;
    } else return files;
  };

  /**
   * Checks if this course is registered for the user.
   */
  const checkCourse = async (user, content) => {
    if (user.login) {
      setMycourse(false);
      if (user.courses) {
        await user.courses.forEach((course) => {
          if (course.code === content.activeCourse.code) setMycourse(true);
        });
      }
    }
  };

  /**
   * Registers course for user.
   */
  const addCourse = () => {
    const token = getCookie('token');
    addCourseForUser(token, content.activeCourse.id).then(() => {
      getUser(dispatch);
      setMycourse(true);
      toast('Course has been added to your course list');
    });
  };

  /**
   * Removes registered course from user.
   */
  const deleteCourse = () => {
    const token = getCookie('token');
    deleteCourseForUser(token, content.activeCourse.id).then(() => {
      getUser(dispatch);
      setMycourse(false);
      toast('Course has been removed from your course list');
    });
  };

  useEffect(() => {
    if (!_.isEmpty(content.activeCourse)) getFiles(content);
    // eslint-disable-next-line
  }, [content.activeCourse, content.filetype]);

  useEffect(() => {
    checkCourse(user, content);
    // eslint-disable-next-line
  }, [content.activeCourse, content.filetype, user.login, user.courses]);

  if (loading) return <FileCover />;
  else
    return (
      <div className="coursepage" onClick={() => closeModal()}>
        <div
          className="coursepage--head"
          title={content.activeCourse.title + ' ' + content.activeCourse.code}
        >
          {content.activeCourse.title.length >= 25
            ? shortName(content.activeCourse.title)
            : content.activeCourse.title}{' '}
          {content.activeCourse.code}
        </div>
        <div className="coursepage--underline" />
        {user.login ? (
          <span>
            {!mycourse ? (
              <div className="coursepage--addcourse" onClick={addCourse}>
                + Add Course
              </div>
            ) : (
              <div className="coursepage--removecourse" onClick={deleteCourse}>
                - Remove Course
              </div>
            )}
          </span>
        ) : null}
        {/* TODO Refactor this entire block */}
        <div className="coursepage--category">
          <div
            className={
              content.filetype === 'all' || content.filetype === undefined
                ? 'coursepage--category_all_'
                : 'coursepage--category_all'
            }
          >
            <Link
              to={`/departments/${content.activeDepartment.abbr}/courses/${content.activeCourse.code}/all`}
              className={
                content.filetype === 'all' || content.filetype === undefined ? 'linkactive' : 'link'
              }
            >
              <div>
                All
                <div
                  className={
                    content.filetype === 'all' || content.filetype === undefined
                      ? 'coursepage--underline_all_'
                      : 'coursepage--underline_all'
                  }
                />
              </div>
            </Link>
          </div>
          <div
            className={
              content.filetype === 'tutorials'
                ? 'coursepage--category_tut_'
                : 'coursepage--category_tut'
            }
          >
            <Link
              to={`/departments/${content.activeDepartment.abbr}/courses/${content.activeCourse.code}/tutorials`}
              className={content.filetype === 'tutorials' ? 'linkactive' : 'link'}
            >
              <div>
                Tutorials
                <div
                  className={
                    content.filetype === 'tutorials'
                      ? 'coursepage--underline_tut_'
                      : 'coursepage--underline_tut'
                  }
                />
              </div>
            </Link>
          </div>
          <div
            className={
              content.filetype === 'books'
                ? 'coursepage--category_books_'
                : 'coursepage--category_books'
            }
          >
            <Link
              to={`/departments/${content.activeDepartment.abbr}/courses/${content.activeCourse.code}/books`}
              className={content.filetype === 'books' ? 'linkactive' : 'link'}
            >
              <div>
                Books
                <div
                  className={
                    content.filetype === 'books'
                      ? 'coursepage--underline_books_'
                      : 'coursepage--underline_books'
                  }
                />
              </div>
            </Link>
          </div>
          <div
            className={
              content.filetype === 'notes'
                ? 'coursepage--category_notes_'
                : 'coursepage--category_notes'
            }
          >
            <Link
              to={`/departments/${content.activeDepartment.abbr}/courses/${content.activeCourse.code}/notes`}
              className={content.filetype === 'notes' ? 'linkactive' : 'link'}
            >
              <div className="category">
                Notes
                <div
                  className={
                    content.filetype === 'notes'
                      ? 'coursepage--underline_notes_'
                      : 'coursepage--underline_notes'
                  }
                />
              </div>
            </Link>
          </div>
          <div
            className={
              content.filetype === 'exampapers'
                ? 'coursepage--category_exam_'
                : 'coursepage--category_exam'
            }
          >
            <Link
              to={`/departments/${content.activeDepartment.abbr}/courses/${content.activeCourse.code}/exampapers`}
              className={content.filetype === 'exampapers' ? 'linkactive' : 'link'}
            >
              <div>
                Examination Papers
                <div
                  className={
                    content.filetype === 'exampapers'
                      ? 'coursepage--underline_exam_'
                      : 'coursepage--underline_exam'
                  }
                />
              </div>
            </Link>
          </div>
        </div>
        {/* Uptil here */}
        {files.length > 0 ? (
          <>
            <div className="coursepage--material-sort">
              <div className="coursepage--material-sort_namecheck">
                <div className="coursepage--material-sort_name">Name</div>
              </div>
              <div className="coursepage--material-sort_sizemod">
                <div className="coursepage--material-sort_size">Size</div>
                <div className="coursepage--material-sort_lastmod">Last Modified</div>
              </div>
            </div>
            <div className="coursepage--material">
              {files.map((obj) => (
                <div key={obj.year}>
                  {obj.year === year
                    ? obj.files.map((file) => (
                        <MaterialCard
                          key={file.driveid}
                          id={file.id}
                          name={file.title}
                          url={file.driveid}
                          downloads={file.downloads}
                          ext={file.fileext}
                          size={file.size}
                          date_modified={file.date_modified}
                          updateFileState={updateFileState}
                        />
                      ))
                    : null}
                  <div className="coursepage--material_year" onClick={() => setYear(obj.year)}>
                    {obj.year}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <NoContentCover />
        )}
      </div>
    );
};

export default CoursePage;

CoursePage.propTypes = {
  /** Holds user data which is handled through Redux. */
  user: PropTypes.object,
  /** Function to close modals. */
  close: PropTypes.func,
  /** Holds course code for the course. */
  course_code: PropTypes.string,
  /** Holds file type displayed currently. */
  file_type: PropTypes.string,
  /** Holds department abbreviation for the department. */
  department_abbr: PropTypes.string,
};
