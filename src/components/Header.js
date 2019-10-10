import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Header, Title, Button, Icon, Left, Body} from 'native-base';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header style={styles.header}>
        <Left>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate('Contractors')}>
            <Icon style={styles.header__text} name="menu" />
          </Button>
        </Left>
        <Body>
          <Title style={styles.header__text}>{this.props.title}</Title>
        </Body>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: '#000',
  },
  header__text: {
    color: '#fff',
  },
});
