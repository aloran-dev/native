import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content, Card, Drawer} from 'native-base';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import ContractorHeader from '../components/ContractorHeader';
import ResumeCard from '../components/ResumeCard';
import CertificateRow from '../components/CertificateRow';

export default ({history}) => (
  <Drawer
    ref={ref => {
      this.drawer = ref;
    }}
    content={<Sidebar />}
    onClose={() => this.drawer._root.close()}>
    <Container>
      <Header title="CeriFast" />
      <Content style={styles.main}>
        <ContractorHeader />
        <View style={styles.cardscontainer}>
          <Card style={styles.card}>
            <CertificateRow />
            <CertificateRow />
          </Card>
        </View>
      </Content>
      <Footer />
    </Container>
  </Drawer>
);

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FCFCFC',
  },
  cardscontainer: {
    padding: 15,
    marginTop: -100,
  },
  card: {
    borderRadius: 10,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.06,
    overflow: 'hidden',
  },
});
