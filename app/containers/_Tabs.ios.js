'use strict';

import React from 'react';

import {
  Component,
  StyleSheet,
  Navigator,
  TabBarIOS,
  PropTypes,
  View
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import CalendarView from './CalendarView';
import EventMapView from './EventMapView';
import CompetitionView from './CompetitionNavigator';
import FeedView from './FeedView';
import SettingsView from './ProfileView';
import Tabs from '../constants/Tabs';
import * as NavigationActions from '../actions/navigation';
import RegistrationView from '../components/registration/RegistrationView';
import errorAlert from '../utils/error-alert';

const theme = require('../style/theme');
const Icon = require('react-native-vector-icons/Ionicons');
import ICONS from '../constants/Icons';


const IOSTabNavigation = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    currentTab: PropTypes.string.isRequired
  },

  _onChangeTab(tab) {
    this.props.dispatch(NavigationActions.changeTab(tab));
  },

  render() {
    /*
    const immutableError = this.props.errors.get('error');
    if (immutableError) {
      const error = immutableError.toJS();
      errorAlert(this.props.dispatch, _.get(error, 'header'), _.get(error, 'message'));
    }
    */

    return (
      <View style={{flex:1}}>
        <TabBarIOS tintColor={theme.secondary} translucent={true} >

          <Icon.TabBarItem
            iconName='ios-location-outline'
            selectedIconName='ios-location'
            title=''
            selected={this.props.currentTab === Tabs.MAP}
            onPress={() => { this._onChangeTab(Tabs.MAP); }}>
            <EventMapView navigator={this.props.navigator} />
          </Icon.TabBarItem>

          <Icon.TabBarItem
            iconName='ios-clock-outline'
            selectedIconName='ios-clock'
            title=''
            selected={this.props.currentTab === Tabs.CALENDAR}
            onPress={() => { this._onChangeTab(Tabs.CALENDAR); }}>
            <CalendarView navigator={this.props.navigator} />
          </Icon.TabBarItem>

          <TabBarIOS.Item
            icon={ICONS.HEART}
            badge={333}
            iconName='flame'
            selectedIconName='ios-flame'
            title=''
            selected={this.props.currentTab === Tabs.FEED}
            onPress={() => { this._onChangeTab(Tabs.FEED); }}>
            <FeedView navigator={this.props.navigator} />
          </TabBarIOS.Item>

          <Icon.TabBarItem
            iconName='stats-bars'
            selectedIconName='stats-bars'
            title=''
            selected={this.props.currentTab === Tabs.ACTION}
            onPress={() => { this._onChangeTab(Tabs.ACTION); }}>
            <CompetitionView navigator={this.props.navigator} />
          </Icon.TabBarItem>

          <Icon.TabBarItem
            iconName='ios-person-outline'
            selectedIconName='ios-person'
            title=''
            selected={this.props.currentTab === Tabs.SETTINGS}
            onPress={() => { this._onChangeTab(Tabs.SETTINGS); }}>
            <SettingsView navigator={this.props.navigator} />
          </Icon.TabBarItem>
        </TabBarIOS>

        <RegistrationView />
      </View>
    );
  }
});

const select = store => {
  return {
    currentTab: store.navigation.get('currentTab'),
    errors: store.errors
  }
};

export default connect(select)(IOSTabNavigation);
