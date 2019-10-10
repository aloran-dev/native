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

export default class QrReader extends Component {
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
            //onPress={() => this.props.navigation.navigate('AddIncident')}>
            onPress={() => this.props.navigation.navigate('ContractorDetail')}>
            <Text>Send</Text>
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
  header: {
    height: 70,
    backgroundColor: '#000',
  },
  header__text: {
    color: '#fff',
  },
});
