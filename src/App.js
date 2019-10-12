import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import server from './libraries/server';
import DrawerNavigator from './navigation/DrawerNavigatior';

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super();
    this._bootstrapAsync();
    this.state = {
      signedIn: false,
      checkedSignIn: false,
      profile:null
    };
  }

  // componentDidMount(){
  //   isSignedIn()
  //     .then(res=>this.setState({signedIn:res,checkedSignIn:true}))
  //     .catch(()=> alert("An error occurred"))
  // }

  _bootstrapAsync = async () => {
    try {
      const userToken = await AsyncStorage.getItem('AUTH_TOKEN');
      const email_seguridad = await AsyncStorage.getItem('ACCOUNT_ID');

      if (userToken != null && email_seguridad != null) {
        var contractorData = await server.getPlantaTimeline(userToken, email_seguridad);

        if (contractorData[0] === 'Invalid token. Signature has expired') {
          AsyncStorage.clear();
          console.log('neeeeeel DOGO Token Vencido');
        } else {
          //SI HAY TOKEN Y SI ES BUENO
          //
          const profile_seguridad = await server.getSecurityProfile(userToken,email_seguridad)
          this.setState({profile:profile_seguridad})
          //this.props.navigation.navigate('Companies');
        }
      } else {
        //Cuando La llave esta en el AsyncStorage y no se eliimino correctamente
        AsyncStorage.clear();
        console.log('neeeeeel DOGO x2, encontre la llave pero no se limpio el AsyncStorage');
      }
    } catch (error) {
      AsyncStorage.clear();
      console.log('neeeeeel DOGO x3 No encontre Token, hay que logear de nuevo');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <DrawerNavigator profile={this.state.profile}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
