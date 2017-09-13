'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import React, { PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  View
} from 'react-native';

import Text from '../Text';
import Icon from 'react-native-vector-icons/Ionicons';
import time from '../../utils/time';
import theme from '../../style/theme';
import { SCREEN_SMALL } from '../../utils/responsive';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  gridListItem: {
    width,
    flex: 1,
    minHeight: 310,
    margin: 0,
    paddingTop: 30,
    paddingBottom: 30,
    marginBottom: 0,
    paddingHorizontal: 20,

  },

  bottomBorder: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.white,
  },

  gridListItemImgWrap: {
    height: 250,
    width: width / 2,
    overflow: 'hidden',
    position: 'absolute',
    right: 20,
    borderWidth: 10,
    borderColor: theme.secondary,
  },
  gridListItemImg: {
    height: 230,
    width: (width / 2) - 20,
  },
  gridListItemImgColorLayer: {
    opacity: 0.5,
    position: 'absolute',
    left: 0, top: 0, bottom: 0, right: 0
  },

  gridListItemContent: {
    elevation: 2,
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    width: (width / 1.666),
  },
  gridListItemTitle: {
    fontSize: SCREEN_SMALL ? 34 : 40,
    lineHeight: SCREEN_SMALL ? 38 : 44,
    fontWeight: 'normal',
    textAlign: 'left',
    color: theme.accent,
    paddingBottom:10
  },

  gridListItemMeta: {
    flex:1
  },
  gridListItemPlace: {
    fontWeight: 'normal',
    fontSize: SCREEN_SMALL ? 17 : 20,
    color: theme.pink,
  },
  gridListItemDistance: {
    color:'#ddd',
    fontSize:14,
  },
  gridListItemTimeBlock: {
    marginBottom: 20,
  },
  gridListItemTime: {
    fontSize: SCREEN_SMALL ? 22 : 26,
    color: theme.white,
    fontWeight: 'normal',
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



export default React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired,
    handlePress: PropTypes.func.isRequired,
    rowId: PropTypes.number
  },

  render() {
    const item = this.props.item;
    const timepoint = time.formatEventTime(item.startTime, item.endTime);
    const coverImage = item.coverImage;

    return <TouchableHighlight onPress={this.props.handlePress} underlayColor={'transparent'}>
      <View style={styles.gridListItem}>
        <View style={styles.gridListItemImgWrap}>
          <Image
            source={{ uri: coverImage }}
            style={styles.gridListItemImg} />
          <View style={[
            styles.gridListItemImgColorLayer,
            { backgroundColor:theme.secondary }
          ]} />
        </View>

        <View style={styles.gridListItemContent}>
          <View style={styles.gridListItemMeta}>
            <View style={styles.gridListItemTimeBlock}>
              <Text style={styles.gridListItemTime}>{timepoint.time}  - </Text>
              <Text style={styles.gridListItemTime}>{item.endTime ? `${timepoint.endTime}` : ''}</Text>
            </View>
            <Text style={styles.gridListItemTitle}>{item.name}</Text>
            <Text style={styles.gridListItemPlace}>{item.locationName}</Text>

          </View>

          {this.props.currentDistance !== null && <View style={styles.gridListItemIconsWrapper__left}>
            <Text style={styles.gridListItemDistance}>{this.props.currentDistance}</Text>
          </View>}

        </View>
        <View style={styles.bottomBorder} />
      </View>
    </TouchableHighlight>;
  }
});
