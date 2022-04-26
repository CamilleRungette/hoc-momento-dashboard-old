import React, {useEffect} from "react";
import {Layout} from "antd";
import {useDispatch} from "react-redux";
import {footerText} from "../../util/config";
import App from "../../routes/index";
import {useRouteMatch} from "react-router-dom";
import {updateWindowWidth} from "../../appRedux/actions";
import AppSidebar from "./AppSidebar";

const {Content, Footer} = Layout;


const MainApp = () => {

  const match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('resize', () => {
      dispatch(updateWindowWidth(window.innerWidth));
    })
  }, [dispatch]);

  return (
    <Layout className="gx-app-layout">
      <AppSidebar navStyle="NAV_STYLE_FIXED" />
      <Layout>
        <Content className={`gx-layout-content `}>
          <App match={match}/>
          <Footer>
            <div className="gx-layout-footer-content">
              {footerText}
            </div>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  )
};
export default MainApp;

