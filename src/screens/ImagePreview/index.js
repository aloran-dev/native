import React, {Component} from 'react';

import ImageView from 'react-native-image-view';

export default class ImagePreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let images = [
      {
        source: {
          uri: this.props.navigation.getParam('uri'),
        },
        title: '',
        width: 806,
        height: 720,
      },
    ];
    return (
      <ImageView
        images={images}
        imageIndex={0}
        isVisible={true}
        onClose={() => this.props.navigation.goBack()}
      />
    );
  }
}
