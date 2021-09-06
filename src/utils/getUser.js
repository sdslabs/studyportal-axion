import { loginUserWithToken, loginUserWithCookie } from 'api/userApi';
import { getCookie, removeCookie } from 'utils/handleCookies';
import { SET_USER, RESET_APP } from 'constants/action-types';

/**
 * Fetch user details.
 */
export const getUser = (dispatch) => {
  const token = getCookie('token');
  const cookie = getCookie('sdslabs');
  if (token) {
    loginUserWithToken(token)
      .then((res) => {
        const user = {
          id: res.user.auth_id,
          username: res.user.username,
          email: res.user.email,
          profile_image: res.user.profile_image,
          role: res.user.role,
          courses: res.courses,
        };
        dispatch({ type: SET_USER, payload: user });
        // Logged in with token
      })
      .catch(() => {
        // Token is corrupted
        if (cookie) {
          cookieFlow(dispatch);
        } else {
          dispatch({ type: RESET_APP });
          removeCookie('token');
          // No cookie present and the token is corrupted
        }
      });
  } else if (cookie) {
    cookieFlow(dispatch);
  } else {
    dispatch({ type: RESET_APP });
    // Neither cookie nor token present
  }
};

function cookieFlow(dispatch) {
  loginUserWithCookie()
    .then((res) => {
      const user = {
        login: true,
        id: res.user.falcon_id,
        username: res.user.username,
        email: res.user.email,
        profile_image: res.user.profile_image,
        courses: res.courses,
      };
      dispatch({ type: SET_USER, payload: user });
      // Logged in with cookie and the invalid token has been replaced
    })
    .catch(() => {
      dispatch({ type: RESET_APP });
      removeCookie('token');
      // The cookie is corrupted, both the token and the cookie have been removed
    });
}
