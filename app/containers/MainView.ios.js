'use strict';

import React, { PropTypes } from 'react';

import {
  TabBarIOS,
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
import IntroView from '../components/registration/IntroView';
import LightBox from '../components/lightbox/LightBox';
import errorAlert from '../utils/error-alert';

const theme = require('../style/theme');
// const Icon = require('react-native-vector-icons/Ionicons');
const Icon = require('react-native-vector-icons/MaterialIcons');

import ICONS from '../constants/Icons';

const MainView = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    currentTab: PropTypes.string.isRequired
  },

  _onChangeTab(tab) {
    this.props.dispatch(NavigationActions.changeTab(tab));
  },

  render() {

    const {
      dispatch,
      errors,
      currentTab,
      isIntroViewOpen,
      isWelcomeScreenOpen
    } = this.props;


    const immutableError = errors.get('error');
    if (immutableError) {
      const error = immutableError.toJS();
      errorAlert(dispatch, _.get(error, 'header'), _.get(error, 'message'));
    }

    if (isIntroViewOpen || isWelcomeScreenOpen) {
      return <IntroView />
    };

    return (
      <View style={{flex:1}}>
        <TabBarIOS tintColor={theme.secondaryLight} translucent={false} barTintColor={theme.primary} >


          <TabBarIOS.Item
            icon={ICONS.MAP}
            title=''
            selected={currentTab === Tabs.MAP}
            onPress={() => { this._onChangeTab(Tabs.MAP); }}>
            <EventMapView />
          </TabBarIOS.Item>

          <Icon.TabBarItem
            iconName='access-time'
            selectedIconName='access-time'
            title=''
            selected={currentTab === Tabs.CALENDAR}
            onPress={() => { this._onChangeTab(Tabs.CALENDAR); }}>
            <CalendarView />
          </Icon.TabBarItem>

          <TabBarIOS.Item
            icon={ICONS.CHATS}
            /* TODO badge={'•'} */
            title=''
            selected={currentTab === Tabs.FEED}
            onPress={() => { this._onChangeTab(Tabs.FEED); }}>
            <FeedView />
          </TabBarIOS.Item>

          <Icon.TabBarItem
            iconName='equalizer'
            selectedIconName='equalizer'
            title=''
            selected={currentTab === Tabs.ACTION}
            onPress={() => { this._onChangeTab(Tabs.ACTION); }}>
            <CompetitionView />
          </Icon.TabBarItem>

          <Icon.TabBarItem
            iconName='person-outline'
            selectedIconName='person'
            title=''
            selected={currentTab === Tabs.SETTINGS}
            onPress={() => { this._onChangeTab(Tabs.SETTINGS); }}>
            <SettingsView />
          </Icon.TabBarItem>
        </TabBarIOS>

        <RegistrationView />
        <LightBox />
      </View>
    );
  }
});

const select = store => {
  return {
    currentTab: store.navigation.get('currentTab'),
    errors: store.errors,
    isIntroViewOpen: store.registration.get('isIntroViewOpen'),
    isWelcomeScreenOpen: store.registration.get('isWelcomeScreenOpen')
  }
};

export default connect(select)(MainView);
