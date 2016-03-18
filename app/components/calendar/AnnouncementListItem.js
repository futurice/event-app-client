'use strict';
import React, {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import theme from '../../style/theme';
import time from '../../utils/time';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark
  },
  image: {
    height: 150
  },
  text: {
    color: theme.light,
  },
  textContainer:{
    padding:20,
  },
  timestampText: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: 'white',
    backgroundColor: 'transparent'
  }
});

export default React.createClass({
  // TODO: parse away the Finnish-part of the message?
  // TODO: set some fallback-image?
  render() {
    const item = this.props.item;
    console.log(item);

    return (
      <View style={styles.container}>
        {item.picture &&
          <Image
            source={{ uri: item.picture }}
            style={styles.image}
          >
            <Text style={styles.timestampText}>
              {time.getTimeAgo(item.created_time)}
            </Text>
          </Image>
        }
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.message}</Text>
        </View>
      </View>
    );
  }
});
