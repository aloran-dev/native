import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Thumbnail,
  Text,
  Title,
  Button,
  Header,
  Icon,
} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import server from '../../libraries/server';

const ListaItem = props => {
  console.log("AQUI",props);
  const lista = props.contractorsData;
  const api_url = props.api_url;
  const navegation = props.mynavigation;
  const listaElementos = lista.map((item, index) => (
    <TouchableOpacity key={index}
    onPress={() => {
       props.mynavegation.navigate('ContractorDetail', {
         profile: item.contratista.email,
         //empleado_seguridad:this.state.email_seguridad,
         //date_events: item.date_events,
         currentKey: index,
       });
     }}
    >
      <ListItem thumbnail key={index}>
        <Left>
          <Thumbnail
            source={{
              uri: `https://certifast.linuxopensource.mx/api/v0/uploads/${
                item.contratista.image_avatar
              }`,
            }}
          />
        </Left>
        <Body>
          <Text note>{item.contratista.empresa_contratista}</Text>
          <Text>
            {item.contratista.nombre + ' ' + item.contratista.apellido_paterno}
          </Text>
        </Body>
      </ListItem>
    </TouchableOpacity>
  ));

  return listaElementos;
};

class HeaderNavigationBar extends Component {
    render() {
       console.log("Mi Header",this.props)
        return (<Header style={styles.header}>
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
        </Header>);
    }
}

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
    console.log('NAVIGATION', this.props.navigation);

    var TokenJWT = await AsyncStorage.getItem('AUTH_TOKEN');
    const api_url = await AsyncStorage.getItem('API_URL');
    const email_seguridad = await AsyncStorage.getItem('ACCOUNT_ID');
    console.log('Descargardo Datos', TokenJWT, 'API', api_url);
    //this.props.navigation.state.params.empleado_seguridad
    var contractorData = await server.getPlantaTimeline(
      TokenJWT,
      email_seguridad,
    );
    console.log(contractorData);

    this.setState({
      contractorsData: contractorData,
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
      cont = (
        <ListaItem
          contractorsData={this.state.contractorsData}
          api_url={this.state.api_url}
          mynavegation = {this.props.navigation}
        />
      );
    }
    return (
      <Container style={styles.main}>
        < HeaderNavigationBar {...this.props} />
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
