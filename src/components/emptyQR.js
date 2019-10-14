import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';


export default class emptyQR extends Component {

    componentDidMount () {
      this.props.initializeApp()
    }

    componentDidUpdate () {

        this._navigateTo('AuthScreen')

      }
    }

    _navigateTo = (routeName: string) => {
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName })]
      })
      this.props.navigation.dispatch(actionToDispatch)

    //   const resetAction = NavigationActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName })]
    // })
    // this.props.navigation.dispatch(resetAction)
    }

    render(){
      return(<View />)
    }
}
