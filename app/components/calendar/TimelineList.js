'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ListView,
  Text,
  Platform,
  PropTypes,
  TouchableHighlight,
  ActivityIndicatorIOS,
  View,
} = React;
import { connect } from 'react-redux';

import _ from 'lodash';
import moment from 'moment';

import analytics from '../../services/analytics';
import location from '../../services/location';
import theme from '../../style/theme';
import * as AnnouncementActions from '../../actions/announcement';
import * as EventActions from '../../actions/event';
import LoadingStates from '../../constants/LoadingStates';
import EventListItem from './EventListItem';
import AnnouncementListItem from './AnnouncementListItem';
import EventDetail from './EventDetail';
import ProgressBar from 'ProgressBarAndroid';

const IOS = Platform.OS === 'ios';
const VIEW_NAME = 'TimelineList';
const ANNOUNCEMENTS_SECTION = 'announcements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.light,
  },
  loaderText:{
    color:'#aaa',
  },
  reloadButton:{
    marginTop:20,
  },
  reloadButtonText:{
    fontSize:30,
    color:theme.secondary,
    fontWeight:'bold',
  },
  listView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 20,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    backgroundColor: IOS ? 'rgba(255,255,255,.88)' : 'transparent',
    opacity: IOS ? 1 : 1,
    padding: IOS ? 15 : 35,
    paddingLeft:15,
    flex: 1
  },
  sectionHeaderAnnouncement: {
    backgroundColor: theme.secondary,
    marginTop: Platform.OS === 'ios' ? 30 : 0,
    padding: IOS ? 20 : 15,
    flex: 1
  },
  sectionHeaderAnnouncementText:{
    color: theme.light
  },
  sectionHeaderText: {
    textAlign: 'left',
    fontWeight: IOS ? 'bold' : 'bold',
    fontSize: IOS ? 18 : 16,
    color: IOS ? theme.secondary : theme.secondary
  }
});

var TimelineList = React.createClass({
  propTypes: {
    announcements: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
    eventsFetchState: PropTypes.oneOf(_.values(LoadingStates)).isRequired
  },
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      })
    };
  },

  componentWillReceiveProps({ events, announcements }) {
    if (announcements === this.props.announcements && events === this.props.events) {
      return;
    }

    this.updateListItems(events, announcements);
  },

  componentDidMount() {
    this.getViewContent();
    this.updateListItems(this.props.events, this.props.announcements);
    analytics.viewOpened(VIEW_NAME);
  },

  getViewContent() {
    // TODO: ...should these be throttled?
    this.props.dispatch(EventActions.fetchEvents());
    this.props.dispatch(AnnouncementActions.fetchAnnouncements());
  },

  navigateToSingleEvent(model) {
    this.props.navigator.push({
      component: EventDetail,
      name: model.name,
      currentDistance: location.getDistance(this.props.userLocation, model.location),
      model
    });
  },

  updateListItems(events, announcements) {
    // TODO: Filter the past events away in here?
    let listSections = _.groupBy(this.props.events,
      event => moment(event.startTime).startOf('day').unix());
    const eventSectionsOrder = _.orderBy(_.keys(listSections));

    // Add the announcements-section to the listSections
    listSections[ANNOUNCEMENTS_SECTION] = this.props.announcements;

    // Make the order to be that the first section is the announcements, then comes event sections
    const listOrder = [ANNOUNCEMENTS_SECTION, ...eventSectionsOrder];

    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(listSections, listOrder)
    });
  },

  renderLoadingView() {
    // TODO: platform-specific if-else
    return <View style={styles.container}>
      {(Platform.OS === 'android') ?
        <ProgressBar styleAttr='Inverse' color={theme.primary}/> :

        <ActivityIndicatorIOS
          color={theme.primary}
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
      sectionCaption = 'Announcement';
    }
    // Day-sections
    else if (sectionStartMoment.isSame(moment(), 'day')) {
      sectionCaption = 'Today';
    } else if (sectionStartMoment.isSame(moment().add(1, 'day'), 'day')) {
      sectionCaption = 'Tomorrow';
    } else {
      sectionCaption = moment.unix(sectionId).format('ddd D.M.');
    }
    sectionCaption = sectionCaption.toUpperCase();

    // # Style
    const headerStyle = (sectionId === ANNOUNCEMENTS_SECTION) ?
      styles.sectionHeaderAnnouncement : styles.sectionHeader;
    const headerTextStyle = (sectionId === ANNOUNCEMENTS_SECTION) ?
      styles.sectionHeaderAnnouncementText : {};

    return <View style={headerStyle}>
      <Text style={[styles.sectionHeaderText,headerTextStyle]}>{sectionCaption}</Text>
    </View>;
  },

  renderListItem(item, sectionId, rowId) {
    switch (item.timelineType) {
      case 'announcement':
        return <AnnouncementListItem item={item} />;

      default:
        return <EventListItem
          item={item}
          rowId={+rowId}
          currentDistance={location.getDistance(this.props.userLocation, item.location)}
          handlePress={() => this.navigateToSingleEvent(item)}
        />;
    }
  },

  render() {
    switch (this.props.eventsFetchState) {
      case 'loading':
        return this.renderLoadingView();
      case 'failed':
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
        return <ListView
          dataSource={this.state.dataSource}
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
    eventsFetchState: store.event.get('listState'),
    userLocation: store.location.get('currentLocation')
  }
};

export default connect(select)(TimelineList);
