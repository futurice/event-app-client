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
  TouchableHighlight
} from 'react-native';
import Text from '../Text';

const Icon = require('react-native-vector-icons/Ionicons');
import theme from '../../style/theme';
import ICONS from '../../constants/Icons';

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
    return (<TouchableHighlight
      underlayColor={'transparent'}
      onPress={() => {
        if (index > 0) {
          navigator.pop();
        }
      }}>
      { index > 0 ?
        <Image source={ICONS.ARROW_BACK} style={styles.navBarIcon} /> :
        <View/>
      }
      </TouchableHighlight>
      )
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
    return null;
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
    flex:1,
    alignItems:'center'
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
    top:11,
    width:89,
    height:18,
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
