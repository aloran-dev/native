import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

export default class HeaderWithIconAndTextButtons7 extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <View style={styles.headerWithIconAndTextButtons}>
          <View style={styles.bar}>
            <View
              style={{
                flex: 1
              }}
            />
            <View style={{}}>
              <Svg viewBox="-0.5 -0.5 378 4" style={styles.line}>
                <Path
                  strokeWidth={1}
                  fill="transparent"
                  stroke="rgba(223,223,223,1)"
                  d="M0.00 0.00 L375.50 1.50 "
                />
              </Svg>
              <Text style={styles.name3}>Header</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1
          }}
        />
        <Text style={styles.name4}>$</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  headerWithIconAndTextButtons: {
    width: 0,
    height: 0
  },
  bar: {
    width: 0,
    height: 0,
    backgroundColor: "rgba(9,8,8,1)"
  },
  line: {
    height: 4,
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  name3: {
    width: 0,
    height: 20,
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    fontSize: 17,
    fontFamily: "Roboto-Regular",
    letterSpacing: -0.41,
    textAlign: "center"
  },
  name4: {
    width: 0,
    height: 17,
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    fontSize: 17,
    fontFamily: "Ionicons",
    letterSpacing: -0.41,
    textAlign: "center",
    marginBottom: 19,
    marginLeft: 15
  }
});
