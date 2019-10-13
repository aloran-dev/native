import React from 'react';
import {
  Container,
  Content,
  Icon,
  Card,
  Text,
  H1,
  Thumbnail,
  Body,
  Title,
  Button,
  Header,
  Left,
} from 'native-base';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';

import Sidebar from '../components/Sidebar';

import Login from '../screens/Login/Login';
import Companies from '../screens/ContractorList/Companies';
import Contractors from '../screens/ContractorList/Contractors';
import Qr from '../screens/QrReader';
import ContractorDetail from '../screens/ContractorDetail';
import ContractorCertificates from '../screens/ContractorCertificates';
import ContractorLogDetail from '../screens/ContractorLogDetail'
import IncidentReport from '../screens/Incident/IncidentReport';
import Entry from '../screens/Entry';

const AuthStack = createStackNavigator(
    {Login: Login},{
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

AuthStack.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};
const AppStackNavigator = createStackNavigator(
  {
    Companies: {
      screen: Companies,
    },
    Contractors: {
      screen: Contractors,
    },
    ContractorCertificates: {
      screen: ContractorCertificates,
    },
    ContractorDetail: {
      screen: ContractorDetail,
    },
    ContractorLogDetail:{
      screen: ContractorLogDetail
    }
  },
  {
    initialRouteName: 'Contractors',
    headerMode: 'none',
    navigationOptions: {
     headerVisible: false,
   },

  },
);


const DrawerNavigator = createDrawerNavigator(
  {
    Qr: {
      screen: Qr,
    },

    AddIncident: {
      screen: IncidentReport,
    },
    Entry: {
      screen: Entry,
    },
  },
  {
    contentComponent: props => <Sidebar {...props} />,
    unmountInactiveRoutes: true,
  },
);

const RootStack = createDrawerNavigator(
  {
    EntryStack: {screen: AppStackNavigator},
    MenuStack: {screen: DrawerNavigator},
  },
  {
    headerMode: 'none',
    initialRouteName: 'EntryStack',
    contentComponent: props => <Sidebar {...props} />,
  },
);

const AppSwitch = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: RootStack,
  },
  {
    initialRouteName: 'Auth',
  //
  },
);

AppSwitch.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

export default createAppContainer(AppSwitch);
