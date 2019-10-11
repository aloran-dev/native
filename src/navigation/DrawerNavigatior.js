import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer';


import Sidebar from '../components/Sidebar';

import Login from '../screens/Login/Login';
import Companies from '../screens/ContractorList/Companies';
import Contractors from '../screens/ContractorList/Contractors';
import Qr from '../screens/QrReader';
import ContractorDetail from '../screens/ContractorDetail';
import ContractorCertificates from '../screens/ContractorCertificates';
import IncidentReport from '../screens/Incident/IncidentReport';
import Entry from '../screens/Entry';

const DrawerNavigator = createDrawerNavigator(
  {
    Login: {
      screen: Login,
    },
    Companies: {
      screen: Companies,
    },
    Contractors: {
      screen: Contractors,
    },
    Qr: {
      screen: Qr,
    },
    ContractorDetail: {
      screen: ContractorDetail,
    },
    AddIncident: {
      screen: IncidentReport,
    },
    Entry: {
      screen: Entry,
    },
    ContractorCertificates: {
      screen: ContractorCertificates,
    },
  },
  {
    contentComponent: props => <Sidebar {...props} />,
    unmountInactiveRoutes: true,
  },
);

const AuthStack = createStackNavigator({Login:Login})
const AppSwitch = createSwitchNavigator(
  {
    Auth:AuthStack,
    App:DrawerNavigator
  },{
    initialRouteName: 'Auth'
  }
)
export default createAppContainer(AppSwitch);
