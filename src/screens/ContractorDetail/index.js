import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import {Container, Content} from 'native-base';

import FooterToolbar from '../../components/Footer';
import ContractorHeader from '../../components/ContractorHeader';
import CertiHeader from '../../components/Header';
import EntryList from '../../components/EntryList';

import server from '../../libraries/server';
import AsyncStorage from '@react-native-community/async-storage';

export default class ContractorDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      contratista: [],
      email: '',
      head: {
        nombre: '',
        apellido_paterno: '',
        imgUrl: '',
      },
      eventCards: '',
    };
  }

  async componentWillMount() {
    var TokenJWT = await AsyncStorage.getItem('AUTH_TOKEN');
    const email = this.props.navigation.getParam('email');

    let contractor = await server.getContratistaTimeline(TokenJWT, email);

    this.setState({
      contratista: contractor,
      email: email,
      head: {
        nombre: contractor.profile.nombre,
        apellido_paterno: contractor.profile.apellido_paterno,
        imgUrl: contractor.profile.image_profile,
      },
      eventCards: contractor.event_cards,
    });
  }

  render() {
    return (
      <Container>
        <CertiHeader />

        <Content style={styles.main}>
          <ContractorHeader
            nombre={this.state.head.nombre}
            apellido={this.state.head.apellido_paterno}
            imgUrl={this.state.head.imgUrl}
          />
          <View style={styles.cardscontainer}>
            <EntryList
            eventCards={this.state.eventCards}
            email={this.state.email}
            />
          </View>
        </Content>
        <FooterToolbar email={this.state.email} />
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
