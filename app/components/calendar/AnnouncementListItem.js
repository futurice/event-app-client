'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import React, {
  Image,
  StyleSheet,
  PropTypes,
  Text,
  Animated,
  Easing,
  View
} from 'react-native';

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
    padding:15,
    margin:20,
    backgroundColor: theme.light,
    elevation:2,
    borderRadius:2,
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
    margin:-15,
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
});

export default React.createClass({

  propTypes: {
    item: PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      announcementAnimation: new Animated.Value(0)
    };
  },

  // TODO: parse away the Finnish-part of the message?
  // TODO: set some fallback-image?
  // jscs:disable maximumLineLength,requireCamelCaseOrUpperCaseIdentifiers
  render() {
    Animated.timing(this.state.announcementAnimation, {duration:300, easing:Easing.ease, toValue: 1}).start();
    const item = this.props.item;
    const fallbackImage = 'https://storage.googleapis.com/wappuapp/assets/wappu-intro.jpg';

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.card,
          {opacity:this.state.announcementAnimation,
          transform:[
            {scale:this.state.announcementAnimation.interpolate({
              inputRange: [0, 1], outputRange: [1.05,1]
            })
          }]
        }]}>
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
          <Text style={styles.text}>{item.message}</Text>

        </View>
        <Text style={styles.timestampText}>
          {time.getTimeAgo(item.created_time)}
        </Text>
        </Animated.View>
      </View>
    );
  }
});
