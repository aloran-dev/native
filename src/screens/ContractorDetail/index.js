import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {
  Container,
  Content,
  Icon,
  Card,
  Text,
  H1,
  Thumbnail,
  Body,
  Title,
  Button,
  Header,
  Left,
} from 'native-base';

import FooterToolbar from '../../components/Footer';
import ContractorHeader from '../../components/ContractorHeader';
import ResumeCard from '../../components/ResumeCard';

import server from '../../libraries/server';
import AsyncStorage from '@react-native-community/async-storage';

export default class ContractorDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empleado_seguridad: [],
    };
  }

  async componentDidMount() {
    var TokenJWT = await AsyncStorage.getItem('AUTH_TOKEN');
    const email_seguridad = await AsyncStorage.getItem('ACCOUNT_ID');

    var contractor = await server.getSecurityProfile(TokenJWT, email_seguridad);

    this.setState({
      empleado_seguridad: contractor,
    });
  }

  render() {
    return (
      <Container>
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

        <Content style={styles.main}>
          <ContractorHeader profile={this.state.empleado_seguridad} />
          <View style={styles.cardscontainer}>
            {/* <ListaEventos eventCards={this.state.eventCards} /> */}
          </View>
        </Content>
        {/* <FooterToolbar
          navegacion={this.props.navigation}
          currentKey={this.props.navigation.state.params.currentKey}
          profile={this.state.empleado_seguridad}
        /> */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FCFCFC',
    position: 'relative',
  },
  cardscontainer: {
    padding: 30,
    flex: 1,
    marginTop: -100,
  },
  header: {
    height: 70,
    backgroundColor: '#000',
  },
  header__text: {
    color: '#fff',
  },
});
