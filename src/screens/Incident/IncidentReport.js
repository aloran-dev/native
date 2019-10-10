import React,{Component} from 'react';
import {StyleSheet, View,Alert,ActivityIndicator} from 'react-native';
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
  Picker
} from 'native-base';

import Header from '../../components/Header';

import server from '../../libraries/server';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from "react-native-image-picker";


export default class IncidentReport extends Component{

  constructor(props){
    super(props);

    this.state = {
      newItem: null,
      description:null,
      token:null,
      pickedImage:null,
      resetHandler:false,
      email_contratista:null,
      email_empleado_seguridad:null,
      incident_type:"SECURITY",
      incident_severity:"LOW",
      invalidCode:false,
      isLoading:false
    };

  this.handleSend = this.handleSend.bind(this);

  }


  async componentDidMount(){

    console.log("Entre a Incidente",this.props.navigation)
    const codeQr = this.props.navigation.state.params.contratistaQR;
    if(codeQr === ''){
        this.setState({invalidCode:true})
    }
    var TokenJWT = await AsyncStorage.getItem('AUTH_TOKEN');
    const api_url = await AsyncStorage.getItem('API_URL')
    const email_seguridad = await AsyncStorage.getItem('ACCOUNT_ID')

    this.setState({
          token:TokenJWT,
          email_empleado_seguridad:email_seguridad
    })

    server.getContratistaInfoByNanoId(TokenJWT,codeQr)
        .then((response=>{
          console.log("Validando QR",response);
            this.setState({email_contratista:response.email})
          }))
        .catch((error)=>{
          console.log("Error en el QR",error)
          this.setState(
            {
            invalidCode:true
          })
        })

}

  handleSend = () =>{


  if(this.state.email_contratista== null && this.state.email_empleado_seguridad == null){
    console.log("ERROR",this.state)
    alert("Datos requeridos no válidos")
  }

  if(this.state.description == null || this.state.pickedImage == null){
    alert("Debes ingresar los datos requeridos");
    return;
  }
  this.setState({isLoading:true})

  const newIncident = {
    description:this.state.description,
  //  incident_image:this.state.pickedImage,
    email_contratista:this.state.email_contratista,
    email_empleado_seguridad:this.state.email_empleado_seguridad,
    incident_type:this.state.incident_type,
    incident_severity:this.state.incident_severity,

  };

console.log(newIncident,this.state.pickedImage);

server.add_incidente( this.state.token,newIncident,this.state.pickedImage)
  .then((response)=>{
    console.log("FUNCIONA",response)
    const message = JSON.stringify(response)
    try{
      const message = `OperationID:${response.transactionId}`
    }
    catch(error){
      console.log(error)
    }
    Alert.alert(
      'Incident Confirmation Entry',
      message,
      [
        {text: 'Ok', onPress: () => this.props.navigation.navigate('Contractors')}
      ],
      {cancelable: false},
    );
    this.props.navigation.navigate('Contractors')
  })
  .catch((error)=>{
    console.log(JSON.stringify(error));
    this.props.navigation.navigate('Contractors')
  })


}

  render(){
    return(
      <Container style={styles.main}>
        <Header title="CertiFast" />
        <Content style={styles.maincontent}>
        <ActivityIndicator animating={this.state.isLoading} />
          <Text note>Create incident report</Text>
          <Card style={styles.card}>
            <Item style={styles.card__item}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon type="Feather" name="chevron-down" />}
                style={{width: '100%'}}
                placeholder="Incident Severity"
                selectedValue={this.state.incident_severity}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({incident_severity: itemValue})
                }>
                <Picker.Item label="LOW" value="LOW" />
                <Picker.Item label="MEDIUM" value="MEDIUM" />
                <Picker.Item label="HIGH" value="HIGH" />
              </Picker>
            </Item>

            <Item style={styles.card__item}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon type="Feather" name="chevron-down" />}
                style={{width: '100%'}}
                placeholder="Incident Type"
                selectedValue={this.state.incident_type}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({incident_type: itemValue})
                }>
                <Picker.Item label="OTHER" value="OTHER" />
                <Picker.Item label="SECURITY" value="SECURITY" />
              </Picker>
            </Item>

            <Item style={styles.card__item}>
              <Button title="Attach photo" onPress={this.pickImageHandler}>
              <Icon type="Feather" active name="camera" />
              </Button>
            </Item>
            <Item style={styles.card__item}>
              <Textarea
                style={styles.card__item__textarea}
                rowSpan={5}
                bordered
                placeholder="Incident description"
                value={this.state.description}
                onChangeText={(text)=> this.setState({description:text})}
              />
            </Item>
            <View style={styles.footerButtons}>
              <Button
                onPress={this.handleSend}
                style={{backgroundColor: '#ff2d2d'}}
              >
                <Text>Save</Text>
              </Button>
            </View>
          </Card>
        </Content>
      </Container>
    )

  }

  reset = () => {
    this.setState({
      pickedImage: null
    });
  }

  pickImageHandler = () => {
    ImagePicker.launchCamera({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });

      }
    });
  }

  resetHandler = () =>{
      this.reset();
  }
}

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
