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

import { SCREEN_SMALL } from '../../utils/responsive';
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

    this.props.navigator.push({
      component: tab.component,
      name: tab.name,
      color: tab.color,
      closeTab: this.closeTab,
      showName: true
    });


    return;
    const nextTab = this.state.selectedTab === tab
      ? null
      : tab;
    this.setState({ selectedTab: nextTab });
  }

  closeTab() {
    this.props.navigator.pop();
    // this.setState({ selectedTab: null });
  }

  renderTab(tab) {
    return (
      <PlatformTouchable
        onPress={() => this.selectTab(tab)}
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

    return this.renderTabs();

    // ending here already
    if (!selectedTab) {
      return this.renderTabs();
    }

    // const tab = find(tabs, (tab) => tab.name === selectedTab);
    // const OpenTab = tab.component;

    // return <OpenTab color={tab.color} closeTab={this.closeTab} />
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
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
    backgroundColor: theme.transparent
  },
  content: {
    padding: 30,
    paddingTop: isIOS ? 40 : 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: SCREEN_SMALL ? 38 : 46,
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
