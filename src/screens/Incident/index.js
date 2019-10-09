import React, {Component} from 'react';

import {
    Text,
    Button,
    View,
    Image,
    Alert,
    Platform,
    Dimensions,
    TextInput,
    StyleSheet,
    Picker,
    Label
} from 'react-native';

import {Header,Container,Content,Left,Icon,Body,Title,Right} from 'native-base';

import Colors from "../Components/Deprecated/Simple/components/Colors"

import ImagePicker from "react-native-image-picker";

import server from '../../libraries/server';
import AsyncStorage from '@react-native-community/async-storage';

import {withNavigation} from 'react-navigation';




class Incident extends Component{
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
        invalidCode:false
      };

    this.handleSend = this.handleSend.bind(this);

    }


  async componentDidMount(){

      console.log("Entre a Incidente",this.props.navigation)
      //  var TokenJWT = await server.login();

      //var TokenJWT = await server.login();ç
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
    //  console.log("Descargardo Datos",TokenJWT,"API",api_url)



         // console.log("Descargardo Datos",TokenJWT,codeQr)
         //  const value = codeQr.replace(/\s/g,'');
         //const infoContratista = await
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




       // if(codeQr !== ''){
       //   console.log("Descargardo Datos",TokenJWT,codeQr)
       //   const infoContratista = await server.getContratistaInfoByNanoId(TokenJWT,codeQr);
       //   console.log("infoContratista Datos",TokenJWT,infoContratista)
       //   this.setState({
       //     token:TokenJWT,
       //     email_contratista:infoContratista[0].email,
       //     email_empleado_seguridad:this.props.navigation.state.params.email_empleado_seguridad
       //   });
       // }
  }

  handleSend = () =>{
    console.log(this.state)

    if(this.state.email_contratista== null && this.state.email_empleado_seguridad == null){
      console.log("ERROR",this.state)
      alert("Datos requeridos no válidos")
    }

    if(this.state.description == null || this.state.pickedImage == null){
      alert("Debes ingresar los datos requeridos");
      return;
    }
    const newIncident = {
      description:this.state.description,
    //  incident_image:this.state.pickedImage,
      email_contratista:this.state.email_contratista,
      email_empleado_seguridad:this.state.email_empleado_seguridad,
      incident_type:this.state.incident_type,
      incident_severity:this.state.incident_severity,

    };
    //console.log(JSON.stringify(newIncident))

  server.add_incidente( this.state.token,newIncident,this.state.pickedImage)
    .then((response)=>{
      // if(response.error){
      //   alert("Error al registrar"+JSON.stringify(response))
      // }else{
      //   alert(JSON.stringify(response));
      //
      // }
      // Works on both iOS and Android
      Alert.alert(
        'Confirmacion',
        response,
        [
          {text: 'Ok', onPress: () => this.props.navigation.navigate('ContractorList')},
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          }
        ],
        {cancelable: false},
      );

    })
    .catch((error)=>{
      console.log(JSON.stringify(error));

    })


  }
  render(){
    if(this.state.invalidCode){
      console.log("Codigo No Valido Flag")
      return (
        <View>
          <Text>Codigo invalido</Text>
          <Button title="regresar"
          onPress={()=>{this.props.navigation.navigate('ContractorList')}}
        >
          </Button>
        </View>
      );
    }else{
      return (
      <Container style={styles.container}>

            <Content>
            <Text>Severity</Text>
            <Picker
              selectedValue={this.state.incident_severity}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({incident_severity: itemValue})
              }>
              <Picker.Item label="LOW" value="LOW" />
              <Picker.Item label="MEDIUM" value="MEDIUM" />
              <Picker.Item label="HIGH" value="HIGH" />
            </Picker>
            <Text>incident Type</Text>
            <Picker
              selectedValue={this.state.incident_type}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({incident_type: itemValue})
              }>
              <Picker.Item label="OTHER" value="OTHER" />
              <Picker.Item label="SECURITY" value="SECURITY" />

            </Picker>
            <Text>Description</Text>
            <TextInput

                onChangeText={(text)=> this.setState({description:text})}
                placeholder="Required"
                value={this.state.description}
            />
          <Text>Evidence</Text>
          <View style={styles.container}>

              <View style={styles.placeholder}>

                    <Image source={this.state.pickedImage} style={styles.previewImage} />

              </View>

              <View style={styles.button}>

                <Button title="Add New Evidence" onPress={this.pickImageHandler} />



              </View>
        </View>

              <Text> </Text>

            <Button
              onPress={this.handleSend} title="Save">
          </Button>
        </Content>
      </Container>
      )
    }
  }

  addIncident(){

  }

  static navigationOptions = ({navigation}) =>{
        return{
          title:navigation.getParam('name')
        }
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

  //  <Button title="Reset" onPress={this.resetHandler} />
export default  withNavigation(Incident);

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff"
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  container: {
  alignItems:"center"
  },
  textStyle: {
   fontWeight:"bold",
   fontSize:10,
   textAlign:"center",
   color:"red",
   marginTop:10
 },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "10%",
    height: 50,
    marginTop:20,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
   width: "80%",
   marginTop:20,
   flexDirection:"row",
   justifyContent: "space-around"
 },
  previewImage: {
      width: "100%",
      height: "100%"
  },
  picker:{
    height: 50,
    width: 200,
    marginLeft:30,
    marginRight:30,
    marginTop:20,
    marginBottom:10}
});
