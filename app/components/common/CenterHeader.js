'use strict';

import React, { PropTypes, Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.secondary,
    elevation: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarLogo:{
    width:89,
    height:18,
  },
});


class CenterHeader extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Image
          source={require('../../../assets/futurice-logo.png')}
          style={styles.navBarLogo} />
      </View>
    );
  }
};


export default CenterHeader;
