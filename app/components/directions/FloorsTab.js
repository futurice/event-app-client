'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';

import theme from '../../style/theme';
import Text from '../Text';
import PlatformTouchable from '../common/PlatformTouchable';
import Content from './Content';

const isIOS = Platform.OS === 'ios';

class FloorsTab extends Component {

  render() {
    const { color, closeTab } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <PlatformTouchable
          onPress={() => closeTab()}
        >
          <Text style={[styles.title, styles[color]]}>Floors</Text>
        </PlatformTouchable>
        <Content>
          <Text style={styles.paragraph}>Terms and Conditions ("Terms")</Text>
          <Text style={styles.paragraph}>Last updated: May 27, 2017</Text>
        </Content>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.purpleLayer
  },
  content: {
    padding: 30,
    paddingTop: isIOS ? 40 : 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 46,
    marginBottom: 20,
    textDecorationLine: 'underline',
    color: theme.white,
  },
  subTitle: {
    color: theme.pink,
    textDecorationLine: 'underline',
    marginBottom: 15,
    fontSize: 17
  },
  paragraph: {
    fontSize: 17,
    marginBottom: 15,
    color: theme.white
  },
  yellow: {
    color: theme.accent,
  },
  white: {
    color: theme.white,
  },
  pink: {
    color: theme.pink
  }
});


export default FloorsTab;
