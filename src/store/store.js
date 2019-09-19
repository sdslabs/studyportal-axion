import { createStore } from 'redux'
import departmentReducer from 'reducers/departmentReducer'

const store = createStore(departmentReducer);
export default store;
