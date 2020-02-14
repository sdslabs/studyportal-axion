import { GET_COURSES } from 'constants/action-types';

export default function getCourse(payload) {
    return { type: GET_COURSES, payload }
}
