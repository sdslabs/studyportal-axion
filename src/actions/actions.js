import { SET_COURSES, SET_USER } from 'constants/action-types';

export function setCourses(payload) {
    return { type: SET_COURSES, payload };
}

export function setUser(payload) {
  return { type: SET_USER, payload };
}
