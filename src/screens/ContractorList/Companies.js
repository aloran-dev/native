import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
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
  Icon,
  Header,
  Button,
} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import server from '../../libraries/server';
import CompaniesListItem from '../../components/CompaniesListItem';

export default class Companies extends Component {
  constructor(props) {
    super();

    this.state = {
      empresas: [],
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

    this.setState({
      Token: TokenJWT,
      api_url: api_url,
      email_seguridad: email_seguridad,
      isLoading: false,
    });

    let contractorData = await server.getPlantaTimeline(
      TokenJWT,
      email_seguridad,
    );

    console.log("Timeline",contractorData)


    this.setState({empresas: contractorData});
  }

  render() {
    var callback = res => {
      this.props.navigation.navigate('Contractors', {
        empresa_contratista: res.empresa_contratista,
      });
    };

    let companies;
    if (this.state.isLoading) {
      companies = <ActivityIndicator animating={this.state.isLoading} />;
    } else {
      companies = (
        <CompaniesListItem
          contractorsData={this.state.empresas}
          callback={callback}
        />
      );
    }
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
        <Content style={styles.maincontent}>
          <Text note>Companies in Plant</Text>
          <List style={styles.list}>{companies}</List>
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
