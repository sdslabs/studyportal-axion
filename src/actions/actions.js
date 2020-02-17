import { GET_COURSES, GET_EMAIL, GET_ID, GET_PROFILE_IMAGE, GET_USER, GET_USERNAME } from 'constants/action-types';

export function getCourse(payload) {
    return { type: GET_COURSES, payload }
}

export function getEmail(payload) {
    return { type: GET_EMAIL, payload }
}

export function getId(payload) {
    return { type: GET_ID, payload }
}

export function getProfileImage(payload) {
  return { type: GET_PROFILE_IMAGE, payload }
}

export function getUser(payload) {
  return { type: GET_USER, payload }
}

export function getUsername(payload) {
  return { type: GET_USERNAME, payload }
}

