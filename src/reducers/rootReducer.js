import { GET_ID,GET_USER,GET_USERNAME,GET_EMAIL,GET_PROFILE_IMAGE,GET_COURSES,RESET_APP } from "constants/action-types";

const initialState = {
    id: 0,
    username: '',
    email: '',
    profile_image: '',
    courses: [],
};

export default function rootReducer(state = initialState, action) {
    if (action.type === GET_ID) {
      state.id = action.payload
    }
    if (action.type === GET_USER) {
      state = action.payload
    }
    if (action.type === GET_USERNAME) {
        state.username = action.payload
    }
    else if (action.type === GET_EMAIL) {
      state.email = action.payload
    }
    else if (action.type === GET_PROFILE_IMAGE) {
      state.profile_image = action.payload
    }
    else if (action.type === GET_COURSES) {
        state.courses = action.payload
    }
    else if (action.type === RESET_APP) {
        state.id = 0;
        state.username = '';
        state.email = '';
        state.profile_image = '';
        state.courses = [];
    }
    return state;
}
