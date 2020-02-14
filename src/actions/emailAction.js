import { GET_EMAIL } from 'constants/action-types';

export default function getEmail(payload) {
    return { type: GET_EMAIL, payload }
}
