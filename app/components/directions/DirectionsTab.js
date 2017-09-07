'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Platform, Animated } from 'react-native';

import theme from '../../style/theme';
import Text from '../Text';
import PlatformTouchable from '../common/PlatformTouchable';
import Content from './Content';

const isIOS = Platform.OS === 'ios';

class DirectionsTab extends Component {
  render() {
    const { color, closeTab } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <PlatformTouchable
         onPress={() => closeTab()}
        >
          <Text style={[styles.title, styles[color]]}>Directions</Text>
        </PlatformTouchable>
        <Content>
          <Text style={styles.subTitle}>Address</Text>
          <Text style={styles.paragraph}>
            {`Finlandia Hall \nMannerheimintie 13e \n00100 Helsinki\n\nMain entrance: M4/K4`}
          </Text>
          <Text style={styles.subTitle}>Public transport</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Text style={styles.subTitle}>Taxi</Text>
          <Text style={styles.paragraph}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
          <Text style={styles.subTitle}>Parking</Text>
          <Text style={styles.paragraph}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
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


export default DirectionsTab;
