import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Item,
  Input,
  Icon,
  Card,
  Button,
  Text,
} from 'native-base';

export default ({history}) => (
  <Container style={styles.main}>
    <Container style={styles.roundbackground}>
      <Text style={styles.roundbackground__text}>CertiFast</Text>
    </Container>
    <Content style={styles.maincontent}>
      <Card style={styles.card}>
        <Item style={styles.card__item}>
          <Icon active type="Feather" name="user" />
          <Input placeholder="Username" />
        </Item>
        <Item style={styles.card__item}>
          <Icon type="Feather" active name="lock" />
          <Input placeholder="Password" secureTextEntry={true} />
        </Item>
        <Button
          rounded
          block
          style={styles.card__button}
          onPress={() => history.push('/companies')}>
          <Text>Login</Text>
        </Button>
      </Card>
      <Text style={styles.cardRoute}>www.certifastind.com</Text>
    </Content>
  </Container>
);

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FCFCFC',
    position: 'relative',
  },
  roundbackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 300,
    backgroundColor: '#000',
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    zIndex: 2,
  },
  roundbackground__text: {
    marginTop: 50,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: 32,
  },
  maincontent: {
    padding: 30,
    position: 'absolute',
    top: 100,
    left: 0,
    zIndex: 3,
    width: '100%',
  },
  card: {
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.06,
  },
  card__item: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.06,
  },
  card__button: {
    marginTop: 30,
    backgroundColor: '#D10000',
  },
  cardRoute: {
    width: '100%',
    textAlign: 'right',
    color: '#D10000',
    marginTop: 5,
  },
});
