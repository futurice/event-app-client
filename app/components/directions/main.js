'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { find } from 'lodash';

import theme from '../../style/theme';
import Text from '../Text';
import Background from '../background';
import PlatformTouchable from '../common/PlatformTouchable';

import DirectionsTab from './DirectionsTab';
import FloorsTab from './FloorsTab';
import AboutTab from './AboutTab';

const isIOS = Platform.OS === 'ios';


const tabs = [
  { name: 'Directions', color: 'white', component: DirectionsTab },
  { name: 'Floors', color: 'yellow', component: FloorsTab },
  { name: 'About', color: 'pink', component: AboutTab },
];

class DirectionsView extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedTab: null };
    this.selectTab = this.selectTab.bind(this);
    this.renderTab = this.renderTab.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.closeTab = this.closeTab.bind(this);
  }

  selectTab(tab) {
    const nextTab = this.state.selectedTab === tab
      ? null
      : tab;
    this.setState({ selectedTab: nextTab });
  }

  closeTab() {
    this.setState({ selectedTab: null });
  }

  renderTab(tab) {
    return (
      <PlatformTouchable
        onPress={() => this.selectTab(tab.name)}
      >
        <Text style={[styles.title, styles[tab.color]]}>
          {tab.name}
        </Text>
      </PlatformTouchable>
    );
  }

  renderTabs() {
    return tabs.map(this.renderTab);
  }

  renderContent() {
    const { selectedTab } = this.state;
    if (!selectedTab) {
      return this.renderTabs();
    }

    const tab = find(tabs, (tab) => tab.name === selectedTab);
    const OpenTab = tab.component;

    return <OpenTab color={tab.color} closeTab={this.closeTab} />
  }

  render() {

    return (
      <View style={{ flex: 1, backgroundColor: theme.secondary }}>
        <Background color="purple" />
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            {this.renderContent()}
          </View>
        </ScrollView>
      </View>
    );
  }
};

// <Text style={styles.paragraph}><Text style={styles.bold}>Terms and Conditions ("Terms")</Text></Text>
// <Text style={styles.paragraph}>Last updated: May 27, 2017</Text>


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


export default DirectionsView;
