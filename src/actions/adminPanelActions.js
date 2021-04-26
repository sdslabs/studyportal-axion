import { SWITCH_SUB_MENU, SWITCH_MAIN_MENU, SWITCH_TAB } from 'constants/action-types';

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
