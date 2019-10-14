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
          Preview Antidoping
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.AntiDoppingCallback({
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
          Doctor Name:
        </Text>
        <Text>{this.props.modal.medico_nombre}</Text>

        <Text note style={styles.text}>
          Medical Id:
        </Text>
        <Text>{this.props.modal.medico_cedula}</Text>

        <Text note style={styles.text}>
          Laboratory:
        </Text>
        <Text>{this.props.modal.laboratorio_nombre}</Text>

        <Text note style={styles.text}>
          Address:
        </Text>
        <Text>{this.props.modal.laboratorio_direccion}</Text>

        <Text note style={styles.text}>
          Phone:
        </Text>
        <Text>{this.props.modal.laboratorio_telefono}</Text>

        <Text note style={styles.text}>
          Sample Date
        </Text>
        <Text>{this.props.modal.fecha_muestreo}</Text>

        <Text note style={styles.text}>
          Results Date
        </Text>
        <Text>{this.props.modal.fecha_resultados}</Text>

        <Text note style={styles.text}>
          All Negative
        </Text>
        <Text>{this.props.modal.todo_negativo.toString()}</Text>

        <Substancias lista={this.props.modal.sustancias_evaluadas} />

        <Text note style={styles.text}>
          Observations:
        </Text>
        <Text>{this.props.modal.observaciones}</Text>

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
