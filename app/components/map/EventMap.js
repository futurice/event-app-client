'use strict';

import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';
import EventDetail from '../calendar/EventDetail';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

class EventMap extends Component {
  constructor() {
    super();
  }

  onCalloutPress(event) {
    console.log(event);
    this.props.navigator.push({
      component: EventDetail,
      name: event.name,
      actions: ['share'],
      model: event
    });
  }

  render() {
    const { events } = this.props;
    console.log(this.props);
    const markers = events.filter(event => !!event.location.latitude && !!event.location.longitude).map((event, i) => <MapView.Marker key={i} onCalloutPress={this.onCalloutPress.bind(this, event)} title={event.name} coordinate={event.location} />);
    return (
        <MapView style={styles.map}
          initialRegion={{
            latitude: 61.4931758,
            longitude: 23.7602363,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsPointsOfInterest={false}
          showsCompass={false}
          showsScale={false}
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
          rotateEnabled={false}>
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
});

const select = store => {
  return {
    events: store.event.get('list').toJS()
  };
};

export default connect(select)(EventMap);
