'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
var React = require('react-native');
var {
  Image,
  PropTypes,
  StyleSheet,
  Dimensions,
  Text,
  View
} = React;

//import Icon from 'react-native-vector-icons/Ionicons';
import time from '../../utils/time';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  gridListItem: {
    width: Dimensions.get('window').width,
    flex: 1,
    paddingTop:260
  },

  gridListItemImgWrap: {
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    height: 260,
    width: Dimensions.get('window').width,
  },
  gridListItemImg: {
    width: Dimensions.get('window').width,
    height: 260
  },
  gridListItemImgColorLayer: {
    backgroundColor:'#333',
    opacity: 0.7,
    position: 'absolute',
    left: 0, top: 0, bottom: 0, right: 0
  },

  gridListItemTitleWrap: {
    position:'absolute',
    bottom:20,
    left:20,
  },
  gridListItemTitle: {
    fontSize: 25,
    lineHeight:27,
    fontWeight: 'bold',
    textAlign: 'left',
    color: theme.light,
    paddingBottom:10
  },

  gridListItemMeta: {
    backgroundColor:'#eee',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:15,
    paddingLeft:20,
    paddingRight:20,
    flex:1
  },
  gridListItemMeta__block: {
    flexDirection:'column',
  },
  gridListItemPlace: {
    color: '#888',
    fontSize: 13
  },
  gridListItemDistance: {
    color: '#888',
    textAlign:'right',
    fontSize:13
  },
  gridListItemTime: {
    paddingRight:15,
    color: theme.secondary,
    fontSize: 13
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
    rowId: PropTypes.number
  },

  render() {
    const item = this.props.item;
    const timepoint = time.formatEventTime(item.startTime, item.endTime, {formatLong: true});
    const coverImage = item.coverImage ? item.coverImage.replace('https://', 'http://') : '';

    return <View style={styles.gridListItem}>
        <View style={styles.gridListItemImgWrap}>
          <Image
            source={{ uri: coverImage }}
            style={styles.gridListItemImg} />
          <View style={[
            styles.gridListItemImgColorLayer
          ]} />
          <View style={styles.gridListItemTitleWrap}>
            <Text style={styles.gridListItemTitle}>{item.name}</Text>
          </View>
        </View>

          <View style={styles.gridListItemMeta}>
            <View style={styles.gridListItemMeta__block}>
              <Text style={styles.gridListItemTime}>{timepoint.date}</Text>
              <Text style={styles.gridListItemTime}>{timepoint.time} - {timepoint.endTime}</Text>
            </View>

            <View style={styles.gridListItemMeta__block}>
              <Text style={styles.gridListItemPlace}>{item.locationName}</Text>
              {this.props.currentDistance !== null && <View>
                <Text style={styles.gridListItemDistance}>{this.props.currentDistance}</Text>
              </View>}
            </View>
          </View>
          {/*

          <View style={styles.gridListItemIconsWrapper}>
            {item.teemu && <Text style={styles.gridListItemIcon}>
              <Icon name='university' size={15} /> Emäteemu!</Text>}
            {timepoint.onGoing && <Text style={styles.gridListItemIcon}>Käynnissä ny!</Text>}
            {timepoint.startsSoon && <Text style={styles.gridListItemIcon}>Alkaa kohta!</Text>}
          </View>
          */}
      </View>;
  }
});
