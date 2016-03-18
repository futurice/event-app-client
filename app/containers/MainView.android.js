'use strict'

import React, {
  Component,
  View,
  Navigator,
  StatusBar,
  BackAndroid
} from 'react-native'

/* Containers */
import CalendarView from './CalendarView';
import EventMapView from './EventMapView';
import CompetitionView from './CompetitionNavigator';
import FeedView from './FeedView';
import ProfileView from './ProfileView';
import RegistrationView from '../components/registration/RegistrationView';

const AndroidTabs = require('react-native-scrollable-tab-view');
const theme = require('../style/theme');
const IconTabBar = require('../components/common/IconTabBar');

const AndroidTabNavigation = React.createClass({
  render() {
    return (
      <AndroidTabs
        tabBarPosition={'top'}
        tabBarUnderlineColor={theme.accent}
        tabBarBackgroundColor={theme.primary}
        tabBarActiveTextColor={'#FFF'}
        initialPage={2}
        tabBarInactiveTextColor={'#FFF'}
        renderTabBar={() => <IconTabBar rippleColor={'rgba(255,255,255,.2)'} />}
      >
        <EventMapView navigator={this.props.navigator} tabLabel='map' />
        <CalendarView navigator={this.props.navigator} tabLabel='event-note' />
        <FeedView navigator={this.props.navigator} tabLabel='whatshot' />
        <CompetitionView tabLabel='equalizer' />
        <ProfileView tabLabel='person' />
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

  constructor(props) {
    super(props)
  }

  renderScene(route, navigator) {
    _navigator = navigator;
    if (route.component) {
      const RouteComponent = route.component;
      return <RouteComponent navigator={_navigator} route={route} {...this.props} />
    }
  }

  render() {
    return (
      <View style={{flex:1}}>

      <StatusBar backgroundColor={theme.primaryDarker} />

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
      <RegistrationView />
    </View>
    )
  }
};
