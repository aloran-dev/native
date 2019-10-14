import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import {Text} from 'native-base';

export default class DocumentData extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const lista = this.props.lista;
    const listaElementos = lista.map((item, index) => (
      <View key={index}>
        <Text note style={styles.text}>
          {item.field_name}:
        </Text>
        <Text>{item.field_value}</Text>
      </View>
    ));

    return listaElementos;
  }
}

const styles = StyleSheet.create({
  text: {
    marginTop: 15,
  },
});
