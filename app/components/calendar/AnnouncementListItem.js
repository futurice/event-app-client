'use strict';
import React, {
  Image,
  StyleSheet,
  PropTypes,
  Text,
  View
} from 'react-native';

import theme from '../../style/theme';
import time from '../../utils/time';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.secondary,
  },
  imgWrap:{
    height:150,
    flex:1,
  },
  img: {
    height: 150,
  },
  text: {
    color: '#888',
  },
  textContainer:{
    padding:20,
    backgroundColor:'#FFF'
  },
  timestampText: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: 'white',
    backgroundColor: 'transparent'
  },
  imgColorLayer: {
    backgroundColor: theme.dark,
    opacity: 0.4,
    elevation:1,
    position: 'absolute',
    left: 0, top: 0, bottom: 0, right: 0
  },
});

export default React.createClass({

  propTypes: {
    item: PropTypes.object.isRequired
  },

  // TODO: parse away the Finnish-part of the message?
  // TODO: set some fallback-image?
  // jscs:disable maximumLineLength,requireCamelCaseOrUpperCaseIdentifiers
  render() {
    const item = this.props.item;
    // const text = item.message;
    const fallbackImage = 'http://ttyy.kuvat.fi/kuvat/Wappu/Teekkarikaste/Korikuvat/Jussi/_PTE6061.jpg?img=smaller';
    const langSeparator = '-------';
    const text = item.message.indexOf(langSeparator) > 0 ?
      item.message.split(langSeparator)[1].trim() : item.message;

    return (
      <View style={styles.container}>
        {item.picture &&

          <View style={styles.imgWrap}>
            <Image
              source={{ uri: item.picture || fallbackImage}}
              style={styles.img}
            >
            <View style={styles.imgColorLayer} />
            <Text style={styles.timestampText}>
              {time.getTimeAgo(item.created_time)}
            </Text>
          </Image>
          </View>
        }
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    );
  }
});
