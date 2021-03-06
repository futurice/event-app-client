'use strict';

import React from 'react-native';
var {
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
  View,
  PropTypes,
  Platform,
  Linking
} = React;
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ParallaxView from 'react-native-parallax-view';
import theme from '../../style/theme';
import Toolbar from './EventDetailToolbar';

import analytics from '../../services/analytics';
import time from '../../utils/time';
import locationService from '../../services/location';
import Button from '../common/Button';
import EventListItem from './EventListItem';
import EventDetailHero from './EventDetailHero';

const VIEW_NAME = 'EventDetail';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ddd',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0
  },
  detailEventImg: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  content: {
    padding: 20,
    backgroundColor:theme.light,
    flex: 1,
  },
  detailEventInfoContainer: {
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'center',
    padding:20,
    paddingTop:15,
    paddingBottom:15,
    backgroundColor:'#fff'
  },
  detailEventInfoWrapper: {
    flex:1,
    flexDirection:'row',
    alignItems:'flex-end',
  },
  detailEventInfoIcon: {
    fontSize:25,
    color:theme.secondary,
    marginTop:1,
    paddingRight:23,
    marginLeft:7,
    alignSelf:'center'
  },
  detailEventInfoAttending: {
    fontSize:14,
    color:'#777',
    alignSelf: 'center'
  },
  detailEventInfoTime: {
    color: '#000',
    fontSize: 15,
    alignSelf: 'center'
  },
  detailEventName: {
    backgroundColor: theme.light,
    textAlign: 'left',
    color: theme.primary,
    fontWeight: 'bold',
    fontSize: 25,
  },
  detailEventDescription: {
    color: '#666',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight:24,
    marginTop: 0,
  },

  navigationButtonWrapper: {
    margin: -20,
    marginTop: 0,
    marginBottom:0,
    backgroundColor: theme.light
  },
  navigationButton: {
    height: 50,
    backgroundColor: '#E9E9E9',
    borderColor: '#C7C7C7',
    borderWidth: 2
  },
  navigationButtonText: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 35,
    fontWeight: 'bold',
    color: '#8A8A8A',
    margin: 0,
    padding: 0
  },
  navigationButtonIcon: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    top: 10,
  },
  gridListItemMetaWrap:{
    flex:1,
    paddingBottom:10,
    borderBottomWidth:1,
    borderBottomColor:'#eee',
  },
  gridListItemMeta: {
    backgroundColor:'#fff',
    borderBottomWidth:0,
    borderBottomColor:'#eee',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    padding:15,
    paddingLeft:20,
    paddingRight:20,
    flex:1
  },
  gridListItemIcon:{
    color: theme.secondary,
    fontSize: 24,
    top:2
  },
  gridListItemMeta__block: {
    flexDirection:'column',
    alignItems:'center',
  },
  gridListItemMetaInfo__title:{
    color:'#000',
    fontSize:15,
  },
  gridListItemMetaInfo: {
    color: '#777',
  },
  gridListItemPlace:{
    color:'#777'
  },
  gridListItemDistance: {
    color: '#000',
    textAlign:'right',
    fontSize:15
  },
  gridListItemLeftIcon: {
    width:40,
    paddingRight:15,
    color: theme.secondary,
    fontSize: 15,
  },
  header:{
    position:'absolute',
    bottom:20,
    left:20,
    right:20,
    fontSize: 25,
    lineHeight:29,
    fontWeight: 'bold',
    textAlign: 'left',
    color: theme.light,
    elevation:2,
    paddingBottom:10
  },
  gridListItemImgColorLayer: {
    backgroundColor:'#333',
    opacity: 0.7,
    position: 'absolute',
    left: 0, top: 0, bottom: 0, right: 0
  }
});

