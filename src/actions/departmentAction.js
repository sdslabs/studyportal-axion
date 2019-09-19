import { GET_DEPARTMENT } from 'constants/action-types';

export default function getDepartment(payload) {
    return { type: GET_DEPARTMENT, payload }
}
