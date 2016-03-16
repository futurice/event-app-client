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
  Platform,
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
import AnnouncementListItem from './AnnouncementListItem';
import EventDetail from './EventDetail';
import ProgressBar from 'ProgressBarAndroid';

const ANNOUNCEMENTS_SECTION = 'announcements';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary,
  },
  loaderText:{
    color:theme.light,
  },
  reloadButton:{
    marginTop:20,
  },
  reloadButtonText:{
    fontSize:30,
    color:theme.accent,
    fontWeight:'bold',
  },
  listView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 20,
    backgroundColor: theme.primary,
  },
  sectionHeader: {
    backgroundColor: theme.dark,
    opacity: 0.88,
    padding: 20,
    flex: 1
  },
  sectionHeaderAnnouncement: {
    backgroundColor: theme.danger,
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
    this.getViewContent()
  },

  getViewContent(){
    // ...should these be throttled?
    this.props.dispatch(EventActions.fetchEvents());
    this.props.dispatch(AnnouncementActions.fetchAnnouncements());
  },

  navigateToSingleEvent(model) {
    this.props.navigator.push({
      component: EventDetail,
      name: model.name,
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
      {(Platform.OS === 'android') ?
        <ProgressBar styleAttr='Inverse' color={theme.light}/> :

        <ActivityIndicatorIOS
          color={theme.light}
          animating={true}
          style={{ alignItems: 'center', justifyContent: 'center', height: 80 }}
          size='large' />
      }
      <Text style={styles.loaderText}>Loading events...</Text>
    </View>;
  },

  renderSectionHeader(sectionData, sectionId) {
    let sectionCaption = '';
    const sectionStartMoment = moment.unix(sectionId);

    // # Caption
    // Announcement-section
    if (sectionId === ANNOUNCEMENTS_SECTION) {
      sectionCaption = 'Wapputiimi announces';
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

    // # Style
    const headerStyle = (sectionId === ANNOUNCEMENTS_SECTION) ? styles.sectionHeaderAnnouncement : styles.sectionHeader;

    return <View style={headerStyle}>
      <Text style={styles.sectionHeaderText}>{sectionCaption}</Text>
    </View>;
  },

  renderListItem(item, sectionId, rowId) {
    switch (item.timelineType) {
      case 'announcement':
        return <AnnouncementListItem item={item} />;

      default:
        return <EventListItem
          item={item}
          rowId={rowId}
          handlePress={() => this.navigateToSingleEvent(item)}
        />;
    }
  },

  render() {
    switch (this.props.eventsFetchState) {
      case 'loading':
        return this.renderLoadingView();
      case 'loading':
        return (
          <View style={styles.container}>
            <Text style={styles.loaderText}>Could not get events :(</Text>
            <TouchableHighlight
              onPress={this.getViewContent}
              style={styles.reloadButton}>
              <Text style={styles.reloadButtonText}>RETRY</Text>
            </TouchableHighlight>
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
