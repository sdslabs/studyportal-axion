import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import emoji from 'assets/mdi_sentiment_very_dissatisfied.svg';
import ShortName from 'utils/short-name';

const SearchDepartment = ({ departments }) => {
  return (
    <Fragment>
      <div className="search--department">Department</div>
      {!departments.length ? (
        <div className="search--department-noresults">
          <span className="search--department-noresults_icon">
            <img src={emoji} alt="emoji" />
          </span>
          <span className="search--department-noresults_text">
            Sorry! We couldn&apos;t find any department for you.
          </span>
        </div>
      ) : (
        <div>
          {departments.map((department) => (
            <Link to={`/departments/${department.abbreviation}`} key={department.id}>
              <div
                className="search--department-name link"
                key={department.id}
                title={department.title}
              >
                {department.title.length < 50 ? department.title : ShortName(department.title)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default SearchDepartment;

SearchDepartment.propTypes = {
  /** Holds the search result for the department query. */
  departments: PropTypes.array,
};
