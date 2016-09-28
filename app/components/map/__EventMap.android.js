'use strict';
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Linking,
  Text,
  Image,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

const {height, width} = Dimensions.get('window');

import _ from 'lodash';
const Icon = require('react-native-vector-icons/Ionicons');
const MDIcon = require('react-native-vector-icons/MaterialIcons');
import analytics from '../../services/analytics';
import * as MarkerActions from '../../actions/marker';
import * as EventActions from '../../actions/event';
import EventDetail from '../calendar/EventDetail';
import Loader from '../common/Loader';
import ZoomableImage from '../common/ZoomableImage';
import time from '../../utils/time';
import theme from '../../style/theme';
import LoadingStates from '../../constants/LoadingStates';

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
      <View>
        <ZoomableImage
          style={{ width, height }}
          imageWidth={2000}
          imageHeight={2000}
          source={require('../../../assets/venue.png')}
        />
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
    bottom: 0
   // justifyContent: 'flex-end',
   // alignItems: 'center',
}});


export default EventMap;
