'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import React, { PropTypes } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import time from '../../utils/time';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  gridListItem: {
    paddingLeft:97,
    backgroundColor:'#fff',
  },

  gridListItemImgWrap: {
    height: 80,
    width: Dimensions.get('window').width - 130,
    position: 'relative'
  },
  gridListItemImg: {
    width: Dimensions.get('window').width - 130,
    height: 80
  },
  gridListItemContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    paddingBottom:15,
    paddingTop: 0,
    marginRight: 10,
    marginBottom: 15,

  },
  gridListItemTitle: {
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'left',
    color: theme.primary,
    paddingBottom:10,
    marginTop:3,
    elevation: 2,
  },

  gridListItemMeta: {
    position:'absolute',
    left:15,
    top:3,
    flex:1
  },
  gridListItemPlace: {
    marginTop:10,
    fontSize: 13,
    color: theme.darkgrey
  },
  gridListItemDistance: {
    color:theme.darkgrey,
    fontSize:14,
  },
  gridListItemTime: {
    fontSize: 14,
    color: theme.secondary,
    fontWeight:'normal'
  },
  gridListItemTimeEnd: {
    color:theme.darkgrey,
  },
  gridListItemDay: {
    fontWeight:'bold'
  },
  gridListItemIconsWrapper__left:{

  },
  gridListItemIconsWrapper: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: -5,
    marginBottom: 5,
  },
  gridListItemIcon: {
    color: theme.darkgrey,
    fontWeight:'normal',
    fontSize: 12
  },
  gridListItemIcon__alert: {
    color: theme.secondary
  },
  timeline: {
    position:'absolute',
    top:0,
    bottom:0,
    left:77,
    width:3,
    backgroundColor: '#eee'
  },
  timelineCircle: {
    backgroundColor: theme.secondary,
    borderColor:theme.light,
    position:'absolute',
    left:66,
    borderWidth:3,
    width:26,
    height:26,
    borderRadius:13,
    top:0
  },
  timelineCircleInner: {
    borderRadius:7,
    width:14,
    height:14,
    backgroundColor:theme.light,
    top:3,
    left:3
  }
});

export default React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired,
    handlePress: PropTypes.func.isRequired,
    rowId: PropTypes.number
  },

  render() {
    const item = this.props.item;
    const lastInSection = this.props.lastInSection;
    const timepoint = time.formatEventTime(item.startTime, item.endTime);
    const startDay = time.getEventDay(item.startTime);
    const coverImage = item.coverImage;

    return <TouchableNativeFeedback onPress={this.props.handlePress}  delayPressIn={100} background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={styles.gridListItem}>

        <View style={styles.gridListItemContent}>
          <Text style={styles.gridListItemTitle}>{item.name}</Text>

          <View style={styles.gridListItemImgWrap}>
            <Image
              source={{ uri: coverImage }}
              style={styles.gridListItemImg} />

          </View>

          <Text style={styles.gridListItemPlace}>{item.locationName} {this.props.currentDistance}</Text>

        </View>

        <View style={styles.timeline} />
        <View style={styles.timelineCircle}>
          <View style={styles.timelineCircleInner} />
        </View>

        <View style={styles.gridListItemMeta}>
            {false && Platform.OS === 'android' &&
            <Text style={[styles.gridListItemTime, styles.gridListItemDay]}>{startDay}</Text>
            }
            <Text style={styles.gridListItemTime}>{timepoint.time}</Text>
            <Text style={[styles.gridListItemTime, styles.gridListItemTimeEnd]}>{timepoint.endTime}</Text>
        </View>

      </View>
    </TouchableNativeFeedback>;
  }
});
