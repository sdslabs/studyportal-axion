import { GET_DEPARTMENT,GET_COURSE,RESET_APP } from "constants/action-types";

const initialState = {
    department: 0,
    course: {
      id: 0,
      name: ""
    }
};

export default function rootReducer(state = initialState, action) {
    if (action.type === GET_DEPARTMENT) {
        state.department = action.payload
    }
    else if (action.type === GET_COURSE) {
        state.course = action.payload
    }
    else if (action.type === RESET_APP) {
        state.department = 0
    }
    return state;
}
