/* eslint-disable no-param-reassign */
import { SET_USER,SET_COURSES,RESET_APP } from "constants/action-types";

const initialState = {
    login: false,
    id: 0,
    username: '',
    email: '',
    profile_image: '',
    courses: []
};

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
      case SET_USER:
        state = action.payload;
        return state;
      case SET_COURSES:
        state.courses = action.payload;
        return state;
      case RESET_APP:
        state.login = false;
        state.id = 0;
        state.username = '';
        state.email = '';
        state.profile_image = '';
        state.courses = [];
        return state;
      default:
        return state;
    }
}
