import { SET_COURSES, SET_USER, RESET_APP, TOGGLE_USERMENU } from 'constants/action-types';

export function setCourses(payload) {
  return { type: SET_COURSES, payload };
}

export function setUser(payload) {
  return { type: SET_USER, payload };
}

export function resetApp() {
  return { type: RESET_APP };
}

export function toggleUserMenu() {
  return { type: TOGGLE_USERMENU };
}
