'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
var React = require('react-native');
var {
  Image,
  PropTypes,
  StyleSheet,
  Dimensions,
  Text,
  TouchableHighlight,
  View
} = React;

import Icon from 'react-native-vector-icons/Ionicons';
import time from '../../utils/time';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  gridListItem: {
    width: Dimensions.get('window').width,
    flex: 1,
    height: 200
  },

  gridListItemImgWrap: {
    height: 200,
    width: Dimensions.get('window').width,
    position: 'absolute'
  },
  gridListItemImg: {
    width: Dimensions.get('window').width,
    height: 200
  },
  gridListItemImgColorLayer: {
    // backgroundColor is set programmatically on render() based on rowId
    opacity: 0.5,
    position: 'absolute',
    left: 0, top: 0, bottom: 0, right: 0
  },

  gridListItemContent: {
    elevation: 2,
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  gridListItemTitle: {
    fontSize: 23,
    lineHeight:26,
    fontWeight: 'bold',
    textAlign: 'left',
    color: theme.light,
    paddingBottom:10
  },

  gridListItemMeta: {
    flex:1
  },
  gridListItemPlace: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#ddd'
  },
  gridListItemDistance: {
    color:'#ddd',
    fontSize:14,
  },
  gridListItemTime: {
    fontSize: 15,
    color: theme.secondary,
    fontWeight: 'bold',
  },
  gridListItemIconsWrapper__left:{
    position: 'absolute',
    left: 20,
    bottom: 15,
  },
  gridListItemIconsWrapper: {
    position: 'absolute',
    right: 20,
    bottom: 15,
  },
  gridListItemIcon: {
    color: theme.light,
    opacity: 0.9,
    height: 20,
    fontSize: 14
  }
});

const DEFAULT_IMG = 'https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/events/bad-finance.jpg';


export default React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired,
    handlePress: PropTypes.func.isRequired,
    rowId: PropTypes.number
  },

  render() {
    const item = this.props.item;
    const timepoint = time.formatEventTime(item.startTime, item.endTime);
    const coverImage = DEFAULT_IMG; //item.coverImage ? item.coverImage.replace('https://', 'http://') : '';

    return <TouchableHighlight onPress={this.props.handlePress} underlayColor={'transparent'}>
      <View style={styles.gridListItem}>
        <View style={styles.gridListItemImgWrap}>
          <Image
            source={{ uri: coverImage }}
            style={styles.gridListItemImg} />
          <View style={[
            styles.gridListItemImgColorLayer,
            { backgroundColor:theme.primary }
          ]} />
        </View>

        <View style={styles.gridListItemContent}>
          <Text style={styles.gridListItemTitle}>{item.name}</Text>
          <View style={styles.gridListItemMeta}>
            <Text style={styles.gridListItemTime}>{timepoint.time} - {timepoint.endTime}</Text>
            <Text style={styles.gridListItemPlace}>{item.locationName}</Text>

          </View>

          {this.props.currentDistance !== null && <View style={styles.gridListItemIconsWrapper__left}>
            <Text style={styles.gridListItemDistance}>{this.props.currentDistance}</Text>
          </View>}

        </View>
      </View>
    </TouchableHighlight>;
  }
});
