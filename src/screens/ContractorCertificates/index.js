import React, {Component} from 'react';
import {
  Image,
  ScrollView,
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
import DocumentList from '../../components/DocumentList';
import DocumentModal from '../../components/DocumentModal';
import AntiDoppingList from '../../components/AntiDoppingList';
import AntiDoppingModal from '../../components/AntiDoppingModal';
import PreviewDocumentModal from '../../components/PreviewDocumentModal';

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
      antidopings: [],
      cursos_habilidades_laborales: [],
      cursos_seguridad_interna:[],
      eventCards: '',
      official_documents:[],
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

    console.log(contractor);
    this.setState({
      contratista: contractor,
      head: {
        nombre: contractor.profile.nombre,
        apellido_paterno: contractor.profile.apellido_paterno,
        imgUrl: contractor.profile.image_profile,
      },
      antidopings: contractor.antidopings,
      cursos_habilidades_laborales: contractor.cursos_habilidades_laborales,
      cursos_seguridad_interna: contractor.cursos_seguridad_interna,
      eventCards: contractor.event_cards,
      official_documents:contractor.official_documents,
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

    var callbackModal = res => {
      this.props.navigation.navigate('ImagePreview', {uri: res.uri});
      this.setModalVisible(!this.state.modalVisible);
    };

    let cont;

    if (this.state.type === 'antidopping') {
      cont = (
        <AntiDoppingModal
          modal={this.state.modal}
          AntiDoppingCallback={callbackModal}
        />
      );
    }else if (this.state.type === 'documents') {
      cont = (
        <DocumentModal
          modal={this.state.modal}
          DocumentCallback={callbackModal}
        />
      );
    }
     else {
      cont = (
        <PreviewDocumentModal
          modal={this.state.modal}
          PreviewDocumentCallback={callbackModal}
        />
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
              <DocumentList
                documentList={this.state.official_documents}
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
