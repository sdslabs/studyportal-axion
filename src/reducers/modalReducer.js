import {
  TOGGLE_REQUEST,
  TOGGLE_UPLOAD,
  OPEN_SEARCH,
  TOGGLE_SEARCH,
  TOGGLE_SHOWMORE,
  TOGGLE_NOTIFICATIONS,
  TOGGLE_USERMENU,
  CLOSE_MODAL
} from 'constants/action-types';

const initialState = {
  request: false,
  upload: false,
  search: false,
  showMore: false,
  notifications: false,
  userMenu: false
};

export default function modalReducer(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_REQUEST:
      return {
        ...state,
        request: !state.request
      };
    case TOGGLE_UPLOAD:
      return {
        ...state,
        upload: !state.upload
      };
    case OPEN_SEARCH: {
      return {
        ...state,
        search: true
      };
    }
    case TOGGLE_SEARCH:
      return {
        ...state,
        search: !state.search
      };
    case TOGGLE_SHOWMORE:
      return {
        ...state,
        showMore: !state.showMore
      };
    case TOGGLE_NOTIFICATIONS:
      return {
        ...state,
        notifications: !state.notifications
      };
    case TOGGLE_USERMENU:
      return {
        ...state,
        userMenu: !state.userMenu
      };
    case CLOSE_MODAL:
      return {
        ...state,
        request: state.request ? false : state.request,
        upload: state.upload ? false : state.upload,
        search: state.search ? false : state.search,
        notifications: state.notifications ? false : state.notifications,
        userMenu: state.userMenu ? false : state.userMenu,
        showMore: state.showMore ? false : state.showMore
      };
    default:
      return state;
  }
}
