

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
      <View style={styles.container}>
        {!IOS && <Toolbar title={name} backgroundColor={theme.secondary} navigator={this.props.navigator} /> }

        {url &&
          <WebView
            source={{uri: url}}
            scalesPageToFit={false}
            style={styles.webview}
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
    flex:1,
    paddingTop: IOS ? 0 : 52
  },
  webview: {
    flex: 1,
    backgroundColor: theme.secondary,
  }
});


export default WebViewer;
