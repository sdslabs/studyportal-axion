import {
  SWITCH_MAIN_MENU,
  SWITCH_SUB_MENU,
  SWITCH_TAB,
  SET_TABLE_DATA,
  RESET_ADMIN_MENU,
  TOGGLE_ADMIN_LOADER,
} from 'constants/action-types';

const initialState = {
  activeMainMenu: '',
  activeSubMenu: -1,
  activeTab: '',
  subMenuData: [],
  tableData: [],
  loading: '',
};

export default function adminPanelReducer(state = initialState, action) {
  switch (action.type) {
    case SWITCH_MAIN_MENU:
      return {
        ...state,
        activeMainMenu: action.payload.type,
        subMenuData: action.payload.data,
      };

    case SWITCH_SUB_MENU:
      return {
        ...state,
        activeSubMenu: action.payload,
      };

    case SWITCH_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };

    case SET_TABLE_DATA:
      return {
        ...state,
        tableData: action.payload,
      };

    case TOGGLE_ADMIN_LOADER:
      return {
        ...state,
        loading: action.payload,
      };

    case RESET_ADMIN_MENU:
      return initialState;

    default:
      return state;
  }
}
