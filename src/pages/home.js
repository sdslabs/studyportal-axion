import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Header from 'components/home/header';
import SubjectCard from 'components/home/subjectCard';
import 'styles/main.scss';
import { Link } from 'react-router-dom';
import { RESET_ACTIVES, CLOSE_MODAL } from 'constants/action-types';

const useDidMount = () => {
  const didMountRef = useRef(true);
  useEffect(() => {
    didMountRef.current = false;
  }, []);
  return didMountRef.current;
};

/**
 * Homepage component for Studyportal.
 */
const Home = () => {
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const content = useSelector((state) => state.content);
  const modal = useSelector((state) => state.modal);

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  useEffect(() => {
    if (didMount) {
      dispatch({ type: CLOSE_MODAL });
      dispatch({ type: RESET_ACTIVES });
    } // eslint-disable-next-line
  }, [didMount]);

  return (
    <div className="home">
      <div className="home--header">
        <Header />
      </div>
      <section onClick={() => closeModal()}>
        <div className="home--choosedept">
          <div onClick={() => closeModal()}>Click on department to continue</div>
          <div className="home--choosedept_und" />
        </div>
        <div
          className={
            modal.request || modal.upload || modal.showMore
              ? 'home--sub_list_modal'
              : 'home--sub_list'
          }
          onClick={() => closeModal()}
        >
          {content.departments.map((department) => (
            <Link to={`/departments/${department.abbreviation}`} key={department.abbreviation}>
              <SubjectCard name={department.title} url={department.image} id={department.id} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

Home.propTypes = {
  /** Holds user data which is handled through Redux. */
  user: PropTypes.object,
  /** Resets the app to a new logged out session */
  resetApp: PropTypes.func,
};
