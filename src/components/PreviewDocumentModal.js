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

import Substancias from './Substancias';

class AntiDoppingList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <Text note style={styles.text}>
          Preview Document
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.PreviewDocumentCallback({
              uri: `https://certifast.linuxopensource.mx/api/v0/uploads/${
                this.props.modal.image_filename
              }`,
            });
          }}>
          <Image
            style={styles.modalImg}
            source={{
              uri: `https://certifast.linuxopensource.mx/api/v0/uploads/${
                this.props.modal.image_filename
              }`,
            }}
          />
        </TouchableOpacity>

        <Text note style={styles.text}>
          Document Type:
        </Text>
        <Text>{this.props.modal.documento_type}</Text>

        <Text note style={styles.text}>
          Thematic Area:
        </Text>
        <Text>{this.props.modal.area_tematica}</Text>

        <Text note style={styles.text}>
          Trainer:
        </Text>
        <Text>{this.props.modal.capacitador}</Text>

        <Text note style={styles.text}>
          Course Name:
        </Text>
        <Text>{this.props.modal.curso_nombre}</Text>

        <Text note style={styles.text}>
          Length in hours:
        </Text>
        <Text>{this.props.modal.duracion_horas}</Text>

        <Text note style={styles.text}>
          Contractor Company:
        </Text>
        <Text>{this.props.modal.empresa_contratista}</Text>

        <Text note style={styles.text}>
          Start Date:
        </Text>
        <Text>{this.props.modal.fecha_inicio}</Text>

        <Text note style={styles.text}>
          End Date:
        </Text>
        <Text>{this.props.modal.fecha_fin}</Text>

        <Text note style={styles.text}>
          Valid Until:
        </Text>
        <Text>{this.props.modal.vigencia}</Text>

        <Text note style={styles.text}>
          Timestamp:
        </Text>
        <Text>{this.props.modal.timestamp}</Text>

        {/* <TouchableHighlight
          onPress={() => {
            this.setModalVisible(!this.props.modalVisible);
          }}>
          <Text style={styles.touch}>Close</Text>
        </TouchableHighlight> */}
      </ScrollView>
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

export default AntiDoppingList;
