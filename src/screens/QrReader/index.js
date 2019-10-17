/* QR Component */
import React, {Component} from 'react';
import {StyleSheet, Image,View,TouchableOpacity} from 'react-native';
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
    // this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleSend(value) {
    //  console.log("ESTADO",this.state.codeContratist
    if (this.state.codeContratista.length !== 0) {
      console.log('Listo para cambiar de Ventaba');
      // if (this.state.action == 'ContractorQrDetail') {
      //   this.props.navigation.navigate('AddIncident', {
      //     contratistaQR: this.state.codeContratista,
      //     scanner:this.scanner,
      //   });
      // } else {
        this.props.navigation.navigate('ContractorQrDetail', {
          contratistaQR: this.state.codeContratista,
          scanner:this.scanner
        });
      // }
    } else {
      //  Toast.show({text:"No se ha seleccionado QR",buttonText:"Ok",type:"warning",duration:3000})
      alert('Campos requeridos');
    }
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

               <Text note>Scan Qr code</Text>
               <Container style={styles.qr}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("QRCodeScannerScreen")}>
              <Text styles={{top:20,alignItems: 'center',
              justifyContent: 'center'}}>Press Here for  </Text>
              <Text styles={{alignItems: 'center',
              justifyContent: 'center'}}>Scan QR Code</Text>
               <Image
                  source={{
                    uri: 'https://image.flaticon.com/icons/png/512/107/107072.png',
                  }}
                  style={styles.qr__image}
              />

              </TouchableOpacity>

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
                   this.props.navigation.navigate('Companies')}}>
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
