import {
  SWITCH_MAIN_MENU,
  SWITCH_SUB_MENU,
  SWITCH_TAB,
  SET_TABLE_DATA,
} from 'constants/action-types';

const initialState = {
  activeMainMenu: '',
  activeSubMenu: -1,
  activeTab: '',
  subMenuData: [],
  tableData: [],
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

    default:
      return state;
  }
}
