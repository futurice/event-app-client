'use strict';

var React = require('react-native');
var {
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  Navigator,
  TouchableHighlight,
  View,
} = React;
import { connect } from 'react-redux';

import _ from 'lodash';

import theme from '../../style/theme';
import * as AnnouncementActions from '../../actions/announcement';
import ProgressBar from 'ProgressBarAndroid';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white'
  },
  sectionHeader: {
    backgroundColor: theme.dark,
    opacity: 0.88,
    padding: 20,
    paddingLeft: 20
  },
  sectionHeaderText: {
    flex: 1,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000'
    // textOverflow: 'none'
  }
});

var AnnouncementList = React.createClass({
  componentDidMount() {
    this.props.dispatch(AnnouncementActions.fetchAnnouncements());
  },

  renderAnnouncementItem(item) {
    return <View style={styles.container}>
      <Text style={styles.sectionHeaderText}>
        {item.message}
      </Text>
    </View>;
  },

  render() {
    console.log("render", this);
    switch (this.props.announcementsListState) {
      case 'loading':
        return null;
      case 'failed':
        return null;
      default:
        return this.renderAnnouncementItem(this.props.announcements);
    }
  }
});

const select = store => {
  console.log("store:", store.announcement);
    return {
      announcements: store.announcement.get('list').toJS(),
      announcementsListState: store.announcement.get('listState')
    }
};

export default connect(select)(AnnouncementList);
