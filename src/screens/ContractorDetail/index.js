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
import CertiHeader from '../../components/Header';
import EntryList from '../../components/EntryList';

import server from '../../libraries/server';
import AsyncStorage from '@react-native-community/async-storage';

const ListaEventos = props => {
  console.log('EVENT CARDS', props.eventCards);
  const lista = props.eventCards;
  const entryList = lista.map((item, index) => <ResumeCard key={index} entryDay={item} />);

  return entryList;
};


export default class ContractorDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  })
  
  constructor(props) {
    super(props);
    this.state = {
      eventCards: [],
      profile: null,
      token: null,
      api_url: null,
      head: {
        apellido_materno: 'Uno',
        apellido_paterno: 'Uno',
        email: 'contratista_1@sample.com',
        empresa_contratista: 'EMPRESA1',
        nombre: 'Contratista',
      },
      empleado_seguridad: [],
      contratista:''
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
    console.log("ContractorList",this.props.navigation.state.params)

    var TokenJWT = await AsyncStorage.getItem('AUTH_TOKEN');
    const email_seguridad = await AsyncStorage.getItem('ACCOUNT_ID');
    const api_url = await AsyncStorage.getItem('API_URL');
    this.setState({
      api_url: api_url,
      token: TokenJWT,
      empleado_seguridad: email_seguridad,
    });
    const email = this.props.navigation.state.params.profile.email

    var contractor = await server.server.getContratistaTimeline(
      TokenJWT,
      email
    );

     this.setState({
       contratista: contractor,
       head: {
          nombre: contractor.profile.nombre,
          apellido_paterno: contractor.profile.apellido_paterno,
          imgUrl: contractor.profile.image_profile
        },
      eventCards: contractor.event_cards
    })

  }

  render() {
    return (
      <Container>
        <CertiHeader />

        <Content style={styles.main}>
          <ContractorHeader profile={this.state.profileContractor} />
          <View style={styles.cardscontainer}>
             <ListaEventos eventCards={this.state.eventCards} />
          </View>
        </Content>
         <FooterToolbar
          navegacion={this.props.navigation}
          currentKey={this.props.navigation.state.params.currentKey}
          profile={this.state.profileContractor}
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
