import { GET_COURSE } from 'constants/action-types';

export default function getCourse(payload) {
    return { type: GET_COURSE, payload }
}
