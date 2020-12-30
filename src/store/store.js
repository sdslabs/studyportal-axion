import { createStore, combineReducers } from 'redux';
import userReducer from 'reducers/userReducer';
import contentReducer from 'reducers/contentReducer';
import modalReducer from 'reducers/modalReducer';
import searchReducer from 'reducers/searchReducer';

const rootReducer = combineReducers({
  user: userReducer,
  content: contentReducer,
  modal: modalReducer,
  search: searchReducer
});

const store = createStore(rootReducer);
export default store;
