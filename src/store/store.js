import { createStore, combineReducers } from 'redux';
import userReducer from 'reducers/userReducer';
import contentReducer from 'reducers/contentReducer';
import modalReducer from 'reducers/modalReducer';
import searchReducer from 'reducers/searchReducer';
import adminPanelReducer from 'reducers/adminPanelReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import autoMergeLevel3 from 'redux-persist/lib/stateReconciler/autoMergeLevel3';

const rootReducer = combineReducers({
  user: userReducer,
  content: contentReducer,
  modal: modalReducer,
  search: searchReducer,
  adminPanel: adminPanelReducer,
});

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer);
export default store;
export const persistor = persistStore(store);
