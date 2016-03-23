'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Platform,
  PropTypes,
  Linking,
  Text,
  TouchableHighlight
} from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

import _ from 'lodash';
const Icon = require('react-native-vector-icons/Ionicons');
import analytics from '../../services/analytics';
import * as MarkerActions from '../../actions/marker';
import * as EventActions from '../../actions/event';
import EventDetail from '../calendar/EventDetail';
import Loader from '../common/Loader';
import time from '../../utils/time';
import theme from '../../style/theme';
import LoadingStates from '../../constants/LoadingStates';

const MARKER_IMAGES = {
  EVENT: require('../../../assets/marker.png'),
  RESTAURANT: require('../../../assets/fork-knife.png'),
  TOILET: require('../../../assets/toilet.png'),
  TAXI: require('../../../assets/taxi.png'),
  STORE: require('../../../assets/shopping-cart.png'),
  ALKO: require('../../../assets/wine.png')
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
      model: event
    });
  }

  // Enables swiping between tabs
  // 20px of right part of map can not be used to navigate map
  renderSwipeHelperOverlay() {
    if (Platform.OS === 'ios') {
      return;
    }

    return <View style={styles.androidSwipeHelper}></View>;
  }

  render() {
    const allEvents = [].concat(this.props.events);
    const events = allEvents.filter(event => {
      const hasLocation = event.location && !!event.location.latitude && !!event.location.longitude;
      return hasLocation && this._isEventBetweenSelectedTime(event);
    });

    let locations = _.map(events, event => {
      return _.merge({}, event, {type: 'EVENT'});
    });
    locations = locations.concat(this.props.markers);

    // Filter markers which do not have correct type
    locations = locations.filter(location => {
      return _.has(MARKER_IMAGES, location.type);
    });
    const markers = locations.map((location, i) => {
      return <MapView.Marker
        centerOffset={{x: 0, y:-20}}
        anchor={{x: 0.5, y: 0.9}}
        image={MARKER_IMAGES[location.type]}
        key={i} coordinate={location.location}
      >
        {
          location.type === 'EVENT'
            ? this._renderEventMarker(location)
            : this._renderStaticMarker(location)
        }
      </MapView.Marker>;
    });

    return (
      <View style={{flex:1}}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: 61.4931758,
            longitude: 23.7602363,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsIndoors={false}
          rotateEnabled={false}
        >
          {markers}
        </MapView>

        {this.renderSwipeHelperOverlay()}
        {this._maybeRenderLoading()}
      </View>
    );
  }

  _renderEventMarker(event) {
    return <MapView.Callout onPress={this.onEventMarkerPress.bind(this, event)}>
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
    </MapView.Callout>;
  }

  _renderStaticMarker(location) {
    let calloutProps = {};
    if (location.url) {
      calloutProps = {
        onPress: () => Linking.openURL(location.url)
      }
    }

    return <MapView.Callout {...calloutProps}>
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
    </MapView.Callout>;
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

  _maybeRenderLoading() {
    if (this.props.loading) {
      return <View style={styles.loaderContainer}>
        <Loader />
      </View>;
    }

    return false;
  }

  _isEventBetweenSelectedTime(event) {
    return true;
  }
}

EventMap.propTypes = {
  navigator: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  markers: PropTypes.array.isRequired,
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
    top: 10,
    left: 10,
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
  androidSwipeHelper:{
    position: 'absolute',
    right: 0,
    width: 20,
    top: 0,
    bottom: 0,
    elevation: 1,
    backgroundColor: 'transparent',
    opacity: 0
  }
});

const select = store => {
  return {
    events: store.event.get('list').toJS(),
    markers: store.marker.get('list').toJS(),
    loading: store.event.get('listState') === LoadingStates.LOADING ||
             store.marker.get('listState') === LoadingStates.LOADING
  };
};

export default connect(select)(EventMap);
