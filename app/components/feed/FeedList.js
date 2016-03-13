'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  ListView,
  Dimensions,
  Text,
  TouchableHighlight,
  ActivityIndicatorIOS,
  RefreshControl,
  View,
  Platform,
} = React;
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import time from '../../utils/time';
import theme from '../../style/theme';
import * as FeedActions from '../../actions/feed';
import FeedListItem from './FeedListItem';
//import SinglePhoto from './SinglePhoto'
import ProgressBar from 'ProgressBarAndroid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.light
  },
  listView: {
    flex: 1,
  }
});

var feedItemList = React.createClass({

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
    };
  },

  componentDidMount() {
    this.props.dispatch(FeedActions.fetchFeed());
  },

  renderLoadingView() {
    return <View style={styles.container}>
      {(Platform.OS === 'android') ?
        <ProgressBar styleAttr='Inverse' color={theme.primary}/> :

        <ActivityIndicatorIOS
          color={theme.primary}
          animating={true}
          style={{ alignItems: 'center', justifyContent: 'center', height: 80 }}
          size='large' />
      }
      <Text>Ladataan feed...</Text>
    </View>;
  },

  navigateToSingleFeedItem(model){
    this.props.navigator.push({
      component: SingleFeedItem,
      name: model.name,
      actions: ['share'],
      model
    });
  },

  refreshFeed(){
    this.props.dispatch(FeedActions.refreshFeed());
  },

  renderFeedItem(item) {
    return <FeedListItem item={item}/>;
  },

  render() {

    switch (this.props.feedListState) {
      case 'loading':
        return this.renderLoadingView();
      case 'failed':
        return (
          <View style={styles.container}>
            <Text>Feedia ei saatu haettua :(</Text>
          </View>
        );
      default:
        return (
          <ListView
            dataSource={this.state.dataSource.cloneWithRows(this.props.feed)}
            renderRow={this.renderFeedItem}
            style={styles.listView}
            refreshControl={
            <RefreshControl
              refreshing={this.props.refreshListState}
              onRefresh={this.refreshFeed}
              title="Refreshing..."
              colors={[theme.primary]}
              tintColor={theme.primary}
              progressBackgroundColor={theme.light}
             />
            }
            />
        );
    }
  }
});

const select = store => {
    return {
      feed: store.feed.get('list').toJS(),
      feedListState: store.feed.get('listState'),
      refreshListState: store.feed.get('refreshState')
    }
};

export default connect(select)(feedItemList);
