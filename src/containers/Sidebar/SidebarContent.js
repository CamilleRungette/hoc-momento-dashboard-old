import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import {useSelector} from "react-redux";
import fr from "../../lngProvider/locales/fr.js";

const SubMenu = Menu.SubMenu;


const SidebarContent = ({sidebarCollapsed, setSidebarCollapsed}) => {
  const {navStyle, themeType} = useSelector(({settings}) => settings);
  const pathname = useSelector(({common}) => common.pathname);
  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };


  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile/>
          <AppsNavigation/>
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">

            <Menu.Item key="dashboard">
              <Link to="/dashboard"><i className="icon icon-widgets"/>
                <span>{fr["sidebar.dashboard"]}</span>
              </Link>
            </Menu.Item>

            <SubMenu key="shows" popupClassName={getNavStyleSubMenuClass(navStyle)}
              title={<span> <i className="icon icon-map-street-view"/>
                <span>{fr["sidebar.shows"]}</span></span>}>
                  
              <Menu.Item key="shows/create">
                <Link to="/shows/create">
                  <i className="icon icon-add-circle"/>
                  <span>{fr["sidebar.create"]}</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="shows/list">
                <Link to="/shows/list">
                  <i className="icon icon-tickets"/>
                  <span>{fr["sidebar.shows.list"]}</span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="actions" popupClassName={getNavStyleSubMenuClass(navStyle)}
              title={<span> <i className="icon icon-family"/>
                <span>{fr["sidebar.actions"]}</span></span>}>
                  
              <Menu.Item key="actions/create">
                <Link to="/actions/create">
                  <i className="icon icon-add-circle"/>
                  <span>{fr["sidebar.create"]}</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="actions/list">
                <Link to="/actions/list">
                  <i className="icon icon-tickets"/>
                  <span>{fr["sidebar.actions.list"]}</span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="agenda">
              <Link to="/agenda"><i className="icon icon-calendar"/>
                <span>{fr["sidebar.agenda"]}</span>
              </Link>
            </Menu.Item>
          
            <Menu.Item key="parters">
              <Link to="/partners-and-supports"><i className="icon icon-revenue-new"/>
                <span>{fr["sidebar.partners"]}</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="messages">
              <Link to="/messages"><i className="icon icon-mail-open"/>
                <span>{fr["sidebar.message"]}</span>
              </Link>
            </Menu.Item>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);

