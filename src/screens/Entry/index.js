import React,{Component} from 'react';
import { Button, View, Text,Alert,ActivityIndicator } from 'react-native';
import { StackActions, DrawerActions } from 'react-navigation';

import server from '../../libraries/server';
import AsyncStorage from '@react-native-community/async-storage';


export default class Entry extends Component {
  constructor(props){
    super(props);
    this.state={
      email_contratista:null,
      email_empleado_seguridad:null,
      //planta: "PLANTA1",
      planta_area: "Taller",
      invalidCode:false,
      isLoading:false
    }
    this.handleSend = this.handleSend.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
    this.navigationWithPush = this.navigationWithPush.bind(this);
  }



  async componentDidMount(){
    console.log("Entre a Entry",this.props.navigation)

    //var TokenJWT = await server.login();
    var TokenJWT = await AsyncStorage.getItem('AUTH_TOKEN');
    const api_url = await AsyncStorage.getItem('API_URL')
    const email_seguridad = await AsyncStorage.getItem('ACCOUNT_ID')
    console.log("Descargardo Datos",TokenJWT,"API",api_url)
    console.log(this.props.navigation.state.params.contratistaQR);

    var codeQr = this.props.navigation.state.params.contratistaQR;
     if(codeQr !== ''){
        // console.log("Descargardo Datos",TokenJWT,codeQr)
         const value = codeQr.replace(/\s/g,'');

         //const infoContratista = await
         server.getContratistaInfoByNanoId(TokenJWT,codeQr)
         .then((response=>{
           console.log("Validando QR",response);
             this.setState(
               {
                 token:TokenJWT,
                 email_contratista:response.email,
                 email_empleado_seguridad:this.props.navigation.state.params.email_empleado_seguridad
               })

         }))
         .catch((error)=>{
           console.log("Error en el QR",error)
           this.setState(
             {
             token:TokenJWT,
             //email_contratista:infoContratista[0].email,
             //email_empleado_seguridad:this.props.navigation.state.params.email_empleado_seguridad
             invalidCode:true
           })
         })


    }
}

  handleSend = async () =>{
      this.setState({isLoading:true})
      const newEntry = {
        email_contratista:this.state.email_contratista,
        email_empleado_seguridad:this.state.email_empleado_seguridad,
    //    planta: this.state.planta,
        planta_area: this.state.planta_area
      };
      console.log("DAtos Entry",JSON.stringify(newEntry));


    server.add_checkIn(this.state.token,newEntry)
      .then((response)=>{
        console.log("CHECKIN",response)
        Alert.alert(
          'CheckIn Confirmation',
          JSON.stringify(response),
          [
          //  {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {text: 'Yes', onPress: ()=>this.props.navigation.navigate('ContractorList')},
          ],
          { cancelable: false }
        )
        //this.props.navigation.navigate('App');
        //this.navigationWithPush('ContractorList');
      })
      .catch((error)=>{
        console.log(error);
        this.props.navigation.navigate('App');
      })


    }

    handleCheckOut = async () =>{
          this.setState({isLoading:true})
        const newEntry = {
          email_contratista:this.state.email_contratista,
          email_empleado_seguridad:this.state.email_empleado_seguridad,
          planta_area: this.state.planta_area
        };

        console.log("DAtos Entry",JSON.stringify(newEntry));

      server.add_checkout(this.state.token,newEntry)
        .then((response)=>{

          Alert.alert(
            'CheckOut Confirmation',
            JSON.stringify(response),
            [
              //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'Ok', onPress: ()=>this.props.navigation.navigate('ContractorList')},
            ],
            { cancelable: false }
          )


//          this.props.navigation.navigate('App');
          //this.navigationWithPush('ContractorList');
        })
        .catch((error)=>{
          console.log(error);
          //this.props.navigation.navigate('App');
          this.navigationWithPush('ContractorList');
        })


      }


  render() {

    if(this.state.invalidCode){
      return (
        <View>
          <Text>Codigo invalido</Text>
          <Button title="regresar"
          onPress={()=>{this.props.navigation.navigate('ContractorList')}}
          >

          </Button>

        </View>
      )
    }else{
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          <Button
            title="Add Check-In"
            onPress={this.handleSend}
          />
          <View style={{heigth:50,top:40}} />
          <Button
            title="Add CheckOut"
            onPress={this.handleCheckOut}
          />
          <ActivityIndicator animating={this.state.isLoading} />
        </View>
      )
    }

  }

  getCurrentRouteName() {
    let routes = this.props.navigation.state.routes;
    let route = routes[routes.length - 1].routes;
    if (route.length > 0) {
      return route[route.length - 1].routeName;
    }
    return null;
  }

  navigationWithPush = (routeName, params) => {

   let currentRoute;
    /**
    **  get route of current screen from the navigation props
    **/
   if (Object.keys(this.props.navigation.state).length > 0 &&
       this.props.navigation.state.routes != undefined) {
            currentRoute = this.getCurrentRouteName();
   }

  /**
  ** if current route is the routeName itself then just close the drawer, else
  ** push routeName to navigation state by dispatching the StackActions
  **/

   if (currentRoute === routeName) {
          this.props.navigation.dispatch(DrawerActions.closeDrawer());
     } else {
          const pushAction = StackActions.push({
            routeName: routeName,
            params: params
     });
          this.props.navigation.dispatch(pushAction);
    }
  }
}
