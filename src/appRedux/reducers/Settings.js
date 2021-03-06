import {
  LAYOUT_TYPE,
  LAYOUT_TYPE_FULL,
  NAV_STYLE,
  NAV_STYLE_FIXED,
  THEME_TYPE,
  THEME_TYPE_SEMI_DARK, 
} from "../../constants/ThemeSetting";

const initialSettings = {
  navStyle: NAV_STYLE_FIXED,
  layoutType: LAYOUT_TYPE_FULL,
  themeType: THEME_TYPE_SEMI_DARK,
  themeColor: '',

  isDirectionRTL: false,
  locale: {
    languageId: 'french',
    locale: 'fr',
    name: 'French',
    icon: 'fr'
  }
};

const SettingsReducer = (state = initialSettings, action) => {
  switch (action.type) {

    case THEME_TYPE:
      return {
        ...state,
        themeType: action.themeType
      };

    case NAV_STYLE:
      return {
        ...state,
        navStyle: action.navStyle
      };

    case LAYOUT_TYPE:
      return {
        ...state,
        layoutType: action.layoutType
      };
      
    default:
      return state;
  }
};

export default SettingsReducer;
