import { SET_USER, SET_COURSES, RESET_APP } from 'constants/action-types';

const initialState = {
  login: false,
  id: 0,
  username: '',
  email: '',
  profile_image: '',
  courses: [],
  role: '',
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        login: true,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        profile_image: action.payload.profile_image,
        role: action.payload.role,
        courses: action.payload.courses,
      };
    case SET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case RESET_APP:
      return {
        ...state,
        login: false,
        id: 0,
        username: '',
        email: '',
        profile_image: '',
        courses: [],
      };
    default:
      return state;
  }
}