const EventDetail = React.createClass({
  propTypes: {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
  },

  componentDidMount() {
    analytics.viewOpened(VIEW_NAME);
  },

  onPressBack() {
    this.props.navigator.pop();
  },

  render: function() {
    // TODO: stylize the "meta-elements"

    const model = this.props.route.model;
    const currentDistance = this.props.route.currentDistance;
    const timepoint = time.formatEventTime(model.startTime, model.endTime, { formatLong: true });
    const wrapperStyleAdd = {
      paddingTop: 0
    };
    const coverImage =  model.coverImage ? model.coverImage.replace('https://', 'http://') : '';

    return <View style={[styles.wrapper, wrapperStyleAdd]}>
      {(Platform.OS === 'android') ?
        <Toolbar title={timepoint.date} navigator={this.props.navigator} /> : null}


      <ParallaxView
          backgroundSource={{uri: coverImage}}
          windowHeight={300}
          style={{backgroundColor:'#eee'}}
          header={(
            <View style={{flex:1}}>
              <View style={styles.gridListItemImgColorLayer} />
              <Text style={styles.header}>
                  {model.name}
              </Text>
            </View>
          )}
      >
        <View style={{marginTop:10 }}>

            <View style={styles.gridListItemMetaWrap}>

            <View style={styles.gridListItemMeta}>
              <View style={styles.gridListItemMeta__block}>
                <Text style={styles.gridListItemLeftIcon}><MaterialIcon style={styles.gridListItemIcon} name='access-time'/> </Text>
              </View>

              <View style={[styles.gridListItemMeta__block, {alignItems: 'flex-start'}]}>
                <Text style={styles.gridListItemMetaInfo__title}>Time</Text>
                <Text style={styles.gridListItemPlace}>{timepoint.time} - {timepoint.endTime}</Text>
              </View>
            </View>


            <TouchableHighlight underlayColor={'#eee'}
              onPress={() => Linking.openURL(locationService.getGeoUrl(model))}>
            <View style={styles.gridListItemMeta}>
              <View style={styles.gridListItemMeta__block}>
                <Text style={styles.gridListItemLeftIcon}><MaterialIcon style={styles.gridListItemIcon} name='location-on'/> </Text>
              </View>

              <View style={[styles.gridListItemMeta__block, {alignItems: 'flex-start'}]}>
              <Text style={styles.gridListItemMetaInfo__title}>Location</Text>
                <Text style={styles.gridListItemPlace}>{model.locationName}</Text>
              </View>
            </View>
            </TouchableHighlight>

            { currentDistance !== '' && currentDistance &&
            <View style={styles.gridListItemMeta}>
              <View style={styles.gridListItemMeta__block}>
                <Text style={styles.gridListItemLeftIcon}><MaterialIcon style={styles.gridListItemIcon} name='redo'/> </Text>
              </View>

              <View style={[styles.gridListItemMeta__block, {alignItems: 'flex-start'}]}>
                <Text style={styles.gridListItemMetaInfo__title}>Distance from you</Text>
                <Text style={styles.gridListItemMetaInfo}>{currentDistance}</Text>
              </View>
            </View>
            }


            {model.teemu &&
            <View style={styles.gridListItemMeta}>
              <View style={styles.gridListItemMeta__block}>
                <Text style={styles.gridListItemLeftIcon}><Icon style={styles.gridListItemIcon} name='university'/> </Text>
              </View>

              <View style={[styles.gridListItemMeta__block, {alignItems: 'flex-start'}]}>
                <Text style={styles.gridListItemPlace}>Emäteemu</Text>
              </View>
            </View>
            }

            { model.facebookId &&
                <TouchableHighlight
                underlayColor={'#eee'}
                onPress={() =>
                  Linking.openURL(`https://www.facebook.com/events/${ model.facebookId }`)}
                >
                  <View style={styles.detailEventInfoContainer}>
                    <View style={styles.detailEventInfoWrapper}>
                      <Icon style={styles.detailEventInfoIcon} name='social-facebook' size={18}/>
                      <Text style={styles.detailEventInfoAttending}>
                      {model.attendingCount} {model.attendingCount ? 'attending' : ''}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              }
              </View>

              <View style={styles.content}>
                <Text style={styles.detailEventDescription}>{model.description}</Text>
              </View>

              <View style={styles.navigationButtonWrapper}>
                <Button style={{borderRadius:0}} onPress={() => Linking.openURL(locationService.getGeoUrl(model))}>Get me there!</Button>
              </View>
          </View>
      </ParallaxView>
    </View>
  }

});

export default EventDetail;
