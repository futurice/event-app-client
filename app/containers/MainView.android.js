'use strict'

import React, {
  Component,
  View,
  Navigator,
  StatusBar,
  PropTypes,
  Animated,
  BackAndroid
} from 'react-native'

/* Containers */
import { connect } from 'react-redux';
import _ from 'lodash';
import CalendarView from './CalendarView';
import EventMapView from './EventMapView';
import CompetitionView from './CompetitionNavigator';
import FeedView from './FeedView';
import ProfileView from './ProfileView';
import RegistrationView from '../components/registration/RegistrationView';
import IntroView from '../components/registration/IntroView';
import LightBox from '../components/lightbox/LightBox';
import errorAlert from '../utils/error-alert';

const AndroidTabs = require('react-native-scrollable-tab-view');
const theme = require('../style/theme');
const IconTabBar = require('../components/common/IconTabBar');


const AndroidTabNavigation = React.createClass({
  propTypes: {
    navigator: PropTypes.object.isRequired
  },

  render() {
    return (
      <AndroidTabs
        initialPage={0}
        tabBarPosition={'top'}
        tabBarUnderlineColor={theme.stable}
        tabBarBackgroundColor={theme.secondary}
        tabBarActiveTextColor={theme.white}
        tabBarInactiveTextColor={theme.secondaryDark}
        renderTabBar={() => <IconTabBar rippleColor={theme.secondaryDark} />}
      >
        <FeedView navigator={this.props.navigator} tabLabel={{image: 'CHATS' }} scrollUp={this.scrollUp} scrollDown={this.scrollDown} />
        <CalendarView navigator={this.props.navigator} tabLabel={{icon: 'access-time' }} />
        <EventMapView navigator={this.props.navigator} tabLabel={{image: 'MAP' }} />
        <CompetitionView tabLabel={{icon: 'equalizer' }} />
        <ProfileView tabLabel={{icon: 'person-outline' }} />
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

class App extends Component {

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
    const {
      dispatch,
      errors,
      isIntroViewOpen,
      isWelcomeScreenOpen
    } = this.props;

    const immutableError = errors.get('error');
    if (immutableError) {
      const error = immutableError.toJS();
      errorAlert(dispatch, _.get(error, 'header'), _.get(error, 'message'));
    }

    if (isIntroViewOpen || isWelcomeScreenOpen) {
      return (
        <View style={{flex:1}}>
          <StatusBar backgroundColor={theme.secondaryBlur} />
          <IntroView />
        </View>
        );
    };

    return (
      <View style={{flex:1}}>

      <StatusBar backgroundColor={theme.secondaryDark} />

      <Navigator
        initialRoute={{
          component: AndroidTabNavigation,
          name: 'Futustonia'
        }}
        renderScene={this.renderScene}
        configureScene={() => ({
          ...Navigator.SceneConfigs.FloatFromBottomAndroid
        })}
      />
      <LightBox />
      <RegistrationView />
    </View>
    )
  }
}

const select = store => {
  return {
    currentTab: store.navigation.get('currentTab'),
    errors: store.errors,
    isIntroViewOpen: store.registration.get('isIntroViewOpen'),
    isWelcomeScreenOpen: store.registration.get('isWelcomeScreenOpen')
  }
};
export default connect(select)(App);
