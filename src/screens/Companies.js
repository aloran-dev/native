import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Thumbnail,
  Text,
  Drawer,
} from 'native-base';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default ({history}) => (
  <Drawer
    ref={ref => {
      this.drawer = ref;
    }}
    content={<Sidebar />}
    onClose={() => this.drawer._root.close()}>
    <Container style={styles.main}>
      <Header title="CertiFast" />
      <Content style={styles.maincontent}>
        <Text note>Companies in Plant</Text>
        <List style={styles.list}>
          <ListItem thumbnail onPress={() => history.push('/contractors')}>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    'data:image/jpeg;base64,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',
                }}
              />
            </Left>
            <Body>
              <Text note>1 Contractor</Text>
              <Text>Umbrella</Text>
            </Body>
          </ListItem>

          <ListItem thumbnail onPress={() => history.push('/contractors')}>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    'https://pbs.twimg.com/profile_images/704668080228716546/og9uFA5D_400x400.jpg',
                }}
              />
            </Left>
            <Body>
              <Text note>2 Contractors</Text>
              <Text>Skynet</Text>
            </Body>
          </ListItem>
        </List>
      </Content>
    </Container>
  </Drawer>
);

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FCFCFC',
  },
  header: {
    backgroundColor: '#000',
  },
  header__text: {
    color: '#fff',
  },
  maincontent: {
    margin: 25,
  },
  list: {
    marginTop: 16,
    backgroundColor: '#fff',
    width: '100%',
    paddingTop: 16,
    paddingBottom: 32,
    borderRadius: 10,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.6,
  },
});
