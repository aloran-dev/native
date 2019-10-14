import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
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
  Card,
  H1,
} from 'native-base';

import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import ContractorHeader from '../../components/ContractorHeader';
import ResumeCard from '../../components/ResumeCard';
import EntryDetailList from '../../components/EntryDetailList';
import CertiHeader from '../../components/Header';
import StatusIcon from '../../components/StatusIcon';

import server from '../../libraries/server';
import AsyncStorage from '@react-native-community/async-storage';

import FooterToolbar from '../../components/Footer';

const Capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default class ContractorLogDetail extends Component {
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
      isLoading: true,
      contractorsData: [],
    };
  }
  async componentDidMount() {
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
    });

    console.log(this.props.navigation.state);

    var entryData = this.props.navigation.state.params.entryDay;
    this.setState({
      contractorsData: entryData,
      isLoading: false,
    });
  }

  render() {
    var entryData = this.props.navigation.state.params.entryDay;
    var email_contractor = this.props.navigation.state.params.email;

    var callback = res => {
      this.props.navigation.navigate('ImagePreview', {uri: res.uri});
    };

    let cont = (
      <EntryDetailList contractorsData={entryData} callback={callback} />
    );

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
            <Card style={styles.wrapper}>
              <View style={styles.card}>
                <View style={styles.card__text}>
                  <H1 style={styles.text}>
                    {Capitalize(entryData.day_of_week)}
                  </H1>
                  <H1 style={styles.text}>|</H1>
                  <H1 style={styles.text}>{entryData.time_in_plant.hours}hr</H1>
                  <H1 style={styles.text}>
                    {entryData.time_in_plant.minutes}min
                  </H1>
                </View>
                <StatusIcon cant={entryData.incidentes_count} />
              </View>
              <List style={styles.list}>{cont}</List>
            </Card>
          </View>
        </Content>
        <FooterToolbar email={email_contractor} />
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
  wrapper: {
    backgroundColor: '#FDFDFD',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.06,
    flex: 1,
    flexDirection: 'column',
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  card__text: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#707070',
    fontSize: 22,
  },
});
