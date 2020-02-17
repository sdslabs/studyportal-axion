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
      Object.assign({},state,{ id : action.payload });
    }
    if (action.type === GET_USER) {
      Object.assign({},state,action.payload);
    }
    if (action.type === GET_USERNAME) {
        Object.assign({},state,{ username : action.payload });
    }
    else if (action.type === GET_EMAIL) {
      Object.assign({},state,{ email : action.payload });
    }
    else if (action.type === GET_PROFILE_IMAGE) {
      Object.assign({},state,{ profile_image : action.payload });
    }
    else if (action.type === GET_COURSES) {
        Object.assign({},state,{ courses : action.payload });
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
