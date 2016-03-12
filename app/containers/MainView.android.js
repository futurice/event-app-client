'use strict'

import React, {
  Component,
  View,
  Navigator,
  StatusBar,
  Text,
  ToolbarAndroid,
  BackAndroid
} from 'react-native'


/* Containers */
import { connect } from 'react-redux';
import CalendarView from './CalendarView';
import EventMapView from './EventMapView';
import CompetitionView from './CompetitionView';
import PhotosView from './PhotosView';
import Tabs from '../constants/Tabs';

const AndroidTabs = require('react-native-scrollable-tab-view');
const theme = require('../style/theme');
const Icon = require('react-native-vector-icons/Ionicons');
const IconTabBar = require('../components/common/IconTabBar');


const AndroidTabNavigation = React.createClass({
  render () {
    return(
      <AndroidTabs
        tabBarPosition={'top'}
        tabBarUnderlineColor={theme.accent}
        tabBarBackgroundColor={theme.primary}
        tabBarActiveTextColor={theme.light}
        tabBarInactiveTextColor={'rgba(255,255,255,.8)'}
        renderTabBar={() => <IconTabBar rippleColor={'rgba(255,255,255,.2)'} />}
      >

        <PhotosView navigator={this.props.navigator} tabLabel='android-image' />
        <CalendarView navigator={this.props.navigator} tabLabel='android-calendar' />
        <EventMapView navigator={this.props.navigator} tabLabel='android-map' />
        <CompetitionView tabLabel='android-star' />
      </AndroidTabs>

    )
  }
});


let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

export default class App extends Component {

  constructor (props) {
    super(props)
  }

  renderScene (route, navigator) {
    _navigator = navigator;
    if (route.component) {
      const Component = route.component
      return <Component navigator={_navigator} route={route} {...this.props} />
    }
  }

  render () {


    return (
      <View style={{flex:1}}>

      <StatusBar backgroundColor={theme.primaryDark} />

      <Navigator
        initialRoute={{
          component: AndroidTabNavigation,
          name: 'Whappu'
        }}
        renderScene={this.renderScene}
        configureScene={() => ({
          ...Navigator.SceneConfigs.FloatFromBottomAndroid
        })}
      />

    </View>
    )
  }
};
