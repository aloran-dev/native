import React, {Component} from 'react';

import {withNavigation} from 'react-navigation';
import {ListItem, Left, Body, Thumbnail, Text} from 'native-base';


class ListaItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let lista = [];
    if (this.props.contractorsData !== null) {
      lista = this.props.contractorsData;
    }
    const listaElementos = lista.map((item, index) => (
      <ListItem
        thumbnail
        key={index}
        onPress={() =>
          this.props.navigation.navigate('ContractorDetail', {
            email: item.contratista.email,
          })
        }>
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

          <Text>
            {item.contratista.nombre + ' ' + item.contratista.apellido_paterno}
          </Text>
        </Body>
      </ListItem>
    ));

    return listaElementos;
  }
}

export default withNavigation(ListaItem);
