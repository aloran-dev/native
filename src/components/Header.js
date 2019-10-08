import React from 'react';
import {StyleSheet} from 'react-native';
import {Header, Title, Button, Icon, Left, Body} from 'native-base';

export default props => (
  <Header style={styles.header}>
    <Left>
      <Button transparent onPress={() => this.drawer._root.open()}>
        <Icon style={styles.header__text} name="menu" />
      </Button>
    </Left>
    <Body>
      <Title style={styles.header__text}>{props.title}</Title>
    </Body>
  </Header>
);

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: '#000',
  },
  header__text: {
    color: '#fff',
  },
});
