import { SWITCH_MAIN_MENU, SWITCH_SUB_MENU, SWITCH_TAB } from '~/constants/action-types';

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
        activeTab: action.payload.type,
        tableData: action.payload.data,
      };

    default:
      return state;
  }
}
