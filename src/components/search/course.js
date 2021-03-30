import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import emoji from 'assets/mdi_sentiment_very_dissatisfied.svg';

const SearchCourse = ({ courses }) => {
  return (
    <Fragment>
      <div className="search--courses">Courses</div>
      {!courses.length ? (
        <div className="search--courses-noresults">
          <span className="search--courses-noresults_icon">
            <img src={emoji} alt="emoji" />
          </span>
          <span className="search--courses-noresults_outer">
            <div className="search--courses-noresults_text">
              Sorry! We couldn&apos;t find any course for you.
            </div>
            <span className="search--courses-noresults_text">
              However,you can request what you are looking for.
            </span>
            <span
              className="search--courses-noresults_requestcourse"
              onClick={() => this.props.toggleRequest()}
            >
              &nbsp;Request Here!
            </span>
          </span>
        </div>
      ) : (
        <div>
          {courses.map((course) => (
            <Link
              to={`/departments/${course.department.abbreviation}/courses/${course.code}/`}
              key={course.id}
            >
              <div className="search--courses-name link" key={course.id}>
                {course.title} {course.code}
              </div>
            </Link>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default SearchCourse;

SearchCourse.propTypes = {
  /** Holds the search result for the course query. */
  courses: PropTypes.array,
};
