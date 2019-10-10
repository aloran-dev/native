import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Sidebar from '../components/Sidebar';

import Login from '../screens/Login/Login';
import Companies from '../screens/ContractorList/Companies';
import Contractors from '../screens/ContractorList/Contractors';
import Qr from '../screens/QrReader';
import ContractorDetail from '../screens/ContractorDetail';
import ContractorCertificates from '../screens/ContractorCertificates';

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
    ContractorCertificates: {
      screen: ContractorCertificates,
    },
  },
  {
    contentComponent: props => <Sidebar {...props} />,
  },
);

export default createAppContainer(DrawerNavigator);
