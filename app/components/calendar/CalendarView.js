'use strict';

var React = require('react-native');

import EventList from '../calendar/EventList';
import AnnouncementList from './AnnouncementList';

var {
  StyleSheet,
  View
} = React;
import { connect } from 'react-redux';

import _ from 'lodash';

import theme from '../../style/theme';
import * as AnnouncementActions from '../../actions/announcement';
import ProgressBar from 'ProgressBarAndroid';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: theme.primary
  },
  announcementView: {
    height: 100
  },
  eventView: {
    flex: 1
  },
  sectionHeaderText: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF'
  }
});

var AnnouncementEvent = React.createClass({

  getInitialState() {
    return { };
  },

  componentDidMount() {
    console.log("Mounted");
  },

  render() {
    console.log("Composite render", this);
    return (
      <View style={styles.container}>
        <AnnouncementList style={styles.announcementView} />
        <EventList navigator={this.props.navigator} route={this.props.route} style={styles.eventView} />
      </View>
    );
  }
});

const select = store => {
    return { };
};

export default connect(select)(AnnouncementEvent);
