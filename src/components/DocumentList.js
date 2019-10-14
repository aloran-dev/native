import React, {Component} from 'react';

import DocumentRow from './DocumentRow';

class DocumentList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var callback = res => {
      this.props.modalcallback(res);
    };
    const lista = this.props.documentList;
    const documentList = lista.map((item, index) => (
      <DocumentRow item={item} key={index} callback={callback} />
    ));

    return documentList;
  }
}

export default DocumentList;
