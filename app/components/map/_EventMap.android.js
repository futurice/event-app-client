'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Platform,
  PropTypes,
  Linking,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import RNMapView from 'react-native-maps';
import { connect } from 'react-redux';

import _ from 'lodash';
const Icon = require('react-native-vector-icons/Ionicons');
const MDIcon = require('react-native-vector-icons/MaterialIcons');
import analytics from '../../services/analytics';
import * as MarkerActions from '../../actions/marker';
import * as EventActions from '../../actions/event';
import EventDetail from '../calendar/EventDetail';
import Loader from '../common/Loader';
import time from '../../utils/time';
import theme from '../../style/theme';
import LoadingStates from '../../constants/LoadingStates';

// Disable map on some devices
const DeviceInfo = require('react-native-device-info');
const Manufacturer = DeviceInfo.getManufacturer();
const OSVersion = DeviceInfo.getSystemVersion();
const disableMap = Platform.OS === 'android' && parseInt(OSVersion) >= 6 &&
  (Manufacturer.indexOf('Sony') >= 0 || Manufacturer === 'OnePlus');

const MARKER_IMAGES = {
  EVENT: require('../../../assets/marker.png'),
  RESTAURANT: require('../../../assets/marker__food.png'),
  TOILET: require('../../../assets/marker__toilet.png'),
  TAXI: require('../../../assets/marker__taxi.png'),
  STORE: require('../../../assets/marker__shop.png'),
  ALKO: require('../../../assets/marker__wine.png')
};

const VIEW_NAME = 'EventMap';

