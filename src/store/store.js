import { createStore, combineReducers } from 'redux';
import userReducer from 'reducers/userReducer';
import contentReducer from 'reducers/contentReducer';
import modalReducer from 'reducers/modalReducer';
import searchReducer from 'reducers/searchReducer';
import adminPanelReducer from '~/reducers/adminPanelReducer';

const rootReducer = combineReducers({
  user: userReducer,
  content: contentReducer,
  modal: modalReducer,
  search: searchReducer,
  adminPanel: adminPanelReducer,
});

const store = createStore(rootReducer);
export default store;
