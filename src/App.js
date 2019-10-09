import React, {Component} from 'react';
//import {NativeRouter, Switch, Route} from 'react-router-native';
import { Button, View, Text,ActivityIndicator,StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  createAppContainer,
//  DrawerNavigator,
  createSwitchNavigator
  }
  from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Login from './screens/Login/Login';
//import ContractorList from './screens/Contractors';
import ContractorList from './screens/ContractorList/Contractors';
import QRCodeScreen from './screens/QrReader';
import ContractorCertificates from './screens/ContractorCertificates';

//import Incident from './screens/Incident';
// import QRCodeScreen from './screens/QRCodeScreen';
import ContractorDetail from './screens/ContractorDetail';
import ContractorLogDetail from './screens/ContractorLogDetail/Resume';
// import ContractorCertificates from './screens/ContractorCertificates';

import SideBar from './components/Sidebar'
//import HomeScreen from './screens/Home';
import Entry from './screens/Entry'
//import ContractorsAddIncident from './screens/Incident/ContractorsAddIncident';
// import Login from './screens/Login';
// import ContractorList from './screens/ContractorList';
import server from './libraries/server'

class AuthLoadingScreen extends Component{
    constructor(props){
      super();
      this._bootstrapAsync();
      this.state = {
        signedIn:false,
        checkedSignIn:false
      }
    }

    // componentDidMount(){
    //   isSignedIn()
    //     .then(res=>this.setState({signedIn:res,checkedSignIn:true}))
    //     .catch(()=> alert("An error occurred"))
    // }

    _bootstrapAsync = async () =>{
      try{
        const userToken = await AsyncStorage.getItem('AUTH_TOKEN')
        const email_seguridad = await AsyncStorage.getItem('ACCOUNT_ID')
        console.log("Session",email_seguridad)
        if(userToken != null && email_seguridad !=null ){
            var contractorData = await server.getPlantaTimeline(userToken,email_seguridad);
            if(contractorData[0] =='Invalid token. Signature has expired'){
                AsyncStorage.clear()
                this.props.navigation.navigate('Auth')

              }else{
                this.props.navigation.navigate('App')
              }
        }else{
          AsyncStorage.clear()
          this.props.navigation.navigate('Auth');
        }

      }catch(error){
        console.log(error);
        AsyncStorage.clear()
        this.props.navigation.navigate('Auth');
      }

    }

    render(){
      return(
        <View>
            <ActivityIndicator />
            <StatusBar />
        </View>
      );
    }
}


const DrawerApp = createDrawerNavigator({

      ContractorList: {
        screen: ContractorList,
        navigationOptions:{
          title:"Contractors in the plant"
        }
      },

      // Incident: {
      //   screen: QRCodeScreen,
      //   navigationOptions:{
      //     title:"Report an Incident",
      //     headerBackTitle:'Atras',
      //   },
      //   initialRouteParams:{
      //     nombre:"Edhgard",
      //     email:"emoron@gmail.com"
      //   }
      // },
      // AddIncident: {
      //   screen: Incident,
      //   navigationOptions:{
      //     title:"Report an Incident",
      //     headerBackTitle:'Atras',
      //   },
      //   initialRouteParams:{
      //     nombre:"Edhgard",
      //     email:"emoron@gmail.com"
      //   }
      // },
      Check: {
        screen: QRCodeScreen,
        navigationOptions:{
          title:"Contractor Entry and Exit",
          headerBackTitle:'Atrás',
        }
      },
      Entry: {
        screen: Entry,
        navigationOptions:{
          title:"Help",
          headerBackTitle:'Atrás',
        }
      },
      // Logout: {
      //   screen: Summary,
      //   navigationOptions:{
      //     title:"Logout",
      //     headerBackTitle:'Atrás',
      //   }
      // },
      // Settings: {
      //   screen: Summary,
      //   navigationOptions:{
      //     title:"Settings",
      //     headerBackTitle:'Atrás',
      //   }
      // },
      // Help: {
      //   screen: Summary,
      //   navigationOptions:{
      //     title:"Help",
      //     headerBackTitle:'Atrás',
      //   }
      // },
      ContractorDetail: {
        screen: ContractorDetail,
        navigationOptions:{
          title:"Contractor Detail"
        }
      },
      ContractorLogDetail: {
        screen: ContractorLogDetail,
        navigationOptions:{
          title:"Certifast"
        }
      },
      ContractorCertificates: {
        screen: ContractorCertificates,
        navigationOptions:{
          title:"Certificates Contractor",
        }
      }

  }
  ,{
  initialRouteName:'ContractorList',
  navigationOptions:{
    title:'Certifast'
  },
 // contentComponent:props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator({
  // Home: {
  //   screen: HomeScreen,
  //   path:'/home',
  //   navigationOptions:{
  //     title:"Certifast"
  //   }
  // },
  ContractorList: {
    screen: ContractorList,
    navigationOptions:{
      title:"Certifast"
    }
  },
  ContractorDetail: {
    screen: ContractorDetail,
    navigationOptions:{
      title:"Contractor Detail"
    }
  },
  ContractorLogDetail: {
    screen: ContractorLogDetail,
    navigationOptions:{
      title:"Certifast"
    }
  },
  ContractorCertificates: {
    screen: ContractorCertificates,
    navigationOptions:{
      title:"Certificates Contractor",
    }
  },
  App: {
    screen: DrawerApp,
  },
  Login: {
    screen: Login,
    navigationOptions:{
      title:"Captura Informacion",
      headerBackTitle:'Atras',
    }
  }
  },{
     initialRouteName:'ContractorList',
     navigationOptions:{
       title:'Certifast'
     },
     initialRouteKey:'ContractorList',
     initialRouteParams:{
       nombre:"Edhgard",
       email:"emoron@gmail.com"
     }

   });
const AuthStack = createStackNavigator({Login:Login})
const AppSwitch = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Auth:AuthStack,
        App:DrawerApp
    },
    {
      initialRouteName:'AuthLoading'
    }
);



export default createAppContainer(AppSwitch);

// export default class App extends Component {
//   render() {
//     return (
//       <NativeRouter>
//         <Switch>
//           <Route exact path="/" component={Login} />
//           <Route exact path="/ContractorList" component={ContractorList} />
//           <Route exact path="/QrReader" component={QrReader} />
//           <Route exact path="/ContractorCertificates" component={ContractorCertificates} />
//         </Switch>
//       </NativeRouter>
//     );
//   }
// }
