import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Content,
  Text,
  Card,
  Item,
  Icon,
  Input,
  Button,
  Textarea,
  Picker,
} from 'native-base';

import Header from '../components/Header';

export default () => (
  <Container style={styles.main}>
    <Header title="CertiFast" />
    <Content style={styles.maincontent}>
      <Text note>Create incident report</Text>
      <Card style={styles.card}>
        <Item style={styles.card__item}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon type="Feather" name="chevron-down" />}
            style={{width: '100%'}}
            placeholder="Incident Severity">
            <Picker.Item label="Incident 1" value="key0" />
            <Picker.Item label="Incident 2" value="key1" />
            <Picker.Item label="Incident 3" value="key2" />
          </Picker>
        </Item>
        <Item style={styles.card__item}>
          <Input placeholder="Attach photo" />
          <Icon type="Feather" active name="camera" />
        </Item>
        <Item style={styles.card__item}>
          <Textarea
            style={styles.card__item__textarea}
            rowSpan={5}
            bordered
            placeholder="Incident description"
          />
        </Item>
        <View style={styles.footerButtons}>
          <Button style={{backgroundColor: '#ff2d2d'}}>
            <Text>Save</Text>
          </Button>
        </View>
      </Card>
    </Content>
  </Container>
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
  card: {
    marginTop: 16,
    width: '100%',
    borderRadius: 10,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.06,
    paddingTop: 0,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  card__item: {
    marginTop: 15,
  },
  card__item__textarea: {
    width: '100%',
  },
  footerButtons: {
    marginTop: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