class EventMap extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
    this.props.dispatch(EventActions.fetchEvents());
    this.props.dispatch(MarkerActions.fetchMarkers());
    analytics.viewOpened(VIEW_NAME);
  }

  onEventMarkerPress(event) {
    this.props.navigator.push({
      component: EventDetail,
      name: event.name,
      model: event,
      disableTopPadding: true
    });
  }

  render() {
    const allEvents = [].concat(this.props.events.toJS());

    const firstFutureEvent = _
      .chain(allEvents)
      .filter(item => time.isEventInFuture(item.endTime))
      .sortBy(item => time.getTimeStamp(item.endTime))
      .head()
      .value();


    const events = allEvents.filter(event => {
      const hasLocation = event.location && !!event.location.latitude && !!event.location.longitude;
      return hasLocation && this._isEventBetweenSelectedTime(event, firstFutureEvent);
    });

    let locations = _.map(events, event => {
      return _.merge({}, event, {type: 'EVENT'});
    });
    locations = locations.concat(this.props.markers.toJS());

    // Filter markers which do not have correct type
    locations = locations.filter(location => {
      return _.has(MARKER_IMAGES, location.type);
    });
    const markers = locations.map((location, i) => {
      return <RNMapView.Marker
        centerOffset={{x: 0, y: location.type === 'EVENT' ? -20 : 0}}
        anchor={{x: 0.5, y: location.type === 'EVENT' ? 0.9 : 0.5}}
        image={MARKER_IMAGES[location.type]}
        key={i} coordinate={location.location}
      >
        {
          location.type === 'EVENT'
            ? this._renderEventMarker(location)
            : this._renderStaticMarker(location)
        }
      </RNMapView.Marker>;
    });

    if (disableMap){
      return ( this._renderDisabledMapAnnouncement(firstFutureEvent) );
    }

    return (
      <View style={{flex:1}}>
        <RNMapView style={styles.map}
          initialRegion={{
            latitude: 59.4370,
            longitude: 24.7536,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsUserLocation={Platform.OS === 'android' || this.props.locateMe}
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsIndoors={false}
          rotateEnabled={false}
        >
          {markers}
        </RNMapView>

        {this._renderSwipeHelperOverlay()}
        {this._maybeRenderLoading()}

        {this._renderFilterSelection()}
        {this._renderLocateMe()}

      </View>
    );
  }


  _renderDisabledMapAnnouncement(event) {
    return (<View style={styles.emptyWrap}>
      <View style={styles.emptyIconWrap}>
        <MDIcon name="nature-people" style={styles.emptyIcon} />
      </View>
      <View style={styles.emptyContent}>
        <Text style={styles.emptyTitle}>Oh noes!</Text>
        <Text style={styles.emptyText}>Event Map is not currently supported on your device. Be safe out there.</Text>
      </View>
    </View>);
  }

  _renderEventMarker(event) {
    return <RNMapView.Callout onPress={this.onEventMarkerPress.bind(this, event)}>
      <TouchableHighlight
        underlayColor='transparent'
        style={styles.calloutTouchable}
      >
        <View style={styles.callout}>
          <View>
            <View style={styles.calloutTitleWrap}>
              <Text style={styles.calloutTitle}>{event.name}</Text>
              <Icon style={styles.calloutIcon} name='ios-arrow-forward' />
            </View>
            <Text style={[styles.calloutInfo,{color:'#aaa', marginBottom:10}]}>
              {time.getEventDay(event.startTime)}
            </Text>
            <Text style={styles.calloutInfo}>{event.locationName}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </RNMapView.Callout>;
  }

  _renderStaticMarker(location) {
    let calloutProps = {};
    if (location.url) {
      calloutProps = {
        onPress: () => Linking.openURL(location.url)
      }
    }

    return <RNMapView.Callout {...calloutProps}>
      <TouchableHighlight
        underlayColor='transparent'
        style={styles.calloutTouchable}
      >
        <View style={styles.callout}>
          {
            location.url
              ? this._renderStaticUrlMarkerView(location)
              : this._renderStaticMarkerView(location)
          }
        </View>
      </TouchableHighlight>
    </RNMapView.Callout>;
  }

  _renderStaticUrlMarkerView(location) {
    return <View>
      <View style={styles.calloutTitleWrap}>
        <Text style={styles.calloutTitle}>{location.title}</Text>
        <Icon style={styles.calloutIcon} name='ios-arrow-forward' />
      </View>

      <Text style={[styles.calloutInfo, {color:'#aaa'}]}>
        {location.subtitle}
      </Text>
    </View>;
  }

  _renderStaticMarkerView(location) {
    return <View>
      <View style={styles.calloutTitleWrap}>
        <Text style={[styles.calloutTitle, {color:'#333'}]}>
          {location.title}
        </Text>
      </View>

      <Text style={[styles.calloutInfo, {color:'#aaa'}]}>
        {location.subtitle}
      </Text>
    </View>;
  }

  // Enables swiping between tabs
  // 20px of right part of map can not be used to navigate map
  _renderSwipeHelperOverlay() {
    if (Platform.OS === 'ios') {
      return;
    }

    return <View style={styles.androidSwipeHelper}></View>;
  }

  _renderFilterSelection() {

    const availableFilters = [
     {id:'24H', title:'SOON'},
     {id:'ALL', title:'ALL'}
    ];
    return (
      <View style={styles.filterSelection}>
      {
        availableFilters.map((filter) => {
          return this._renderFilterSelectionButton(filter)
        })
      }
      </View>
    );
  }

  _renderFilterSelectionButton(item) {
    return <View key={item.id}>
          <TouchableOpacity onPress={this._changeShowFilter.bind(this, item.id)}
          style={styles.filterSelectionButton}>
            <Text style={[styles.filterSelectionButtonText,
              {color: this.props.showFilter === item.id ? theme.secondary : '#999' }]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        </View>
  }

  _renderLocateMe() {
    return Platform.OS === 'ios' ? <View style={styles.locateButton}>
          <TouchableOpacity onPress={this._toggleLocateMe.bind(this,null)}
            style={styles.locateButtonText} >
            <Icon size={20} style={{ color:this.props.locateMe ? '#1D7BF7' : '#888' }} name='navigate' />
          </TouchableOpacity>
        </View> :
        false;
  }

  _changeShowFilter(filterName) {
    this.props.dispatch(EventActions.updateShowFilter(filterName));
  }

  _toggleLocateMe() {
    this.props.dispatch(EventActions.toggleLocateMe());
  }

  _maybeRenderLoading() {
    if (this.props.loading) {
      return <View style={styles.loaderContainer}>
        <Loader />
      </View>;
    }

    return false;
  }

  _isEventBetweenSelectedTime(event, firstFutureEvent) {
    switch (this.props.showFilter) {
      case '24H':
        return firstFutureEvent &&
               firstFutureEvent.endTime &&
               time.eventsBetweenHours(event.endTime, firstFutureEvent.endTime, 24);
      default:
        return true;
    }
  }
}

EventMap.propTypes = {
  navigator: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
  markers: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  callout: {
    padding: 0,
    flex:1,
    justifyContent:'space-between',
    alignItems:'flex-start',
    flexDirection:'row'
  },
  calloutTouchable: {
    padding: 6
  },
  calloutTitleWrap:{
    flex:1,
    flexDirection:'row',
  },
  calloutTitle:{
    fontWeight:'bold',
    color:theme.primary,
    fontSize:12,
    paddingRight:10,
  },
  calloutInfo:{
    fontSize:11,
  },
  calloutIcon:{
    top:Platform.OS === 'ios' ? 0 : 2,
    fontSize:14,
    color:theme.primary
  },
  filterSelection: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,.8)',
    elevation:2,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0
    },

    top: 12,
    left: 12,
    borderRadius: 3,
    height: 40,
    width: 110
  },
  filterSelectionButton: {
    padding: 10,
    paddingLeft: 12,
    paddingRight: 12
  },
  filterSelectionButtonText: {
    fontWeight: 'bold',
    fontSize: 11,
    color:'#aaa'
  },
  locateButton:{
    backgroundColor:'rgba(255,255,255,.8)',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0
    },
    borderRadius:2,
    justifyContent:'center',
    position:'absolute',
    right:12,
    top:12,
    width:40,
    height:40
  },
  locateButtonText:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingTop:5
  },
  androidSwipeHelper: {
    position: 'absolute',
    right: 0,
    width: 20,
    top: 0,
    bottom: 0,
    elevation: 1,
    backgroundColor: 'transparent',
    opacity: 0
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDD'
  },
  emptyIconWrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyIcon: {
    color: '#bbb',
    fontSize: 100
  },
  emptyContent: {
    paddingTop: 10,
    paddingBottom: 15,
    padding: 50,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 30,
    textAlign: 'center',
    color:'#666'
  },
  emptyText: {
    textAlign: 'center',
    color:'#999'
  }
});

const select = store => {

  return {
    locateMe: store.event.get('locateMe'),
    showFilter: store.event.get('showFilter'),
    events: store.event.get('list'),
    markers: store.marker.get('list'),
    loading: store.event.get('listState') === LoadingStates.LOADING ||
             store.marker.get('listState') === LoadingStates.LOADING
  };
};

export default connect(select)(EventMap);
