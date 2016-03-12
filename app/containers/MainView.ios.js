'use strict';

import React, {
  Component,
  TabBarIOS,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import CalendarView from './CalendarView';
import EventMapView from './EventMapView';
import CompetitionView from './CompetitionView';
import FeedView from './FeedView';
import Tabs from '../constants/Tabs';
import * as NavigationActions from '../actions/navigation';

const theme = require('../style/theme');
const Icon = require('react-native-vector-icons/Ionicons');

const MainView = React.createClass({
  _onChangeTab(tab) {
    this.props.dispatch(NavigationActions.changeTab(tab));
  },
  render() {
    return (
      <TabBarIOS tintColor={theme.primaryDark} barTintColor={theme.primary}>
       <Icon.TabBarItem
          iconName='ios-clock-outline'
          selectedIconName='ios-clock'
          badge='3'
          badgeBackgroundColor={theme.accent}
          title='Tapahtumat'
          selected={this.props.currentTab === Tabs.CALENDAR}
          onPress={() => { this._onChangeTab(Tabs.CALENDAR); }}>
          <CalendarView />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-location-outline'
          selectedIconName='ios-location'
          title='Kartta'
          selected={this.props.currentTab === Tabs.MAP}
          onPress={() => { this._onChangeTab(Tabs.MAP); }}>
          <EventMapView />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-play-outline'
          selectedIconName='ios-play'
          title='Äction'
          selected={this.props.currentTab === Tabs.ACTION}
          onPress={() => { this._onChangeTab(Tabs.ACTION); }}>
          <CompetitionView />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-flame-outline'
          selectedIconName='ios-flame'
          title='Feed'
          selected={this.props.currentTab === Tabs.FEED}
          onPress={() => { this._onChangeTab(Tabs.FEED); }}>
          <FeedView />
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
});

const select = store => {
  return {
    currentTab: store.navigation.get('currentTab')
  }
};

export default connect(select)(MainView);
