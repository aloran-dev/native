import React, { Component } from "react";
import {
  StyleSheet,
  View, Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity} from "react-native";

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

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import ContractorHeader from '../../components/ContractorHeader';
import ResumeCard from '../../components/ResumeCard';


import server from '../../libraries/server';

import AsyncStorage from '@react-native-community/async-storage';


export default class ContractorDetail extends Component {

  constructor(props){
      super(props);
      this.state={
        eventCards:[],
        profile:null,
        token:null
      }
  }

  addKeys= (lista)=>{
    let newList = []
    lista.forEach(function(item,index){
        item.key = `${index}`;
        newList.push(item);
    })
    console.log(newList)
    return newList
  }



  async componentDidMount(){
    console.log(this.props.navigation.state.params);
    //var TokenJWT = await server.login();
    //console.log("Descargardo Datos",this.props.codeQr)
    var TokenJWT = await AsyncStorage.getItem('AUTH_TOKEN');
    const api_url = await AsyncStorage.getItem('API_URL')
    const email_seguridad = await AsyncStorage.getItem('ACCOUNT_ID')
    console.log("Descargardo Datos",TokenJWT,"API",api_url)

    var certificateContractorData = await server.getPlantaTimeline(TokenJWT,email_seguridad);
    console.log("Detalles del Contractor",certificateContractorData);
    this.setState({
      eventCards:this.addKeys(this.props.navigation.state.params.date_events),
      profile:this.props.navigation.state.params.emailContractor,
      token:TokenJWT,
      empleado_seguridad:email_seguridad
    })
  }


  renderItem = ({item,index}) =>{
    console.log("CardsList",item);
    return(
      <View style={{backgroundColor:"transparent",width:400,height:100}} >
          <TouchableOpacity
          style ={{backgroundColor:"trasparent",height:100}}
          onPress={
              ()=>
                {
                this.props.navigation.navigate('ContractorLogDetail',{
                emailContractor:this.props.emailContratista,
                empleado_seguridad: this.state.empleado_seguridad,
                eventCards:item.events_in_date,
                time_in_plant:item.time_in_plant,
                day_of_week:item.day_of_week,
                date:item.date,
                token:this.state.token,
                keyValue:item.key
              })
              }
            }>
            <Text></Text>
            <CardEntryDay2
            style={styles.cardEntryDay2}
            dayName={item.day_of_week}
            hours={item.time_in_plant.hours}
            minutes={item.time_in_plant.minutes}
            color={item.events_in_date > 0 ? "green" : "orange" }/>
          </TouchableOpacity>
      </View>
    );
  }

  listEmptyComponent = () => {
    return (
        <View>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
  }

  render() {
    return (
      <Container>
        <Header title="CertiFast" />
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
    )
  }
}


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


const oldComponent = ()=>{
  (
    <Container style={styles.root}>
      <Header />

      <Content/>

      <ContractorProfile companyName="empresa1" contractorName="Jhon" style={styles.contractorProfile2} />

      <FlatList
         data={this.state.eventCards}
         renderItem={this.renderItem}
         ListEmptyComponent={this.listEmptyComponent}
         keyExtractor={(item, index) => item.key}
         emailContratista={this.state.profile}
       />

      <Footer  >
      <FooterTab  >
        <Button vertical
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          this.props.navigation.navigate('ContractorDetail', {

            emailContractor:this.state.profile
          });
        }}
        >
          <Icon name="fingerprint" style={{fontSize:26,color:'red'}}/>
          <Text>Summary</Text>
        </Button>

        <Button vertical
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          this.props.navigation.navigate('ContractorCertificates', {

            emailContractor:this.state.profile
          });
        }}
        >
          <Icon name="documents" style={{fontSize:26}} />
          <Text>Certificates</Text>
        </Button>

        <Button vertical
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          this.props.navigation.navigate('Home', {

            emailContractor:this.state.profile
          });
        }}
        >
          <Icon name="tools" style={{fontSize:26}} />
          <Text>Options</Text>
        </Button>
      </FooterTab>
      </Footer>
    </Container>
  );
}
