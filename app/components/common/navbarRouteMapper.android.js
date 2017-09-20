/*eslint-disable react/display-name*/
/*react-eslint misfires for jsx-returning functions*/

/**
 * Navigation Bar for IOS
 * Used with Navigator
 * https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/Navigator/NavigationBarSample.js
 */


import React from 'react';
import {
  StyleSheet,
  View,
  ActionSheetIOS,
  Platform,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import Text from '../Text';

const Icon = require('react-native-vector-icons/Ionicons');
import theme from '../../style/theme';
import ICONS from '../../constants/Icons';
const { width } = Dimensions.get('window');

let showShareActionSheet = function(url) {
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: url
    },
  (error) => { /* */ },
  (success, method) => {
    /* */
  });
  }
}

let NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    const isChildPage = index > 0;

    if (!isChildPage) {
      return <View style={{ flex: 1, width: (width - 200) / 2, backgroundColor: 'green' }} />;
    }
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={() => {
          navigator.pop();
      }}>
        <Image source={ICONS.ARROW_BACK} style={styles.navBarIcon} />
      </TouchableHighlight>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    if (route.actions) {
      return (
        <TouchableHighlight
        onPress={() => {
          showShareActionSheet(route.post.link)
        }}
        >
          <Icon name='ios-upload-outline' style={styles.navBarIcon} />
        </TouchableHighlight>
        );
    }
    return <View style={{ flex: 1, width: (width - 200) / 2, backgroundColor: 'green' }} />;
  },

  Title: function(route, navigator, index, navState) {

    if (route.showName) {
      return (
        <Text style={styles.navBarTitle}>
        {route.name}
        </Text>
      );
    }
    return (
      <View style={styles.navBarLogoWrap}>
        <Image
          source={require('../../../assets/futurice-logo.png')}
          style={styles.navBarLogo} />
      </View>
    );
  }
};

var styles = StyleSheet.create({

  navBarLogoWrap:{
    backgroundColor: 'red',
    flex:1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: (width / 2) - 175,
    width: 200,
    alignItems:'center',
    justifyContent: 'center',
  },
  navBarButton:{
    color:'#FFFFFF',
    padding:10,
    fontSize:16,
    textAlign:'center',
  },
  navBarIcon:{
    color:'#FFFFFF',
    margin:6,
    marginLeft:15,
    marginRight:10,
    padding: 6,
    fontSize:28,
    width:28,
    textAlign:'center',
  },
  navBarLogo:{
    top: 0,
    width: 89,
    height: 18,
  },
  navBarTitle:{
    padding:10,
    fontSize:16,
    lineHeight: 24,
    color:'#FFFFFF',
    textAlign:'center',
  }
});

module.exports = NavigationBarRouteMapper;
