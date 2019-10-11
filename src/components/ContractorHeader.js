import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Thumbnail, H1, Text} from 'native-base';

export default class ContractorHeader extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Container style={styles.blackbackground}>
        <Thumbnail
          style={styles.blackbackground__img}
          source={{
            uri: `https://certifast.linuxopensource.mx/api/v0/uploads/${
              this.props.imgUrl
            }`,
          }}
        />
        <H1 style={styles.blackbackground__text}>{this.props.nombre}</H1>
        <Text note style={styles.blackbackground__text}>
          {this.props.apellido}
        </Text>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  blackbackground: {
    width: '100%',
    height: 280,
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 70,
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
