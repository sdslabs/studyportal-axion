import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RESET_ACTIVES, CLOSE_MODAL } from 'constants/action-types';
import { useHistory } from 'react-router-dom';

const useDidMount = () => {
  const didMountRef = useRef(true);
  const history=useHistory()
  useEffect(() => {
    didMountRef.current = false;
    const url = window.location.href
    const urlParams = url.split("#")[1].split("&")
    const accessToken = urlParams[0].split("=")[1]
    const expireTime = urlParams[2].split("=")[1]
    console.log(accessToken, expireTime);
    try {
      document.cookie = `sdslabs=${accessToken}; Max-Age=${expireTime}; domain=10.25.1.18; SameSite=Lax;`;
      console.log("cookie made")
    } catch (err) {console.log(err)}
    history.push("/")
  });
  return didMountRef.current;
};

/**
 * Component to render different pages in Studyportal.
 */
const Callback = () => {
  const dispatch = useDispatch();
  const didMount = useDidMount();
  useEffect(() => {
    if (didMount) {
      dispatch({ type: CLOSE_MODAL });
      dispatch({ type: RESET_ACTIVES });
    } // eslint-disable-next-line
  }, [didMount]);

  return (
    <div style={{height:"100vh",width:"100vh"}}>
      Logging in
    </div>
  );
};

export default Callback;
