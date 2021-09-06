import {
  SWITCH_SUB_MENU,
  SWITCH_MAIN_MENU,
  SWITCH_TAB,
  SET_TABLE_DATA,
  RESET_ADMIN_MENU,
  TOGGLE_ADMIN_LOADER,
} from 'constants/action-types';

export const SwitchMainMenu = (data) => ({
  type: SWITCH_MAIN_MENU,
  payload: data,
});

export const SwitchSubMenu = (data) => ({
  type: SWITCH_SUB_MENU,
  payload: data,
});

export const SwitchTab = (data) => ({
  type: SWITCH_TAB,
  payload: data,
});

export const SetTableData = (data) => ({
  type: SET_TABLE_DATA,
  payload: data,
});

export const ResetAdminMenu = () => ({
  type: RESET_ADMIN_MENU,
});

export const ToggleAdminLoader = (data) => ({
  type: TOGGLE_ADMIN_LOADER,
  payload: data,
});
