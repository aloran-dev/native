import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Thumbnail, H1, Text} from 'native-base';

export default props => {
  console.log(props);
  return (
    <Container style={styles.blackbackground}>
      <Thumbnail
        style={styles.blackbackground__img}
        source={{
          uri:`${props.api_url}/api/v0/uploads/${props.profile.image_profile}`
        }}
      />
      <H1 style={styles.blackbackground__text}>{props.profile.nombre}</H1>
      <Text note style={styles.blackbackground__text}>
        {props.profile.empresa_contratista}
      </Text>
    </Container>
  )
}


const styles = StyleSheet.create({
  blackbackground: {
    width: '100%',
    height: 280,
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  blackbackground__img: {
    marginBottom: 16,
  },
  blackbackground__text: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
  },
});
