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

import theme from '../../style/theme';
import * as EventActions from '../../actions/event';
import EventListItem from './EventListItem';
import EventDetail from './EventDetail';
import ProgressBar from 'ProgressBarAndroid';

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
  }
});

var EventList = React.createClass({

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
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
            dataSource={this.state.dataSource.cloneWithRows(this.props.events)}
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
