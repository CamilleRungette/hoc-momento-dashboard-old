import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}dashboard`} component={asyncComponent(() => import('./SamplePage'))}/>
      <Route path={`${match.url}shows/create`} component={asyncComponent(() => import('../pages/Shows/Create'))}/>
      <Route path={`${match.url}actions/create`} component={asyncComponent(() => import('../pages/Actions/Create'))}/>
      <Route path={`${match.url}agenda`} component={asyncComponent(() => import('../pages/Agenda/Agenda'))}/>
      <Route path={`${match.url}partners-and-supports`} component={asyncComponent(() => import('../pages/PartnersSupports/PartnersSupports'))}/>
      <Route path={`${match.url}messages`} component={asyncComponent(() => import('../pages/MailApp/MailApp'))}/>
    </Switch>
  </div>
);

export default App;
