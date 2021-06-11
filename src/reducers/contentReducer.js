import {
  ADD_DEPARTMENTS,
  SWITCH_ACTIVE_DEPARTMENT,
  ADD_COURSES,
  SWITCH_ACTIVE_COURSE,
  SET_FILETYPE,
  SWITCH_ACTIVE_MYCOURSE,
  SET_MYCOURSE_FILETYPE,
  RESET_ACTIVES,
  SET_NOTIFICATIONS,
  ADD_NEW_NOTIFICATION,
} from 'constants/action-types';

const initialState = {
  departments: [],
  activeDepartment: {
    id: 0,
    abbr: '',
    title: '',
  },
  courses: [],
  activeCourse: {
    id: 0,
    code: '',
    title: '',
  },
  filetype: undefined,
  activeMyCourse: {
    id: 0,
    code: '',
    title: '',
  },
  myCoursefiletype: undefined,
  notifications: [],
};

export default function contentReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };
    case SWITCH_ACTIVE_DEPARTMENT:
      return {
        ...state,
        activeDepartment: action.payload,
      };
    case ADD_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case SWITCH_ACTIVE_COURSE:
      return {
        ...state,
        activeCourse: action.payload,
      };
    case SET_FILETYPE:
      return {
        ...state,
        filetype: action.payload,
      };
    case SWITCH_ACTIVE_MYCOURSE:
      return {
        ...state,
        activeMyCourse: action.payload,
      };
    case SET_MYCOURSE_FILETYPE:
      return {
        ...state,
        myCoursefiletype: action.payload,
      };
    case RESET_ACTIVES:
      return {
        ...state,
        activeDepartment: {
          id: 0,
          abbr: '',
          title: '',
        },
        courses: [],
        activeCourse: {
          id: 0,
          code: '',
          title: '',
        },
        filetype: undefined,
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };

    case ADD_NEW_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };

    default:
      return state;
  }
}
