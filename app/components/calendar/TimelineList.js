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
import moment from 'moment';

import theme from '../../style/theme';
import * as AnnouncementActions from '../../actions/announcement';
import * as EventActions from '../../actions/event';

import EventListItem from './EventListItem';
import EventDetail from './EventDetail';
import ProgressBar from 'ProgressBarAndroid';

const ANNOUNCEMENTS_SECTION = 'announcements';


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
  sectionHeader: {
    backgroundColor: theme.dark,
    opacity: 0.88,
    padding: 20,
    flex: 1
  },
  sectionHeaderText: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF'
  }
});

var TimelineList = React.createClass({

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      })
    };
  },

  componentDidMount() {
    // ...should these be throttled?
    this.props.dispatch(EventActions.fetchEvents());
    this.props.dispatch(AnnouncementActions.fetchAnnouncements());
  },

  navigateToSingleEvent(model) {
    this.props.navigator.push({
      component: EventDetail,
      name: model.name,
      actions: ['share'],
      model
    });
  },

  getListItems() {
    // TODO: Filter the past events away in here?
    let listSections = _.groupBy(this.props.events, event => moment(event.startTime).startOf('day').unix());
    const eventSectionsOrder = _.orderBy(_.keys(listSections));

    // Add the announcements-section to the listSections
    listSections[ANNOUNCEMENTS_SECTION] = this.props.announcements;

    // Make the order to be that the first section is the announcements, then comes event sections
    const listOrder = [ANNOUNCEMENTS_SECTION, ...eventSectionsOrder];

    return {
      sections: listSections,
      order: listOrder
    };
  },

  renderLoadingView() {
    // TODO: platform-specific if-else
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

  renderSectionHeader(sectionData, sectionId) {
    let sectionCaption = '';
    const sectionStartMoment = moment.unix(sectionId);

    // Announcement-section
    if (sectionId === ANNOUNCEMENTS_SECTION) {
      sectionCaption = 'News';
    }
    // Day-sections
    else if (sectionStartMoment.isSame(moment(), 'day')) {
      sectionCaption = 'Today';
    } else if (sectionStartMoment.isSame(moment().add(1, 'day'), 'day')) {
      sectionCaption = 'Tomorrow';
    } else {
      sectionCaption = moment.unix(sectionId).format('ddd D.M.YYYY');
    }

    sectionCaption = sectionCaption.toUpperCase();

    return <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{sectionCaption}</Text>
    </View>;
  },

  renderListItem(item, sectionId, rowId) {
    // TODO handlepress only for eventlistitem

    switch (item.timelineType) {
      case 'announcement':
        return <Text>{item.message}</Text>;

      default:
        return (
          <EventListItem
            item={item}
            rowId={rowId}
            handlePress={() => this.navigateToSingleEvent(item)} />
        );
    }
  },

  render() {
    switch (this.props.eventFetchState) {
      case 'loading':
        return this.renderLoadingView();
      case 'failed':
        return (
          <View style={styles.container}>
            <Text>Tapahtumia ei saatu haettua :(</Text>
          </View>
        );
      default:
        const items = this.getListItems();
        return <ListView
          dataSource={this.state.dataSource.cloneWithRowsAndSections(items.sections, items.order)}
          renderSectionHeader={this.renderSectionHeader}
          renderRow={this.renderListItem}
          style={styles.listView}
        />;
    }
  }
});

const select = store => {
    let announcements = store.announcement.get('list').toJS()
      .map(item => {
        item.timelineType = 'announcement';
        return item;
    });

    let events = store.event.get('list').toJS()
      .map(item => {
        item.timelineType = 'event';
        return item;
    });

    return {
      announcements,
      events,
      eventsFetchState: store.event.get('listState')
    }
};

export default connect(select)(TimelineList);
