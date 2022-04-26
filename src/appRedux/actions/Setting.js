import {TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH} from "../../constants/ActionTypes";

export function toggleCollapsedSideNav(navCollapsed) {
  return {type: TOGGLE_COLLAPSED_NAV, navCollapsed};
};

export function updateWindowWidth(width) {
  return (dispatch) => {
    dispatch({type: WINDOW_WIDTH, width});
  }
};