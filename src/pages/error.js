import React from 'react';
import Header from 'components/header/header';
import Error from 'components/error/error';

/**
 * Component to render different pages in Studyportal.
 */
const ErrorPage = () => {
  return (
    <div>
        <Header />
        <Error />
    </div>
  );
};

export default ErrorPage;
