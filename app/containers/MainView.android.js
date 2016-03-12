'use strict'

import React, {
  Component,
  View,
  StyleSheet,
  Navigator,
  StatusBar,
  Text,
  ToolbarAndroid,
  Dimensions
} from 'react-native'


/* Containers */
import { connect } from 'react-redux';
import CalendarView from './CalendarView';
import EventMapView from './EventMapView';
import CompetitionView from './CompetitionView';
import Tabs from '../constants/Tabs';

var AndroidTabs = require('react-native-scrollable-tab-view');
var theme = require('../style/theme');
var Icon = require('react-native-vector-icons/Ionicons');
var IconTabBar = require('../components/common/IconTabBar');

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      tab: 'events',
      modal:false
    }
  }

  componentWillReceiveProps (props) {
    const {application} = props
    this.setState({
      tab: application.tab
    });
  }

  openModal() {
    this.setState({
      modal: true
    });
  }

  closeModal() {
    this.setState({
      modal: false
    });
  }

  render () {
    const {tab, page} = this.state;
    var self = this;

    return (
      <View style={styles.container}>

      <StatusBar backgroundColor={theme.primaryDark} />

      <AndroidTabs
        style={styles.tabs}
        tabBarPosition={'top'}
        tabBarUnderlineColor={theme.accent}
        tabBarBackgroundColor={theme.primary}
        tabBarActiveTextColor={theme.light}
        tabBarInactiveTextColor={'rgba(255,255,255,.8)'}
        renderTabBar={() => <IconTabBar rippleColor={'rgba(255,255,255,.2)'} />}
      >

        <CalendarView tabLabel='android-calendar' />
        <EventMapView tabLabel='android-map' />
        <CompetitionView tabLabel='android-star' />
      </AndroidTabs>

      {this.state.modal ? <View style={styles.modal}><Text onPress={this.closeModal.bind(this)} style={{color:'#FFF',fontSize:30}}>Close Me</Text></View> : null }

    </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content:{
    flex:1,
    backgroundColor:'#FFF'
  },
  tabs:{
    backgroundColor:'#f4f4f4',
  },
  tabItemSelected:{
    backgroundColor:'red',
    color:'red'
  },
  modal:{
    backgroundColor:theme.accent,
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
})
