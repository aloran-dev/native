import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default class MaterialUnderlineTextbox extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TextInput
          placeholder={this.props.placeholder}

          style={styles.inputStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 290,
    height: 45,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D5DC",
    borderBottomWidth: 1
  },
  inputStyle: {
    flex: 1,
    color: "#000",
  //  backgroundColor:"red",
    alignSelf: "stretch",
    paddingTop: 16,
    paddingRight: 5,
    paddingBottom: 8,
    fontSize: 16,
    fontFamily: "roboto-regular",
  //  lineHeight: 16
  }
});
