'use strict'

import React, { Component, PropTypes } from 'react';

import {
  View,
  Navigator,
  StatusBar,
  BackAndroid
} from 'react-native'

import { connect } from 'react-redux';
import _ from 'lodash';


import { changeTab } from '../actions/navigation';
import CalendarView from './CalendarView';
import EventMapView from './EventMapView';
import CompetitionView from './CompetitionNavigator';
import FeedView from './FeedView';
import ProfileView from './ProfileView';
// import Header from '../components/common/Header';
import Header from '../components/common/CenterHeader';
import Tabs from '../constants/Tabs';

const AndroidTabs = require('react-native-scrollable-tab-view');
const theme = require('../style/theme');
const IconTabBar = require('../components/common/MdIconTabBar');


const ANDROID_TAB_ORDER = [
  Tabs.MAP,
  Tabs.CALENDAR,
  Tabs.FEED,
  Tabs.ACTION,
  Tabs.SETTINGS,
];
const initialTab = 2;


class AndroidTabNavigation extends Component {
  constructor(props) {
    super(props);

    this.onChangeTab = this.onChangeTab.bind(this);
  }

  onChangeTab({ i }) {
    this.props.changeTab(ANDROID_TAB_ORDER[i]);
  }

  render() {
    const {
      navigator,
      currentTab,
    } = this.props;

    return (
    <View style={{ flex: 1 }}>
      <Header
        title={null}
        backgroundColor={theme.secondary}
        currentTab={currentTab}
        setFeedSortType={this.props.setFeedSortType}
        navigator={navigator}
      />
      <AndroidTabs
        onChangeTab={this.onChangeTab}
        initialPage={initialTab}
        tabBarPosition={'bottom'}
        tabBarBackgroundColor={theme.secondary}
        tabBarActiveTextColor={theme.accent}
        tabBarInactiveTextColor={'#A097C3'}
        locked={true}
        scrollWithoutAnimation={true}

        renderTabBar={() => <IconTabBar />}
      >
        <EventMapView tabLabel={{ image: 'MENU_MAP_ON' }} />
        <CalendarView navigator={this.props.navigator} tabLabel={{ image: 'MENU_TIME_ON' }} />
        <FeedView navigator={this.props.navigator} tabLabel={{ image: 'MENU_CHAT_ON' }} />
        <CompetitionView tabLabel={{ image: 'MENU_STATS_ON' }} />
        <ProfileView navigator={this.props.navigator}  tabLabel={{ image: 'MENU_PROFILE_ON' }} />
      </AndroidTabs>
    </View>
    )
  }
};

const mapDispatchToProps = {
  changeTab,
};

const select = store => ({
  currentTab: store.navigation.get('currentTab'),
});

export default connect(select, mapDispatchToProps)(AndroidTabNavigation);
