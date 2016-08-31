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

const VIEW_NAME = 'EventMap';

class EventMap extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
    this.props.dispatch(EventActions.fetchEvents());
    this.props.dispatch(MarkerActions.fetchMarkers());
  }

  render() {


    return (
      <View style={{flex:1}}>
        TEST
      </View>
    );
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
}});


export default EventMap;
