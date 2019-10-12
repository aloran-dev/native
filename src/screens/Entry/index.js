/* QR Component */
import React,{Component} from 'react';
import {StyleSheet, Image, Alert, ActivityIndicator} from 'react-native';
import {
  Container,
  Content,
  Text,
 Icon,
  Item,
  Input,
  Body,
   Title,
   Button,
   Header,
   Left

} from 'native-base';


import server from '../../libraries/server';
import AsyncStorage from '@react-native-community/async-storage';


import Sidebar from '../../components/Sidebar';
//import Header from '../../components/Header';

export default class Entry extends Component{

  constructor(props){
    super(props);
    this.state={
      email_contratista:null,
      email_empleado_seguridad:null,
      planta_area: "Taller",
      invalidCode:false,
      isLoading:false,
      image_contractor:{uri:'https://image.flaticon.com/icons/png/512/107/107072.png'}
    }

    this.handleCheckIn = this.handleCheckIn.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);

  }



  async componentDidMount(){
    console.log("Entre a Entry",this.props.navigation)

    //var TokenJWT = await server.login();
    var TokenJWT = await AsyncStorage.getItem('AUTH_TOKEN');
    const api_url = await AsyncStorage.getItem('API_URL')
    const email_seguridad = await AsyncStorage.getItem('ACCOUNT_ID')

    this.setState(
      {
        token:TokenJWT,
        email_empleado_seguridad:this.props.navigation.state.params.email_empleado_seguridad
      })

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
            const image_url =`${api_url}/api/v0/uploads/${response.image_profile}`
            console.log(image_url);

            this.setState(
               {
                 email_contratista:response.email,
                 image_contractor:{uri:image_url}
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

  handleCheckIn = async () =>{
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
        const message = JSON.stringify(response)
        try{
          const message = `OperationID:${response.transactionId}`
        }
        catch(error){
          console.log(error)
        }
        Alert.alert(
          'CheckIn Confirmation',
          message,
          [
          //  {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {text: 'Yes', onPress: ()=>this.props.navigation.navigate('Contractors')},
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
          console.log("FUNCIONA",Object.keys(response))
          let message = JSON.stringify(response)
          try{

             message = `OperationID:${response['transactionId']}`
          }
          catch(error){
            console.log(error)
          }

          Alert.alert(
            'CheckOut Confirmation',
            message,
            [
              //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'Ok', onPress: ()=>this.props.navigation.navigate('Contractors')},
            ],
            { cancelable: false }
          )

        })
        .catch((error)=>{
          console.log(error);
          this.props.navigation.navigate('Contractors');

        })


      }



  render(){

    if(this.state.invalidCode){
      return (
          <Container style={styles.main}>
          <Header style={styles.header}>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={styles.header__text} name="menu" />
              </Button>
            </Left>
            <Body>
              <Title style={styles.header__text}>CertiFast</Title>
            </Body>
          </Header>
            <Content button style={styles.maincontent}>
              <Text note>Invalid QR Code</Text>
              <Button
                rounded
                block
                style={styles.button}
                onPress={()=>{this.props.navigation.navigate('Contractors')}}
              >
              <Text>Back</Text>
              </Button>
            </Content>
          </Container>

      )
    }else{
      return (
        <Container style={styles.main}>
        <Header style={styles.header}>
           <Left>
             <Button
               transparent
               onPress={() => this.props.navigation.openDrawer()}>
               <Icon style={styles.header__text} name="menu" />
             </Button>
           </Left>
           <Body>
             <Title style={styles.header__text}>CertiFast</Title>
           </Body>
         </Header>
          <Content button style={styles.maincontent}>
            <Text note>Companies contractors</Text>
            <Container style={styles.qr}>
            <ActivityIndicator animating={this.state.isLoading} />
            <Image
             source={this.state.image_contractor}
             style={styles.qr__image}
           />
            </Container>
            <Button
              rounded
              block
              style={styles.button}
              onPress={this.handleCheckIn}>
              <Text>CheckIN</Text>
            </Button>

            <Button
              rounded
              block
              style={styles.button}
              onPress={this.handleCheckOut}>
              <Text>CheckOut</Text>
            </Button>
          </Content>
        </Container>

    )
    }
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FCFCFC',
  },
  maincontent: {
    margin: 25,
  },
  qr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 10,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.6,
    overflow:'hidden'
  },
  qr__image: {
    height: 250,
    width: 200,
    //opacity: 0.2,
  },
  input: {
    backgroundColor: '#fff',
    padding: 5,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#D10000',
  },
  header: {
   height: 70,
   backgroundColor: '#000',
 },
 header__text: {
   color: '#fff',
 }

});
