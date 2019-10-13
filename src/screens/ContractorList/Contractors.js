import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {
  Container,
  Content,
  List,
  Left,
  Body,
  Text,
  Title,
  Button,
  Header,
  Icon,
} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import server from '../../libraries/server';
import ListaItem from '../../components/ContractorListItem';
import CertiHeader from '../../components/Header';

export default class Contractors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractorsData: [],
      contratista: null,
      Token: null,
      api_url: null,
      email_seguridad: null,
      isLoading: true,
    };
  }

  async componentDidMount() {
    var TokenJWT = await AsyncStorage.getItem('AUTH_TOKEN');
    const api_url = await AsyncStorage.getItem('API_URL');
    const email_seguridad = await AsyncStorage.getItem('ACCOUNT_ID');
    var contractorData = await server.getPlantaTimeline(
      TokenJWT,
      email_seguridad,
    );

    const empresa = this.props.navigation.getParam('empresa_contratista');

    var filtrado = contractorData.filter(item => {
      return item.contratista.empresa_contratista === empresa;
    });

    this.setState({
      contractorsData: filtrado,
      Token: TokenJWT,
      api_url: api_url,
      email_seguridad: email_seguridad,
      isLoading: false,
    });
  }

  render() {
    let cont;
    if (this.state.isLoading) {
      cont = <ActivityIndicator animating={this.state.isLoading} />;
    } else {
      cont = <ListaItem contractorsData={this.state.contractorsData} />;
    }
    return (
      <Container style={styles.main}>
        <CertiHeader />
        <Content style={styles.maincontent}>
          <Text note>Contractor Companies</Text>
          <List style={styles.list}>{cont}</List>
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
  list: {
    marginTop: 16,
    backgroundColor: '#fff',
    width: '100%',
    paddingTop: 16,
    paddingBottom: 32,
    borderRadius: 10,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.6,
  },
  header: {
    height: 70,
    backgroundColor: '#000',
  },
  header__text: {
    color: '#fff',
  },
});
