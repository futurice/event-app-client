'use strict';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  WebView,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import theme from '../../style/theme';
import Toolbar from '../calendar/EventDetailToolbar';
const IOS = Platform.OS === 'ios';


class WebViewer extends Component {


  render() {

    let { url, name } = this.props.route;

    if (IOS && url.indexOf('https') < 0) {
      url = 'https://crossorigin.me/' + url;
    }

    return (
      <View style={{flex:1, paddingTop: IOS ? 10 : 52}}>
        {!IOS &&<Toolbar title={name} backgroundColor={theme.secondary} navigator={this.props.navigator} /> }

        {url &&
          <WebView
            source={{uri: url}}
            scalesPageToFit={false}
            style={{flex: 1}}
          />
        }
      </View>
    );
  }

}

WebViewer.propTypes = {
  url: PropTypes.string.isRequired,
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


export default WebViewer;
