import React, {Component} from 'react';

import AntiDoppingRow from './AntiDoppingRow';

class AntiDoppingList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var callback = res => {
      this.props.modalcallback(res);
    };
    const lista = this.props.certificateList;
    const certificateList = lista.map((item, index) => (
      <AntiDoppingRow item={item} key={index} callback={callback} />
    ));

    return certificateList;
  }
}

export default AntiDoppingList;
