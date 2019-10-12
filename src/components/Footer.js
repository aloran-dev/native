import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Footer, FooterTab, Button, Icon, Text} from 'native-base';
import {withNavigation} from 'react-navigation';

class CertiHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Footer>
        <FooterTab style={styles.footer}>
          <Button
            style={styles.link}
            vertical
            onPress={() =>
              this.props.navigation.navigate('ContractorDetail', {
                email: this.props.email,
              })
            }>
            <Icon type="Feather" name="calendar" style={styles.black} />
            <Text style={styles.blackText}>Summary</Text>
          </Button>
          <Button
            vertical
            style={styles.link}
            onPress={() =>
              this.props.navigation.navigate('ContractorCertificates', {
                email: this.props.email,
              })
            }>
            <Icon type="Feather" name="award" style={styles.black} />
            <Text style={styles.blackText}>Certificates</Text>
          </Button>
          <Button vertical style={styles.link}>
            <Icon type="Feather" name="settings" style={styles.black} />
            <Text style={styles.blackText}>Options</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default withNavigation(CertiHeader);

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
