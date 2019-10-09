import React, { Component } from "react";
import { StyleSheet, View, Text,Button,TouchableHighlight } from "react-native";
//import Icon from "VectorIcons";
import Icon from 'react-native-vector-icons/Entypo';

export default class MaterialRightIconTextbox extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
      <Text style={styles.inputStyle}>{this.props.placeholder} </Text>
      <TouchableHighlight  style={{top:13,height:50,width:50,backgroundColor:"transparent"}}>
        <Icon name="camera" style={styles.iconStyle} />
      </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D5DC",
    borderBottomWidth: 1
  },
  inputStyle: {
    flex: 1,
    color: "#000",
    alignSelf: "stretch",
    paddingTop: 14,
    paddingRight: 16,
    paddingBottom: 8,
    fontSize: 16,
    fontFamily: "roboto-regular",
    lineHeight: 16
  },
  iconStyle: {
    color: "#616161",
    fontFamily: "roboto-regular",
    fontSize: 24,
    paddingRight: 1
  }
});
