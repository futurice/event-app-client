'use strict';

import React, {
  TabBarIOS,
  PropTypes,
  View
} from 'react-native';
import { connect } from 'react-redux';
import CalendarView from './CalendarView';
import EventMapView from './EventMapView';
import CompetitionView from './CompetitionNavigator';
import FeedView from './FeedView';
import SettingsView from './ProfileView';
import Tabs from '../constants/Tabs';
import * as NavigationActions from '../actions/navigation';
import RegistrationView from '../components/registration/RegistrationView';

const theme = require('../style/theme');
const Icon = require('react-native-vector-icons/Ionicons');



const MainView = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    currentTab: PropTypes.string.isRequired
  },

  _onChangeTab(tab) {
    this.props.dispatch(NavigationActions.changeTab(tab));
  },

  render() {
    return (
      <View style={{flex:1}}>
        <TabBarIOS tintColor={theme.secondary} translucent={false} >
          <Icon.TabBarItem
            iconName='ios-clock-outline'
            selectedIconName='ios-clock'
            title='Events'
            selected={this.props.currentTab === Tabs.CALENDAR}
            onPress={() => { this._onChangeTab(Tabs.CALENDAR); }}>
            <CalendarView />
          </Icon.TabBarItem>

          <Icon.TabBarItem
            iconName='ios-location-outline'
            selectedIconName='ios-location'
            title='Map'
            selected={this.props.currentTab === Tabs.MAP}
            onPress={() => { this._onChangeTab(Tabs.MAP); }}>
            <EventMapView />
          </Icon.TabBarItem>

          <Icon.TabBarItem
            iconName='ios-flame-outline'
            selectedIconName='ios-flame'
            title='Buzz'
            selected={this.props.currentTab === Tabs.FEED}
            onPress={() => { this._onChangeTab(Tabs.FEED); }}>
            <FeedView />
          </Icon.TabBarItem>

          <Icon.TabBarItem
            iconName='stats-bars'
            selectedIconName='stats-bars'
            title='Ranking'
            selected={this.props.currentTab === Tabs.ACTION}
            onPress={() => { this._onChangeTab(Tabs.ACTION); }}>
            <CompetitionView />
          </Icon.TabBarItem>

          <Icon.TabBarItem
            iconName='ios-person-outline'
            selectedIconName='ios-person'
            title='Settings'
            selected={this.props.currentTab === Tabs.SETTINGS}
            onPress={() => { this._onChangeTab(Tabs.SETTINGS); }}>
            <SettingsView />
          </Icon.TabBarItem>
        </TabBarIOS>

        <RegistrationView />
      </View>
    );
  }
});

const select = store => {
  return {
    currentTab: store.navigation.get('currentTab')
  }
};

export default connect(select)(MainView);
