import React,{Component} from 'react';
import {StyleSheet,TouchableOpacity} from 'react-native';
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
  FlatList
} from 'native-base';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

import AsyncStorage from '@react-native-community/async-storage';
import server from '../../libraries/server';

//export default ({history}) => (

const ListaItem = (props)=>{
  const lista = props.contractorsData;
  const api_url = props.api_url;
  const navegation = props.navegacion

  const listaElementos = lista.map((item,index)=>(
    <TouchableOpacity key={index} onPress={()=>
        {
            navegation.navigate('ContractorDetail',{
            emailContractor:item.contratista.email,
            //empleado_seguridad:this.state.email_seguridad,
            date_events:item.date_events,
            keyValue:index
          })
          }}>
    <ListItem thumbnail >
      <Left>
        <Thumbnail
          source={{
            uri:`${api_url}/api/v0/uploads/${item.contratista.image_profile}`
          }}
        />
      </Left>
      <Body>
        <Text note>{item.contratista.empresa_contratista}</Text>
        <Text>{item.contratista.nombre+" "+item.contratista.apellido_paterno}</Text>
      </Body>
    </ListItem>
    </TouchableOpacity>
    )
  )


  return listaElementos
}

//Line 100 Removed   onClose={() => this.drawer._root.close()

export default class Contractors extends Component{
  constructor(props){
  super(props);
  this.state={
    contractorsData:[],
    contratista:null,
    Token:null,
    api_url:null,
    email_seguridad:null
  }
}
  async componentDidMount(){
    console.log("NAVIGATION",this.props.navigation);

    var TokenJWT = await AsyncStorage.getItem('AUTH_TOKEN');
    const api_url = await AsyncStorage.getItem('API_URL')
    const email_seguridad = await AsyncStorage.getItem('ACCOUNT_ID')
    console.log("Descargardo Datos",TokenJWT,"API",api_url)
    //this.props.navigation.state.params.empleado_seguridad
    var contractorData = await server.getPlantaTimeline(TokenJWT,email_seguridad);
    console.log(contractorData);

    this.setState({
      contractorsData:contractorData,
      Token:TokenJWT,
      api_url:api_url,
      email_seguridad:email_seguridad
    })
  }


  render(){
    const navegacion = this.props.navigation
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<Sidebar />}
      >
        <Container style={styles.main}>
          <Header title="CertiFast" />
          <Content style={styles.maincontent}>
            <Text note>Companies Contractors Availables</Text>
            <List style={styles.list}>
              <ListaItem contractorsData={this.state.contractorsData} api_url={this.state.api_url} navegacion={navegacion}/>
            </List>

          </Content>
        </Container>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FCFCFC',
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
