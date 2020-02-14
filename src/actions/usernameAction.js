import { GET_USERNAME } from 'constants/action-types';

export default function getUsername(payload) {
    return { type: GET_USERNAME, payload }
}
