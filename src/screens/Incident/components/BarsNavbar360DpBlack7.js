import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default class BarsNavbar360DpBlack7 extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <View style={styles.navbarBg}>
          <View style={styles.group3}>
            <View
              style={[
                styles.stack,
                {
                  height: 0,
                  width: 0
                }
              ]}
            >
              <View style={styles.rectangle1} />
              <View style={styles.recent}>
                <View style={styles.group4}>
                  <View
                    style={[
                      styles.stack,
                      {
                        height: 0,
                        width: 0
                      }
                    ]}
                  >
                    <View style={styles.rectangle2}>
                      <View style={styles.group2}>
                        <View style={styles.rectangle3}>
                          <Svg viewBox="-0 -0 15 17" style={styles.back}>
                            <Path
                              strokeWidth={0}
                              fill="transparent"
                              d="M15.00 1.25 L15.00 15.75 C15.00 16.75 14.13 17.25 13.27 16.75 L0.73 9.50 C-0.14 9.00 -0.14 8.00 0.73 7.50 L13.27 0.25 C14.13 -0.25 15.00 0.25 15.00 1.25 Z"
                            />
                          </Svg>
                        </View>
                      </View>
                    </View>
                    <Svg viewBox="-0 -0 16 16" style={styles.home}>
                      <Path
                        strokeWidth={0}
                        fill="transparent"
                        d="M8.00 16.00 C12.42 16.00 16.00 12.42 16.00 8.00 C16.00 3.58 12.42 0.00 8.00 0.00 C3.58 0.00 0.00 3.58 0.00 8.00 C0.00 12.42 3.58 16.00 8.00 16.00 Z"
                      />
                    </Svg>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  navbarBg: {
    width: 0,
    height: 0,
    backgroundColor: "transparent"
  },
  group3: {
    width: 0,
    height: 0
  },
  stack: {
    position: "relative"
  },
  rectangle1: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    position: "absolute"
  },
  recent: {
    top: 0,
    left: 0,
    width: 16,
    height: 16,
    backgroundColor: "transparent",
    position: "absolute",
    borderRadius: 2
  },
  group4: {
    width: 0,
    height: 0
  },
  rectangle2: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    position: "absolute"
  },
  group2: {
    width: 0,
    height: 0
  },
  rectangle3: {
    backgroundColor: "transparent",
    flex: 1
  },
  back: {
    width: 15,
    height: 17,
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  home: {
    top: 0,
    left: 0,
    width: 16,
    height: 16,
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  }
});
