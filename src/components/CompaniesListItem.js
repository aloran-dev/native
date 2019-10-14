import React, {Component} from 'react';
import {ListItem, Left, Body, Thumbnail, Text} from 'native-base';

class CompaniesListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let lista = [];
    let empresasLista = this.props.contractorsData;
    const listaElementos = empresasLista.map((empresa, index) => {

      return (
        <ListItem
          thumbnail
          key={index}
          onPress={() =>
            this.props.callback({
              empresa_contratista:index
            })
          }>
          <Left>
            <Thumbnail source={{uri: `https://certifast.linuxopensource.mx/api/v0/uploads/${empresa.empresa_contratista.image_profile}`}} />
          </Left>
          <Body>
            <Text note>{empresa.contratistas_timeline.length} Contractors</Text>
            <Text>{empresa.empresa_contratista.razon_social}</Text>
          </Body>
        </ListItem>
      );
    });

    return listaElementos;
  }
}
export default CompaniesListItem;
