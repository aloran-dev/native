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

import DocumentData from './DocumentData';

class AntiDoppingList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.modal)
    return (
      <ScrollView style={styles.scroll}>
        <Text note style={styles.text}>
          Preview Document
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.DocumentCallback({
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


        <DocumentData lista={this.props.modal.document_data} />
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
