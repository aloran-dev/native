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

const ListaEventos = props => {
  console.log('EVENT CARDS', props.eventCards);
  const lista = props.eventCards;
  const entryList = lista.map((item, index) => <ResumeCard entryDay={item} />);

  return entryList;
};

export default class ContractorDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventCards: [],
      profile: null,
      token: null,
      api_url: null,
      profileContractor: {
        apellido_materno: 'Uno',
        apellido_paterno: 'Uno',
        celular: '4431236875',
        email: 'contratista_1@sample.com',
        empresa_contratista: 'EMPRESA1',
        image_avatar: 'image_avatar_6bNT_m.jpg',
        image_profile: 'image_profile_6bNT_m.jpg',
        nombre: 'Contratista',
        ocupacion_cno: 'Procesos industriales',
        puesto: 'Soldador',
      },
    };
  }

  addKeys = lista => {
    let newList = [];
    lista.forEach(function(item, index) {
      item.key = `${index}`;
      newList.push(item);
    });
    console.log(newList);
    return newList;
  };

  async componentDidMount() {
    // console.log(this.props.navigation.state.params);
    //var TokenJWT = await server.login();
    //console.log("Descargardo Datos",this.props.codeQr)
    var TokenJWT = await AsyncStorage.getItem('AUTH_TOKEN');
    const api_url = await AsyncStorage.getItem('API_URL');
    const email_seguridad = await AsyncStorage.getItem('ACCOUNT_ID');
    // console.log("Descargardo Datos",TokenJWT,"API",api_url)
    const itemContractor = this.props.navigation.state.params.keyValue;;
    var certificateContractorData = await server.getPlantaTimeline(
      TokenJWT,
      email_seguridad,
    );
    console.log('Detalles del Contractor', certificateContractorData);
    // console.log("PERFIL",certificateContractorData[itemContractor].contratista)
    const constructorEventCards =
      certificateContractorData[itemContractor].date_events;
    this.setState({
      api_url: api_url,
      eventCards: this.addKeys(constructorEventCards),
      // profile: this.props.navigation.state.params.emailContractor,
      profileContractor: certificateContractorData[itemContractor].contratista,
      token: TokenJWT,
      empleado_seguridad: email_seguridad,
    });
  }

  render() {
    console.log('ENTRE  A LIST', this.props.navigation.state.params);
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
          <ContractorHeader
            profile={this.state.profileContractor}
            api_url={this.state.api_url}
          />
          <View style={styles.cardscontainer}>
            <ListaEventos eventCards={this.state.eventCards} />
          </View>
        </Content>
        <FooterToolbar
          navegacion={this.props.navigation}
          currentKey={this.props.navigation.state.params.keyValue}
          profile={this.state.profile}
        />
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
