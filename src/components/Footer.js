import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Footer, FooterTab, Button, Icon, Text} from 'native-base';

//import {Link} from 'react-router-native';


export default (props) => {
  
  return (

        <Footer>
          <FooterTab style={styles.footer}>
            <Button vertical
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              props.navegacion.navigate('ContractorDetail', {
              emailContractor:props.navegacion.state.params.emailContractor
              });
            }}>

                <Container style={styles.link}>
                  <Icon type="Feather" name="calendar" style={styles.black} />
                  <Text style={styles.blackText}>Summary</Text>
                </Container>

            </Button>
            <Button
            vertical
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              props.navegacion.navigate('ContractorCertificates', {
                emailContractor:props.navegacion.state.params.emailContractor
              });
            }}
            >

                <Container style={styles.link}>
                  <Icon type="Feather" name="award" style={styles.black} />
                  <Text style={styles.blackText}>Certificates</Text>
                </Container>

            </Button>
            <Button
            vertical>
              <Container style={styles.link}>
                <Icon type="Feather" name="settings" style={styles.black} />
                <Text style={styles.blackText}>Options</Text>
              </Container>
            </Button>
          </FooterTab>
        </Footer>
    )
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.06,
  },
  link: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  black: {
    color: '#000',
  },
  blackText: {
    color: '#000',
    fontSize: 10,
  },
});
