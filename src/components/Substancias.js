import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import {Text} from 'native-base';

class Substancias extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const lista = this.props.lista;
    const listaElementos = lista.map((item, index) => (
      <View>
        <Text note style={styles.text}>
          {item.nombre}:
        </Text>
        <Text>{item.resultado}</Text>
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

export default Substancias;
