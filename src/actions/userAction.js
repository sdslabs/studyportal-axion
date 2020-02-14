import { GET_USER } from 'constants/action-types';

export default function getUsername(payload) {
    return { type: GET_USER, payload }
}
