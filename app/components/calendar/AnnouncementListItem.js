'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import React, {
  Image,
  StyleSheet,
  PropTypes,
  Text,
  View,
  Linking
} from 'react-native';
import Loader from '../common/Loader';
import ParsedText from 'react-native-parsed-text';
import theme from '../../style/theme';
import time from '../../utils/time';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#eee',
  },
  card:{
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding:20,
    marginBottom:15,
    backgroundColor: theme.light,
    elevation:2,
    borderRadius:0,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  imgWrap:{
    flex:1,
    backgroundColor: '#DDD',
    height:140,
    marginBottom:15,
    margin:-20,
  },
  img: {
    flex:1,
  },
  text__title:{
    color: theme.secondary,
    marginBottom:10,
    fontWeight:'bold',
  },
  text: {
    color: '#888',
    fontSize:12,
  },
  textContainer:{
    flex:1,
    padding:0,
    backgroundColor:theme.light,
  },
  timestampText: {
    position: 'absolute',
    top: 15,
    right: 15,
    fontSize:12,
    color: '#eee',
    backgroundColor: 'transparent'
  },
  imgColorLayer: {
    backgroundColor: theme.dark,
    opacity: 0.4,
    elevation:1,
    position: 'absolute',
    left: 0, top: 0, bottom: 0, right: 0
  },
  url: {
    color: theme.primary
  }
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
    const fallbackImage = 'https://storage.googleapis.com/wappuapp/assets/wappu-team-says.jpg';

    if (!item) {
      return <Loader />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.card}>
        <View style={styles.imgWrap}>
          <Image
          source={{ uri: item.picture || fallbackImage}}
          style={styles.img}
          >
            <View style={styles.imgColorLayer} />
          </Image>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text__title}>WAPPU TEAM SAYS: </Text>
          <ParsedText
            style={styles.text}
            parse={
              [
                {type: 'url', style: styles.url, onPress: this.handleUrlPress}
              ]
            }
          >
            {item.message}
          </ParsedText>

        </View>
        <Text style={styles.timestampText}>
          {time.getTimeAgo(item.created_time)}
        </Text>
        </View>
      </View>
    );
  },

  handleUrlPress(url) {
    Linking.openURL(url);
  }
});
