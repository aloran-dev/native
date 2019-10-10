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
        var contractorData = await server.getPlantaTimeline(
          userToken,
          email_seguridad,
        );
        if (contractorData[0] === 'Invalid token. Signature has expired') {
          AsyncStorage.clear();
          console.log('neeeeeel DOGO');
        } else {
          this.props.navigation.navigate('Companies');
        }
      } else {
        AsyncStorage.clear();
        console.log('neeeeeel DOGO x2');
      }
    } catch (error) {
      AsyncStorage.clear();
      console.log('neeeeeel DOGO x3');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <DrawerNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
