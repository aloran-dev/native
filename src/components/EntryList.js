import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';

import ResumeCard from '../components/ResumeCard';

class EntryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    // TODO: hardcoded, fix it later
    setTimeout(() => {
      this.state.isLoading = false;
      if (this.props.eventCards.length > 0) {
        this.setState({
          lista: this.props.eventCards,
        });
      }
    }, 2000);
  }

  render() {
    let cont;

    var callback = res => {
      this.props.entrycallback(res);
    };

    if (this.state.isLoading) {
      cont = <ActivityIndicator animating={this.state.isLoading} />;
    } else {
      let listaElementos = this.state.lista.map((item, index) => (
        <ResumeCard
          key={index}
          email={this.props.email}
          entryDay={item}
          callback={callback}
        />
      ));
      cont = listaElementos;
    }

    return cont;
  }
}

export default EntryList;
