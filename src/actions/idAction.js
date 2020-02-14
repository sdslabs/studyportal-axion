import { GET_ID } from 'constants/action-types';

export default function getUsername(payload) {
    return { type: GET_ID, payload }
}
