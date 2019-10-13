import React, {Component} from 'react';
import {ActivityIndicator,View,StyleSheet,Image} from 'react-native';
import {withNavigation} from 'react-navigation';
import {ListItem,Text,H1,Icon} from 'native-base';
import moment from 'moment';

const Capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const EntryDetailList = (props) => {
    const lista = props.contractorsData.events
    console.log("ESTOY in ENtryDetail",lista)
    const listaElementos = lista.map((item, index) => {
      console.log(item)
      if(item.$class === "Incident"){
        return (
        <ListItem key={index}>
            <View>
                <Icon
                  style={{color: '#77F48A'}}
                  active
                  type="Feather"
                  name="check-circle"
                />
                <Text note>{item.incident_type}</Text>
                <Text>{moment(item.timestamp).format('MM:SS')}</Text>
                <Text>{item.description}</Text>
                <Image
                source=
                      {{
                        uri:`https://certifast.linuxopensource.mx/api/v0/uploads/${item.image_thumbnail_filename}`
                      }}
                style={{width:50,heigth:50,backgroundColor:"pink"}}

                />

                <Text>{item.empleado_seguridad}</Text>
            </View>
        </ListItem>
        )
      }else{
        return (
          <ListItem key={index}>
          <View>
              <Icon
                style={{color: '#77F48A'}}
                active
                type="Feather"
                name="check-circle"
              />
              <Text note>{item.$class}</Text>
              <Text>{moment(item.timestamp).format('MM:SS')} </Text>

          </View>
        </ListItem>
        )
      }

    })

    return listaElementos;
  }

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
});
export default withNavigation(EntryDetailList);
