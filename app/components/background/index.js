import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    minWidth: width,
    minHeight: height,
    right: 0,
    left: 0,
    top: 0,
    opacity: 1,
    zIndex: 0,
  }
});

const images = {
  purple: require('../../../assets/patterns/pattern-purple.png'),
  yellow: require('../../../assets/patterns/pattern-yellow.png')
}

class BackgroundLayer extends Component {
  static propTypes = {
    color: PropTypes.string
  };

  render() {

    const { color } = this.props;

    return (<Image
      resizeMode={'cover'}
      source={images[color] || images.purple}
      style={styles.image}
      />
    )
  }

};

export default BackgroundLayer;
