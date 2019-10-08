import React, {Component} from 'react';
import {NativeRouter, Switch, Route} from 'react-router-native';

import Login from './screens/Login';
import Companies from './screens/Companies';
import Contractors from './screens/Contractors';
import Qr from './screens/Qr';
import Resume from './screens/Resume';
import Certificates from './screens/Certificates';

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/companies" component={Companies} />
          <Route exact path="/contractors" component={Contractors} />
          <Route exact path="/qr" component={Qr} />
          <Route exact path="/resume" component={Resume} />
          <Route exact path="/certificates" component={Certificates} />
        </Switch>
      </NativeRouter>
    );
  }
}
