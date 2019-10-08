import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Content,
  Icon,
  Card,
  Text,
  H1,
  Thumbnail,
  Drawer,
} from 'native-base';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import ContractorHeader from '../components/ContractorHeader';
import ResumeCard from '../components/ResumeCard';

export default ({history}) => (
  // <Drawer
  //   ref={ref => {
  //     this.drawer = ref;
  //   }}
  //   content={<Sidebar />}
  //   onClose={() => this.drawer._root.close()}>
  <Container>
    <Header title="CeriFast" />
    <Content style={styles.main}>
      <ContractorHeader />
      <View style={styles.cardscontainer}>
        <ResumeCard />
        <ResumeCard />
        <ResumeCard />
        <ResumeCard />
      </View>
    </Content>
    <Footer />
  </Container>
  // </Drawer>
);

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FCFCFC',
    position: 'relative',
  },
  cardscontainer: {
    padding: 30,
    flex: 1,
    marginTop: -100,
  },
});
