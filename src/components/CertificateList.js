import React, {Component} from 'react';

import CertificateRow from './CertificateRow';

class CertificateList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var callback = res => {
      this.props.modalcallback(res);
    };
    const lista = this.props.certificateList;
    const certificateList = lista.map((item, index) => (
      <CertificateRow item={item} key={index} callback={callback} />
    ));

    return certificateList;
  }
}

export default CertificateList;
