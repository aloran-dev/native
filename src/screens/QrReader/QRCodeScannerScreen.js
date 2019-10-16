import React, { Component } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";

export default class QRCodeScannerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { qrCodeData: " ", scanner: undefined };
  }

  onSuccess = async e => {
    console.log('CODIGO', e.data);
    const navigation = this.props.navigation;
    if (this.state.action == 'INCIDENT') {
      await navigation.navigate('AddIncident', {
        contratistaQR: e.data,
        scanner:this.scanner,
      });
    } else {
     await navigation.navigate('ContractorQrDetail', {
        contratistaQR: e.data,
        scanner:this.scanner,
      });
    }
  };

  handleSend(value) {
    //  console.log("ESTADO",this.state.codeContratist
    if (this.state.codeContratista.length !== 0) {
      console.log('Listo para cambiar de Ventaba');
      if (this.state.action == 'INCIDENT') {
        this.props.navigation.navigate('AddIncident', {
          contratistaQR: this.state.codeContratista,
          scanner:this.scanner,
        });
      } else {
        this.props.navigation.navigate('Entry', {
          contratistaQR: this.state.codeContratista,
          scanner:this.scanner
        });
      }
    } else {
      //  Toast.show({text:"No se ha seleccionado QR",buttonText:"Ok",type:"warning",duration:3000})
      alert('Campos requeridos');
    }
  }

  handleCancel() {
    console.log(this.props.navigation)
    navigation.navigate('AddIncident', {
      contratistaQR: null,
      scanner:this.scanner,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={this.onSuccess}
          showMarker={true}
          checkAndroid6Permissions={true}
          ref={elem => {
            this.scanner = elem;
          }}
          cameraStyle={{ height: Dimensions.get("window").height }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
