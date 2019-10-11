import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Thumbnail,
  Body,
} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      apellido: '',
      imgUrl: '',
    };
  }

  async componentWillMount() {
    const value = await AsyncStorage.getItem('ACCOUNT');

    let data = JSON.parse(value);

    this.setState({
      nombre: data.nombre,
      apellido: data.apellido_paterno,
      imgUrl: data.image_avatar,
    });
  }

  render() {
    return (
      <Container>
        <Content bounces={false} style={styles.content}>
          <List style={styles.list}>
            <ListItem thumbnail style={styles.listavatar}>
              <Left>
                <Thumbnail
                  source={{
                    uri: `https://certifast.linuxopensource.mx/api/v0/uploads/${
                      this.state.imgUrl
                    }`,
                  }}
                />
              </Left>
              <Body>
                <Text style={styles.white}>{this.state.nombre}</Text>
                <Text note style={styles.white}>
                  {this.state.apellido}
                </Text>
              </Body>
            </ListItem>
            <ListItem
              button
              noBorder
              style={styles.listitem}
              onPress={() => this.props.navigation.navigate('Contractors')}>
              <Left>
                <Icon
                  type="Feather"
                  active
                  name="briefcase"
                  style={styles.icon}
                />
                <Text>Contractors in plant</Text>
              </Left>
            </ListItem>
            <ListItem
              button
              noBorder
              style={styles.listitem}
              onPress={() =>
                this.props.navigation.navigate('Qr', {action: 'CHECKIN'})
              }>
              <Left>
                <Icon type="Feather" active name="clock" style={styles.icon} />
                <Text>Contractor entry and exit</Text>
              </Left>
            </ListItem>
            <ListItem
              button
              noBorder
              style={styles.listitem}
              onPress={() =>
                this.props.navigation.navigate('Qr', {action: 'INCIDENT'})
              }>
              <Left>
                <Icon
                  type="Feather"
                  active
                  name="alert-triangle"
                  style={styles.icon}
                />
                <Text>Report an incident</Text>
              </Left>
            </ListItem>
            <ListItem
              button
              noBorder
              style={styles.listitem}
              onPress={() => {
                AsyncStorage.clear();
                this.props.navigation.navigate('Login');
              }}>
              <Left>
                <Icon
                  type="Feather"
                  active
                  name="log-out"
                  style={styles.icon}
                />
                <Text>Logout</Text>
              </Left>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fff',
    position: 'relative',
    flex: 1,
    top: 0,
    marginLeft: -18,
  },
  list: {
    width: '100%',
  },
  listitem: {
    padding: 20,
  },
  listavatar: {
    padding: 20,
    backgroundColor: '#000',
  },
  white: {
    color: '#fff',
  },
  icon: {
    color: '#777',
    fontSize: 26,
    width: 30,
    marginRight: 24,
  },
});
