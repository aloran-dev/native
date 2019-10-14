import React, {Component} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {ListItem, Text, H1, Icon, Left, Body, Right} from 'native-base';
import moment from 'moment';

const Capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const EntryDetailList = props => {
  const lista = props.contractorsData.events;
  const listaElementos = lista.map((item, index) => {
    if (item.$class === 'Incident') {
      return (
        <ListItem key={index} avatar>
          <Left>
            <Icon
              style={{
                color: '#FFE165',
                width: 20,
                fontSize: 20,
              }}
              type="Feather"
              name="info"
            />
          </Left>
          <Body>
            <Text note>{item.incident_type}</Text>
            <Text>{item.description}</Text>

            <TouchableOpacity
              onPress={() => {
                props.callback({
                  uri: `https://certifast.linuxopensource.mx/api/v0/uploads/${
                    item.image_thumbnail_filename
                  }`,
                });
              }}>
              <Image
                source={{
                  uri: `https://certifast.linuxopensource.mx/api/v0/uploads/${
                    item.image_thumbnail_filename
                  }`,
                }}
                style={{width: 50, height: 50, backgroundColor: 'pink'}}
              />
            </TouchableOpacity>

            <Text note>{item.empleado_seguridad}</Text>
          </Body>
          <Right>
            <Text note>{moment(item.timestamp).format('hh:mm:a')}</Text>
          </Right>
        </ListItem>
      );
    } else {
      return (
        <ListItem key={index} avatar>
          <Left>
            <Icon style={styles.check__icon} type="Feather" name="flag" />
          </Left>
          <Body>
            <Text note>{item.$class}</Text>
          </Body>
          <Right>
            <Text note>{moment(item.timestamp).format('hh:mm:a')}</Text>
          </Right>
        </ListItem>
      );
    }
  });

  return listaElementos;
};

const styles = StyleSheet.create({
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
  check__icon: {
    color: '#7E7E7E',
    width: 20,
    fontSize: 20,
  },
});
export default withNavigation(EntryDetailList);
