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
  TouchableOpacity,
  WebView
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


//  user-scalable=yes, width=device-width, height=device-height, target-densitydpi=device-dpi, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.5
// user-scalable=yes, width=device-width, height=device-height


const imageHtml = `
<html>
  <head>
    <meta name="viewport" content="user-scalable=yes, width=device-width, target-densitydpi=device-dpi, initial-scale=1.5,  minimum-scale=1.0, maximum-scale=3.0" />
    <style>
      body {
        min-height:100%;
        position:relative;
        background: tomato;
      }
      * { margin:0; padding:0; }
      img {
        width: 100%;
        display: inline-block;
        margin:0 auto;
      }
      #container {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
      }
      #scroller {
        width:100%;
        height: 100%;
        position:relative;
        white-space: nowrap;
      }
    </style>
  </head>
  <body>
    <div id="container">
      <div id="scroller">
        <img src="https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/venue.png" />
        <img src="https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/venue.png" />
        <img src="https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/venue.png" />
        <img src="https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/venue.png" />
      </div>
    </div>
  </body>
</html>
`;

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
        <WebView
         html={imageHtml}
         scalesPageToFit={false}
         style={{flex: 1}}
        >

        </WebView>
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
