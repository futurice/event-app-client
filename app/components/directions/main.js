import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Platform, Animated, Easing, TouchableOpacity } from 'react-native';

import theme from '../../style/theme';
import Text from '../Text';

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
const tabAnimations = tabs.map(() => new Animated.Value(0));

class DirectionsView extends Component {
  constructor(props) {
    super(props);

    this.state = { tabAnimations };

    this.animateItems = this.animateItems.bind(this);
    this.selectTab = this.selectTab.bind(this);
    this.renderTab = this.renderTab.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.closeTab = this.closeTab.bind(this);
  }

  componentDidMount() {
    this.animateItems();
  }

  animateItems() {
    tabAnimations.map((animation, index) => {
      Animated.timing( animation, { toValue: 1, delay: 66 * (index + 1), duration: 200, easing: Easing.easeInOutBack })
      .start();
    });
  }

  selectTab(tab) {
    this.props.navigator.push({
      component: tab.component,
      name: tab.name,
      color: tab.color,
      closeTab: this.closeTab,
      showBack: true,
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
  }

  renderTab(tab, index) {
    return (
      <Animated.View style={{
        opacity: this.state.tabAnimations[index],
        transform: [{ translateX: this.state.tabAnimations[index].interpolate({ inputRange: [0, 1], outputRange: [20, 0] })}]
      }}>
        <TouchableOpacity onPress={() => this.selectTab(tab)}>
          <Text style={[styles.title, styles[tab.color]]}>{tab.name}</Text>
        </TouchableOpacity>
      </Animated.View>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.transparent
  },
  content: {
    padding: 30,
    paddingTop: isIOS ? 40 : 40,
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
