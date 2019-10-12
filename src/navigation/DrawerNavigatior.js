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

import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator,DrawerActions} from 'react-navigation-drawer';


import Sidebar from '../components/Sidebar';

import Login from '../screens/Login/Login';
import Companies from '../screens/ContractorList/Companies';
import Contractors from '../screens/ContractorList/Contractors';
import Qr from '../screens/QrReader';
import ContractorDetail from '../screens/ContractorDetail';
import ContractorCertificates from '../screens/ContractorCertificates';
import IncidentReport from '../screens/Incident/IncidentReport';
import Entry from '../screens/Entry';


const AuthStack = createStackNavigator({Login:Login})

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
    }
  },
  {
    initialRouteName:'Contractors',
  }
)

AppStackNavigator.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

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
    unmountInactiveRoutes: true
  },
);


const RootStack = createStackNavigator(
  {
    EntryStack: { screen: AppStackNavigator },
    MenuStack: { screen: DrawerNavigator },
  },
  {
    headerMode: 'none',
    initialRouteName: 'EntryStack',
  }
)


const AppSwitch = createDrawerNavigator(
  {
    Auth:AuthStack,
    App: RootStack

  },{
    initialRouteName: 'Auth',
    contentComponent: props => <Sidebar {...props} />,
  }
)



AppSwitch.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

export default createAppContainer(AppSwitch);
