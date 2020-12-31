import {
  ADD_DEPARTMENTS,
  SWITCH_ACTIVE_DEPARTMENT,
  ADD_COURSES,
  SWITCH_ACTIVE_COURSE
} from "constants/action-types";

const initialState = {
  departments: [],
  activeDepartment: {
    id: 0,
    abbr: '',
    title: ''
  },
  courses: [],
  activeCourse: {
    id: 0,
    code: '',
    title: ''
  }
};

export default function contentReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload
      };
    case SWITCH_ACTIVE_DEPARTMENT:
      return {
        ...state,
        activeDepartment: action.payload
      };
    case ADD_COURSES:
      return {
        ...state,
        courses: action.payload
      };
    case SWITCH_ACTIVE_COURSE:
      return {
        ...state,
        activeCourse: action.payload
      };
    default:
      return state;
  }
}
