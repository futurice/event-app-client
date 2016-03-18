'use strict';

var React = require('react-native');
var {
  Image,
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
    opacity: 0.8,
    elevation: 1,
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
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.light
  },

  gridListItemMeta: {
    textAlign: 'center'
  },
  gridListItemPlace: {
    fontSize: 18,
    color: '#BBBBBB'
  },
  gridListItemTime: {
    fontSize: 18,
    color: '#CF3C89',
    fontWeight: 'bold'
  },

  gridListItemIconsWrapper: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  gridListItemIcon: {
    color: theme.light,
    opacity: 0.9,
    height: 20,
    fontSize: 15
  }
});

export default React.createClass({
  render() {
    const item = this.props.item;
    const timepoint = time.formatEventTime(item.startTime, item.endTime);
    const coverImage = item.coverImage ? item.coverImage.replace('https://', 'http://') : ''

    return <TouchableHighlight onPress={this.props.handlePress} underlayColor={'transparent'}>
      <View style={styles.gridListItem}>
        <View style={styles.gridListItemImgWrap}>
          <Image
            source={{ uri: coverImage }}
            style={styles.gridListItemImg} />
          <View style={[
            styles.gridListItemImgColorLayer,
            { backgroundColor: this.props.rowId % 2 === 0 ? '#164140' : '#6e3b56' }
          ]} />
        </View>

        <View style={styles.gridListItemContent}>
          <Text style={styles.gridListItemTitle}>{item.name}</Text>
          <Text style={styles.gridListItemMeta}>
            <Text style={styles.gridListItemTime}>{timepoint.time} - {timepoint.endTime}, </Text>
            <Text style={styles.gridListItemPlace}>{item.locationName}</Text>
          </Text>
          <View style={styles.gridListItemIconsWrapper}>
            {item.teemu && <Text style={styles.gridListItemIcon}>
              <Icon name='university' size={15} /> Emäteemu!</Text>}
            {timepoint.onGoing && <Text style={styles.gridListItemIcon}>Käynnissä ny!</Text>}
            {timepoint.startsSoon && <Text style={styles.gridListItemIcon}>Alkaa kohta!</Text>}
          </View>
        </View>
      </View>
    </TouchableHighlight>;
  }
});
