'use strict';

var React = require('react-native');
var {
  Image,
  ScrollView,
  StyleSheet,
  ListView,
  Dimensions,
  Text,
  Navigator,
  TouchableHighlight,
  ActivityIndicatorIOS,
  View,
} = React;
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import time from '../../utils/time';

import theme from '../../style/theme';
import * as EventActions from '../../actions/event';
import EventListItem from './EventListItem';
import EventDetail from './EventDetail';
import ProgressBar from 'ProgressBarAndroid';

// TODO zebra

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary
  },
  listView: {
    flex: 1
  },
  sectionHeader:{
    backgroundColor: '#FFF',
    opacity: 0.88,
    padding: 10,
    paddingLeft: 20
  },
  sectionHeaderText: {
    textAlign: 'left',
    color: theme.primary
  }
});

var EventList = React.createClass({

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      })
    };
  },

  componentDidMount() {
    this.props.dispatch(EventActions.fetchEvents());
  },

  renderLoadingView() {
    return <View style={styles.container}>
      <ProgressBar styleAttr='Inverse' />

      <ActivityIndicatorIOS
        color={theme.primary}
        animating={true}
        style={{ alignItems: 'center', justifyContent: 'center', height: 80 }}
        size='large' />
      <Text>Ladataan tapahtumia...</Text>
    </View>;
  },

  navigateToSingleEvent(model){
    this.props.navigator.push({
      component: EventDetail,
      name: model.name,
      actions: ['share'],
      model
    });
  },

  renderSectionHeader(sectionData, sectionId) {
    return <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>
        {time.formatEventTime(sectionData[0].startTime, null, {formatLong:true}).date}
      </Text>
    </View>;
  },

  renderEventItem(item) {
    return <EventListItem
      item={item}
      handlePress={() => this.navigateToSingleEvent(item)} />;
  },

  render() {
    switch (this.props.eventsListState) {
      case 'loading':
        return this.renderLoadingView();
      case 'failed':
        return (
          <View style={styles.container}>
            <Text>Tapahtumia ei saatu haettua :(</Text>
          </View>
        );
      default:
        return (
          <ListView
            dataSource={this.state.dataSource.cloneWithRowsAndSections(this.props.events)}
            renderSectionHeader={this.renderSectionHeader}
            renderRow={this.renderEventItem}
            style={styles.listView} />
        );
    }
  }
});

const select = store => {
    return {
      events: store.event.get('list').toJS(),
      eventsListState: store.event.get('listState')
    }
};

export default connect(select)(EventList);
