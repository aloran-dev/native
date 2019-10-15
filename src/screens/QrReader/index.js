/* QR Component */
import React, {Component} from 'react';
import {StyleSheet, Image,View} from 'react-native';
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Header,
  Left,
  Icon,
  Body,
  Title,
} from 'native-base';

import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-community/async-storage';

import Sidebar from '../../components/Sidebar';
import { NavigationEvents } from 'react-navigation';

export default class QrReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeContratista: '',
      action: '',
      email_empleado_seguridad: '',
      token: null,
      api_url: null,
      email_seguridad: null,
      hasCameraPermission:true,
      focusedScreen:false,
      scanner:undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleChange(event) {
    this.setState({contratista: event.target.value});
  }

  async componentDidMount() {
    const { navigation } = this.props;

    console.log("ENTRE QR",navigation);

     navigation.addListener('willFocus', () =>
       this.setState({ focusedScreen: false })
     );

     //Evento cuando haces  un Back
     navigation.addListener('willBlur', () =>
       this.setState({ focusedScreen: true })
     );

    console.log('QR READER', navigation);

    const TokenJWT = await AsyncStorage.getItem('AUTH_TOKEN');
    const api_url = await AsyncStorage.getItem('API_URL');
    const email_seguridad = await AsyncStorage.getItem('ACCOUNT_ID');

    this.setState({
      token: TokenJWT,
      api_url: api_url,
      email_seguridad: email_seguridad,
    });
    console.log(this.props.navigation);
    try  {
      this.setState({
        action: this.props.navigation.state.params.action,
        email_empleado_seguridad: this.state.email_seguridad,
      });
    } catch (error) {
      console.log(error);
    }
  }

  onSuccess = async e => {
    console.log('CODIGO', e.data);
    const navigation = this.props.navigation;
    if (this.state.action == 'INCIDENT') {
      await navigation.navigate('AddIncident', {
        contratistaQR: e.data,
        scanner:this.scanner,
      });
    } else {
     await navigation.navigate('Entry', {
        contratistaQR: e.data,
        scanner:this.scanner,
      });
    }
  };

  handleSend(value) {
    //  console.log("ESTADO",this.state.codeContratist
    if (this.state.codeContratista.length !== 0) {
      console.log('Listo para cambiar de Ventaba');
      if (this.state.action == 'INCIDENT') {
        this.props.navigation.navigate('AddIncident', {
          contratistaQR: this.state.codeContratista,
          scanner:this.scanner,
        });
      } else {
        this.props.navigation.navigate('Entry', {
          contratistaQR: this.state.codeContratista,
          scanner:this.scanner
        });
      }
    } else {
      //  Toast.show({text:"No se ha seleccionado QR",buttonText:"Ok",type:"warning",duration:3000})
      alert('Campos requeridos');
    }
  }

  handleCancel() {
    console.log(this.props.navigation)
    navigation.navigate('AddIncident', {
      contratistaQR: null,
      scanner:this.scanner,
    });
  }


  render() {
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
             <NavigationEvents
                onWillFocus={payload => console.log('will focus', payload)}
                onDidFocus={payload => console.log('did focus', payload)}
                onWillBlur={payload => console.log('will blur', payload)}
                onDidBlur={payload => console.log('did blur', payload)}
              />
               <Text note>Scan Qr code</Text>
               <Container style={styles.qr}>
                 <QRCodeScanner
                   ref={(node) => { this.scanner = node }}
                   style={styles.qr__image}
                   onRead={this.onSuccess}
                   reactivateTimeOut={5000}
                   reactivate={false}
                   containerStyle={{flex: 1, height: 100}}
                 />
               </Container>
               <Text note>Enter code manually</Text>
               <Item style={styles.input}>
                 <Input
                   onChangeText={text => this.setState({codeContratista: text})}
                 />
               </Item>

               <Button
                 rounded
                 block
                 style={styles.button}
                 //onPress={() => this.props.navigation.navigate('AddIncident')}>
                 onPress={this.handleSend}>
                 <Text>Send</Text>
               </Button>

               <Button
                 rounded
                 block
                 transparent
                 style={styles.button1}
                 onPress={()=>{
                   this.props.navigation.navigate('AddIncident', {
                   contratistaQR: null,
                   scanner:this.scanner,
                    });
                  }}>
                 <Text style={styles.button1__text}>Cancel</Text>
               </Button>
             </Content>
           </Container>
         );




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
    overflow: 'hidden',
  },
  qr__image: {
    height: 100,
    width: 100,
    opacity: 0.2,
  },
  input: {
    backgroundColor: '#fff',
    padding: 5,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#D10000',
  },
  button1: {
    marginTop: 10,
  },
  button1__text: {
    color: '#000',
  },
  header: {
    height: 70,
    backgroundColor: '#000',
  },
  header__text: {
    color: '#fff',
  },
});
