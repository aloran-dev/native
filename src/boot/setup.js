import React, { Component } from "react";
import { StyleProvider,Container } from "native-base";

import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

export default class Setup extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
      <Container>
        <App />
      </Container>
      </StyleProvider>
    );
  }
}
