import { SEARCH_RESULTS } from "constants/action-types";

const initialState = {
  files: [],
  query: ''
};

export default function searchReducer(state = initialState, action) {
  switch(action.type) {
    case SEARCH_RESULTS:
      return {
        ...state,
        files: action.payload.files,
        query: action.payload.query
      };
    default:
      return state;
  }
}
