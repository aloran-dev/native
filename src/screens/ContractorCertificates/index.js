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
import CertiHeader from '../../components/Header';
import CertificateRow from '../../components/CertificateRow';
import AntiDoppingRow from '../../components/AntiDoppingRow';

import server from '../../libraries/server';
import AsyncStorage from '@react-native-community/async-storage';

const CertificateList = props => {
  console.log('CERTIFICATE', props.certificateList);
  const lista = props.certificateList;
  const certificateList = lista.map((item, index) => (
    <CertificateRow item={item} key={index} />
  ));
  return certificateList;
};

const AntiDoppingList = props => {
  console.log('CERTIFICATE', props.certificateList);
  const lista = props.certificateList;
  const certificateList = lista.map((item, index) => (
    <AntiDoppingRow item={item} key={index} />
  ));
  return certificateList;
};

export default class ContractorCertificates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contratista: [],
      head: {
        nombre: '',
        apellido_paterno: '',
        imgUrl: '',
      },
      eventCards: '',
      cursos_habilidades_laborales: [],
      antidopings: [],
      isLoading: true,
    };
  }

  async componentWillMount() {
    var TokenJWT = await AsyncStorage.getItem('AUTH_TOKEN');
    const email = this.props.navigation.getParam('email');

    let contractor = await server.getContratistaTimeline(TokenJWT, email);

    this.setState({
      contratista: contractor,
      head: {
        nombre: contractor.profile.nombre,
        apellido_paterno: contractor.profile.apellido_paterno,
        imgUrl: contractor.profile.image_profile,
      },
      eventCards: contractor.event_cards,
      cursos_habilidades_laborales: contractor.cursos_habilidades_laborales,
      antidopings: contractor.antidopings,
      isLoading: false,
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
            <ActivityIndicator animating={this.state.isLoading} />
            <Card style={styles.card}>
              <CertificateList
                certificateList={this.state.cursos_habilidades_laborales}
              />
              <AntiDoppingList certificateList={this.state.antidopings} />
            </Card>
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
});
