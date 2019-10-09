import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import HeaderWithIconAndTextButtons7 from "./components/HeaderWithIconAndTextButtons7";
import MaterialUnderlineTextbox from "./components/MaterialUnderlineTextbox";
import MaterialRightIconTextbox from "./components/MaterialRightIconTextbox";
import MaterialButtonDanger from "./components/MaterialButtonDanger";

export default class ContractorsAddIncident extends Component {
  render() {
    return (
      <View style={[styles.root,styles.stack,
        {
        marginTop: 25,
        marginLeft: 20,
        height: 400,
        width: 400
        }
        ]}>

        <View style={styles.cardEntryDay1}>

        <View style={styles.card}>
              <View style={styles.cardBg} />
              <Text style={styles.text}>Create incident report</Text>

              <MaterialUnderlineTextbox   />
        </View>

        <MaterialRightIconTextbox placeholder="Attach Photo" style={styles.materialRightIconTextbox} />

        <MaterialUnderlineTextbox placeholder="Incident Description" style={styles.materialUnderlineTextbox3} />

        <View style={styles.rect}>
            <View style={styles.rect2} />
                <MaterialButtonDanger text="Cancel" style={styles.materialButtonDanger} />
            <View style={styles.rect3} />
                <MaterialButtonDanger text="Save" style={styles.materialButtonDanger1} />
            </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(244,244,244,1)"
  },
  headerWithIconAndTextButtons7: {
    width: 365,
    height: 62,
    backgroundColor: "transparent",
    alignSelf: "center"
  },
  stack: {
    position: "relative"
  },
  cardEntryDay1: {
    top: -0.23,
    left: -0.49,
    width: 343,
    height: 375,
    position: "absolute",
    flexDirection: "row"
  },
  card: {
    width: "100%",
    height: "120.27%"
  },
  cardBg: {
    top: "0.00%",
    left: "0.00%",
    width: "100.00%",
    height: "100.00%",
    backgroundColor: "rgba(245,245,245,1)",
    position: "absolute",
    borderRadius: 20,
    borderColor: "rgba(151,151,151,1)",
    borderWidth: 1,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowColor: "rgba(98,83,83,0.5)",
    shadowOpacity: 1,
    shadowRadius: 4
  },
  text: {
    color: "#121212",
    fontSize: 16,
    marginLeft: 13.51,
    marginTop: 38.77
  },
  materialUnderlineTextbox2: {
    width: 319,
    height: 43,
    //marginLeft: -320,
  //  marginTop: 71.77
  },
  materialRightIconTextbox: {
    marginLeft: -317,
    marginTop: 142.77
  },
  materialUnderlineTextbox3: {
    width: 319,
    height: 43,
    marginLeft: -320,
    marginTop: 235.77
  },
  rect: {
    top: 374.77,
    left: 29.51,
    width: 284,
    height: 52,
    //backgroundColor: "rgba(230, 230, 230,1)",
    position: "absolute",
    flexDirection: "row"
  },
  rect2: {
    flex: 1,
    //backgroundColor: "rgba(233, 233, 233,1)"
  },
  materialButtonDanger: {
    width: 100,
    height: 36,
    marginLeft: 14.99,
    marginTop: 8.15
  },
  rect3: {
    flex: 1,
  //  backgroundColor: "rgba(214, 214, 214,1)"
  },
  materialButtonDanger1: {
    width: 100,
    height: 36,
    marginLeft: 52,
    marginTop: 9.15
  }
});
