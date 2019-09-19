import { GET_DEPARTMENT,RESET_APP } from "constants/action-types";

const initialState = {
    department: 0
};

export default function departmentReducer(state = initialState, action) {
    if (action.type === GET_DEPARTMENT) {
        state.department = action.payload
    }
    else if (action.type === RESET_APP) {
        state.department = 0
    }
    return state;
}
