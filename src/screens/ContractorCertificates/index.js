import React, {Component} from 'react';
import {Image, ScrollView} from 'react-native';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Alert,
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
import CertificateList from '../../components/CertificateList';
import AntiDoppingList from '../../components/AntiDoppingList';
import Substancias from '../../components/Substancias';

import server from '../../libraries/server';
import AsyncStorage from '@react-native-community/async-storage';

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
      modalVisible: false,
      modal: '',
      type: '',
    };
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
    });
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
    var callback = res => {
      this.setState({
        modalVisible: true,
        modal: res[1],
        type: res[0],
      });
    };

    let cont;

    if (this.state.type === 'antidopping') {
      cont = (
        <ScrollView style={styles.scroll}>
          <Text note style={styles.text}>
            Preview Antidoping
          </Text>
          <Image
            style={styles.modalImg}
            source={{
              uri: `https://certifast.linuxopensource.mx/api/v0/uploads/${
                this.state.modal.image_filename
              }`,
            }}
          />

          <Text note style={styles.text}>
            Doctor Name:
          </Text>
          <Text>{this.state.modal.medico_nombre}</Text>

          <Text note style={styles.text}>
            Medical Id:
          </Text>
          <Text>{this.state.modal.medico_cedula}</Text>

          <Text note style={styles.text}>
            Laboratory:
          </Text>
          <Text>{this.state.modal.laboratorio_nombre}</Text>

          <Text note style={styles.text}>
            Address:
          </Text>
          <Text>{this.state.modal.laboratorio_direccion}</Text>

          <Text note style={styles.text}>
            Phone:
          </Text>
          <Text>{this.state.modal.laboratorio_telefono}</Text>

          <Text note style={styles.text}>
            Sample Date
          </Text>
          <Text>{this.state.modal.fecha_muestreo}</Text>

          <Text note style={styles.text}>
            Results Date
          </Text>
          <Text>{this.state.modal.fecha_resultados}</Text>

          <Text note style={styles.text}>
            All Negative
          </Text>
          <Text>{this.state.modal.todo_negativo.toString()}</Text>

          <Substancias lista={this.state.modal.sustancias_evaluadas} />

          <Text note style={styles.text}>
            Observations:
          </Text>
          <Text>{this.state.modal.observaciones}</Text>

          <Text note style={styles.text}>
            Timestamp:
          </Text>
          <Text>{this.state.modal.timestamp}</Text>

          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <Text style={styles.touch}>Close</Text>
          </TouchableHighlight>
        </ScrollView>
      );
    } else {
      cont = (
        <ScrollView style={styles.scroll}>
          <Text note style={styles.text}>
            Preview Document
          </Text>
          <Image
            style={styles.modalImg}
            source={{
              uri: `https://certifast.linuxopensource.mx/api/v0/uploads/${
                this.state.modal.image_filename
              }`,
            }}
          />

          <Text note style={styles.text}>
            Document Type:
          </Text>
          <Text>{this.state.modal.documento_type}</Text>

          <Text note style={styles.text}>
            Thematic Area:
          </Text>
          <Text>{this.state.modal.area_tematica}</Text>

          <Text note style={styles.text}>
            Trainer:
          </Text>
          <Text>{this.state.modal.capacitador}</Text>

          <Text note style={styles.text}>
            Course Name:
          </Text>
          <Text>{this.state.modal.curso_nombre}</Text>

          <Text note style={styles.text}>
            Length in hours:
          </Text>
          <Text>{this.state.modal.duracion_horas}</Text>

          <Text note style={styles.text}>
            Contractor Company:
          </Text>
          <Text>{this.state.modal.empresa_contratista}</Text>

          <Text note style={styles.text}>
            Start Date:
          </Text>
          <Text>{this.state.modal.fecha_inicio}</Text>

          <Text note style={styles.text}>
            End Date:
          </Text>
          <Text>{this.state.modal.fecha_fin}</Text>

          <Text note style={styles.text}>
            Valid Until:
          </Text>
          <Text>{this.state.modal.vigencia}</Text>

          <Text note style={styles.text}>
            Timestamp:
          </Text>
          <Text>{this.state.modal.timestamp}</Text>

          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <Text style={styles.touch}>Close</Text>
          </TouchableHighlight>
        </ScrollView>
      );
    }

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
                modalcallback={callback}
              />
              <AntiDoppingList
                certificateList={this.state.antidopings}
                modalcallback={callback}
              />
            </Card>
          </View>
        </Content>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View>{cont}</View>
        </Modal>
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
  scroll: {
    paddingHorizontal: 22,
  },
  modalImg: {
    marginVertical: 12,
    width: '100%',
    height: 200,
  },
  text: {
    marginTop: 15,
  },
  touch: {
    color: '#ff2d2d',
    textAlign: 'right',
    marginVertical: 25,
  },
});
