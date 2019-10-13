import React, {Component} from 'react';
import {Icon} from 'native-base';

class StatusIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let customIcon;

    if (this.props.cant === 0) {
      customIcon = (
        <Icon
          style={{color: '#77F48A'}}
          active
          type="Feather"
          name="check-circle"
        />
      );
    } else {
      customIcon = (
        <Icon style={{color: '#FFE165'}} active type="Feather" name="info" />
      );
    }

    return customIcon;
  }
}

export default StatusIcon;
