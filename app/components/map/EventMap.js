'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Platform,
  PropTypes,
  Text,
  TouchableHighlight
} from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

const Icon = require('react-native-vector-icons/Ionicons');
import analytics from '../../services/analytics';
import EventDetail from '../calendar/EventDetail';
import time from '../../utils/time';
import theme from '../../style/theme';

const VIEW_NAME = 'EventMap';

EventMap.propTypes = {
  navigator: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired
}

class EventMap extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
    analytics.viewOpened(VIEW_NAME);
  }

  onCalloutPress(event) {
    this.props.navigator.push({
      component: EventDetail,
      name: event.name,
      model: event
    });
  }

  render() {
    const allEvents = [].concat(this.props.events);
    const events = allEvents.filter(event => {
      return event.location && !!event.location.latitude && !!event.location.longitude;
    });

    const markers = events.map((event, i) =>
      <MapView.Marker image={require('../../../assets/marker.png')}
        key={i} coordinate={event.location}>
        <MapView.Callout onPress={this.onCalloutPress.bind(this, event)}>
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
        </MapView.Callout>
      </MapView.Marker>
    );

    return (
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
    );
  }
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
  }
});

const select = store => {
  return {
    events: store.event.get('list').toJS()
  };
};

export default connect(select)(EventMap);
