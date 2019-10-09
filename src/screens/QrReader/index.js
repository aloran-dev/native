/* QR Component */
import React,{Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Drawer,
} from 'native-base';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default class QrReader extends Component{
  render(){
    return (
      <Drawer>
        <Container style={styles.main}>
          <Header title="CertiFast" />
          <Content button style={styles.maincontent}>
            <Text note>Companie contractors</Text>
            <Container style={styles.qr}>
              <Image
                source={{
                  uri: 'https://image.flaticon.com/icons/png/512/107/107072.png',
                }}
                style={styles.qr__image}
              />
            </Container>
            <Text note>Companie contractors</Text>
            <Item style={styles.input}>
              <Input />
            </Item>
            <Button
              rounded
              block
              style={styles.button}
              onPress={() => this.props.navigation.navigate('AddIncident')}>
              <Text>Send</Text>
            </Button>
          </Content>
        </Container>
      </Drawer>
    )
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
});
