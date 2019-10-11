/* QR Component */
import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
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

export default class QrReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeContratista: '',
      action: null,
      email_empleado_seguridad: '',
      token: null,
      api_url: null,
      email_seguridad: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleChange(event) {
    this.setState({contratista: event.target.value});
  }

  async componentDidMount() {
    console.log('QR READER', this.props.navigate);
    const TokenJWT = await AsyncStorage.getItem('AUTH_TOKEN');
    const api_url = await AsyncStorage.getItem('API_URL');
    const email_seguridad = await AsyncStorage.getItem('ACCOUNT_ID');
    this.setState({
      token: TokenJWT,
      api_url: api_url,
      email_seguridad: email_seguridad,
    });
    console.log(this.props.navigation);
    this.setState({
      action: this.props.navigation.state.params.action,
      email_empleado_seguridad: this.state.email_seguridad,
    });
  }

  onSuccess = e => {
    console.log('CODIGO', e.data);

    //  this.setState({codeContratista:e.data});
    //this.handleSend(e.data)
    if (this.state.action == 'INCIDENT') {
      this.props.navigation.navigate('AddIncident', {
        contratistaQR: e.data,
        name: 'Test',
        email_empleado_seguridad: this.state.email_empleado_seguridad,
      });
    } else {
      this.props.navigation.navigate('Entry', {
        contratistaQR: e.data,
        email_empleado_seguridad: this.state.email_empleado_seguridad,
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
          email_empleado_seguridad: this.state.email_empleado_seguridad,
        });
      } else {
        this.props.navigation.navigate('Entry', {
          contratistaQR: this.state.codeContratista,
          email_empleado_seguridad: this.state.email_empleado_seguridad,
        });
      }
    } else {
      //  Toast.show({text:"No se ha seleccionado QR",buttonText:"Ok",type:"warning",duration:3000})
      alert('Campos requeridos');
    }
  }

  //  <Image
  //   source={{
  //     uri: 'https://image.flaticon.com/icons/png/512/107/107072.png',
  //   }}
  // />
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
            <QRCodeScanner
              style={styles.qr__image}
              onRead={this.onSuccess}
              reactivateTimeOut={5000}
              reactivate={true}
              containerStyle={{flex: 1, height: 100}}
            />
          </Container>
          <Text note>Enter code manually</Text>
          <Item style={styles.input}>
            <Input />
          </Item>

          <Button
            rounded
            block
            style={styles.button}
            //onPress={() => this.props.navigation.navigate('AddIncident')}>
            onPress={() => this.props.navigation.navigate('ContractorDetail')}>
            <Text>Send</Text>
          </Button>

          <Button
            rounded
            block
            transparent
            style={styles.button1}
            //onPress={() => this.props.navigation.navigate('AddIncident')}>
            onPress={() => this.props.navigation.navigate('Contractors')}>
            <Text style={styles.button1__text}>Cancell</Text>
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
