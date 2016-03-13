'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import EventDetail from '../calendar/EventDetail';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

class EventMap extends Component {
  constructor() {
    super();
  }

  onCalloutPress(event) {
    this.props.navigator.push({
      component: EventDetail,
      name: event.name,
      actions: ['share'],
      model: event
    });
  }

  render() {
    const allEvents = [].concat(this.props.events);
    const events = allEvents.filter(event => {
      return event.location && !!event.location.latitude && !!event.location.longitude;
    });

    const markers = events.map((event, i) =>
      <MapView.Marker image={require('../../../assets/marker.png')} key={i} coordinate={event.location}>
        <MapView.Callout style={styles.callout}>
          <TouchableHighlight
            underlayColor='transparent'
            style={styles.calloutTouchable}
            onPress={this.onCalloutPress.bind(this, event)}
          >
            <Text>{event.name}</Text>
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
    padding: 0
  },
  calloutTouchable: {
    padding: 10
  }
});

const select = store => {
  const events = [];
  const groupedEvents = store.event.get('list').toJS();

  Object.keys(groupedEvents).forEach(key => {
    groupedEvents[key].map(event => events.push(event));
  });

  return {
    events: events
  };
};

export default connect(select)(EventMap);
