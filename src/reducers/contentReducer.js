import { ADD_DEPARTMENTS } from "constants/action-types";

const initialState = {
  departments: [],
  department: '',
  courses: [],
  course: ''
};

export default function contentReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload
      };
    default:
      return state;
  }
}
