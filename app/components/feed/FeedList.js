'use strict';

import React, {
  StyleSheet,
  ListView,
  Text,
  RefreshControl,
  View,
  Platform,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { ImagePickerManager } from 'NativeModules';

import theme from '../../style/theme';
import * as FeedActions from '../../actions/feed';
import FeedListItem from './FeedListItem';
import Notification from '../common/Notification';
import Loading from './Loading';
import ActionButtons from './ActionButtons';
import TextActionView from '../../components/actions/TextActionView';
import LoadingStates from '../../constants/LoadingStates';

import ImageCaptureOptions from '../../constants/ImageCaptureOptions';
import * as CompetitionActions from '../../actions/competition';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.light
  },
  listView: {
    flex: 1
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },

});

const FeedList = React.createClass({
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
    };
  },

  componentDidMount() {
    this.props.dispatch(FeedActions.fetchFeed());
    this.updateCooldownInterval = setInterval(() => {
      this.props.dispatch(CompetitionActions.updateCooldowns());
    }, 1000);
    this.props.dispatch(CompetitionActions.updateCooldowns());
  },

  componentWillUnmount() {
    clearInterval(this.updateCooldownInterval);
  },

  componentWillReceiveProps({ feed }) {
    if (feed !== this.props.feed) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(feed)
      });
    }
  },

  onRefreshFeed() {
    this.props.dispatch(FeedActions.refreshFeed());
  },

  onLoadMoreItems() {
    if(this.props.isRefreshing || !this.props.feed.length || this.props.feed.length < 10) {
      return;
    }

    const lastItemID = this.props.feed[this.props.feed.length - 1].id || '';
    if (lastItemID) {
      this.props.dispatch(FeedActions.loadMoreItems(lastItemID));
    }
  },

  chooseImage() {
    ImagePickerManager.showImagePicker(ImageCaptureOptions, (response) => {
      if (!response.didCancel && !response.error) {
        const image = 'data:image/jpeg;base64,' + response.data;
        this.props.dispatch(CompetitionActions.postImage(image));
      }
    });
  },

  onPressAction(type) {
    switch (type) {
      case 'IMAGE':
        return this.chooseImage();
      case 'TEXT':
        return this.props.dispatch(CompetitionActions.openTextActionView());
      default:
        return this.props.dispatch(CompetitionActions.postAction(type));
    }
  },

  renderFeed(feedListState, isLoadingActionTypes, isLoadingUserData) {
    const refreshControl = <RefreshControl
      refreshing={this.props.isRefreshing}
      onRefresh={this.onRefreshFeed}
      colors={[theme.primary]}
      tintColor={theme.primary}
      progressBackgroundColor={theme.light} />;

    const isLoading = isLoadingActionTypes || isLoadingUserData;

    switch (feedListState) {
      case LoadingStates.LOADING:
        return <Loading />;
      case LoadingStates.FAILED:
        return (
          <ScrollView style={{ flex: 1 }} refreshControl={refreshControl}>
            <Text style={{ marginTop: 20 }}>Could not get feed :(</Text>
          </ScrollView>
        );
      default:
        return (
          <View style={styles.container}>

            <ListView
              dataSource={this.state.dataSource}
              renderRow={item => <FeedListItem item={item} />}
              style={[styles.listView]}
              onEndReached={this.onLoadMoreItems}
              refreshControl={refreshControl} />

            <ActionButtons
              style={styles.actionButtons}
              isLoading={isLoading}
              onPressAction={this.onPressAction} />
          </View>
        );
    }
  },

  render() {

    return (
      <View style={styles.container}>
        {this.renderFeed(
          this.props.feedListState,
          this.props.isLoadingActionTypes,
          this.props.isLoadingUserData
        )}
        <Notification visible={this.props.isNotificationVisible}>
          {this.props.notificationText}
        </Notification>
        <TextActionView />
      </View>
    );
  },
});

const select = store => {
  const user = store.registration.toJS();
  const isRegistrationInfoValid = user.name !== '' && user.selectedTeam > 0;

  return {
    feed: store.feed.get('list').toJS(),
    feedListState: store.feed.get('listState'),
    isRefreshing: store.feed.get('isRefreshing'),
    isLoadingActionTypes: store.competition.get('isLoadingActionTypes'),
    actionTypes: store.competition.get('actionTypes'),
    isNotificationVisible: store.competition.get('isNotificationVisible'),
    notificationText: store.competition.get('notificationText'),

    user,
    isRegistrationInfoValid,
    isLoadingUserData: store.registration.get('isLoading'),
  };
};

export default connect(select)(FeedList);
