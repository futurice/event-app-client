
import React from 'react';
import {
  StyleSheet,
  ListView,
  Dimensions,
  Image,
  RefreshControl,
  View,
  ScrollView,
  Platform
} from 'react-native';
import Text from '../Text';
import { connect } from 'react-redux';
// import { ImagePickerManager } from 'NativeModules';
import ImagePickerManager from 'react-native-image-picker';
import _ from 'lodash';

import {
  openComments,
  closeComments
} from '../../concepts/comments';

import theme from '../../style/theme';
import {
  loadMoreItems,
  fetchFeed,
  refreshFeed,
  updateFeed,
  voteFeedItem
} from '../../actions/feed';

import {
  postImage,
  postAction,
  openTextActionView,
  updateCooldowns
} from '../../actions/competition';


import ImageEditor from './ImageEditor';
import FeedListItem from './FeedListItem';
import Notification from '../common/Notification';
import Loading from './Loading';
import ActionButtons from './ActionButtons';
import TextActionView from '../../components/actions/TextActionView';
import LoadingStates from '../../constants/LoadingStates';
import WebViewer from '../webview/WebViewer';
import Button from '../common/Button';
import Background from '../background';
import CommentsView from '../comment/CommentsView';

import ImageCaptureOptions from '../../constants/ImageCaptureOptions';

import TimerMixin from 'react-timer-mixin';

const IOS = Platform.OS === 'ios';
const {height, width} = Dimensions.get('window');
const AUTOREFRESH_INTERVAL = 20 * 1000;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: theme.transparent
  },
  listView: {
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 20,
  },
  reloadButton: {
    minWidth: 120,
  }

});

const FeedList = React.createClass({
  mixins: [TimerMixin],
  getInitialState() {
    return {
      showScrollTopButton: false,
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
    };
  },

  autoRefresher: null,
  componentDidMount() {
    this.props.fetchFeed();

    this.props.updateCooldowns();

    // this.autoRefresher = setInterval(() => {
    //   const firstItemID = this.props.feed ? this.props.feed.first().get('id') : '';
    //   this.props.updateFeed(firstItemID);
    // }, AUTOREFRESH_INTERVAL);
  },


  componentWillUnmount() {
    // clearInterval(this.autoRefresher);
    // this.clearInterval(this.updateCooldownInterval);
  },


  componentWillReceiveProps({ feed }) {
    if (feed !== this.props.feed) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(feed.toJS())
      });
    }
    // Scroll to top when user does an action
    if (this.props.isSending){
      this.scrollTop();
    }
  },
  scrollTop() {
    if (this.refs._scrollView){
     this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});
    }
  },


  offset: 0,
  currentDirection: null,
  _onScroll(event){
    const SHOW_SCROLLTOP_LIMIT = 600;
    const scrollTop = event.nativeEvent.contentOffset.y;


    const direction = scrollTop > this.offset ? 'DOWN' : 'UP';
    this.offset = scrollTop;

    const showScrollTopButton = scrollTop > SHOW_SCROLLTOP_LIMIT;
    if (this.state.showScrollTopButton !== showScrollTopButton) {
      this.setState({showScrollTopButton})
    }

/*
    if (direction !== this.currentDirection){

      this.currentDirection = direction;
      if (direction === 'DOWN') {
        this.props.scrollDown();
      } else {
        this.props.scrollUp()
      }
    }
*/
  },

  onRefreshFeed() {
    this.props.refreshFeed();
  },

  onImagePost(image, text, textPosition) {
    this.props.postImage(image, text, textPosition);
    this.resetPostImage();
  },

  resetPostImage() {
    this.setState({editableImage: null});
  },


  onLoadMoreItems() {
    if (this.props.isRefreshing || !this.props.feed.size || this.props.feed.size < 10) {
      return;
    }

    const lastItemID = this.props.feed.get(this.props.feed.size - 1).get('id') || '';
    if (lastItemID) {
      this.props.loadMoreItems(lastItemID);
    }
  },


  openImagePicker() {
    ImagePickerManager.showImagePicker(ImageCaptureOptions, (response) => {
      if (!response.didCancel && !response.error) {
        const data = 'data:image/jpeg;base64,' + response.data;
        const editableImage = {
          data,
          width: response.width,
          height: response.height,
          vertical: response.isVertical
        };

        this.openImageEditor(editableImage);
      }
    });
  },

  openImageEditor(editableImage) {
    this.setState({ editableImage })
  },

  onPressAction(type) {

    switch (type) {
      case 'IMAGE':
        return this.openImagePicker();
      case 'TEXT':
        return this.props.openTextActionView();
      default:
        return this.props.postAction(type);
    }
  },

  handleUrlPress(url) {

    if (!url) {
      return;
    }

    this.props.navigator.push({
      component: WebViewer,
      url
    });

  },

  renderRow(item, sec, index) {
    const { feed } = this.props;
    const isPreviousItemFromSameUser = index !== '0' && _.has(item, 'author.email') &&
      feed.getIn([parseInt(index, 10) - 1, 'author', 'email'], null) === item.author.email;

    return (<FeedListItem
      handleUrlPress={this.handleUrlPress}
      key={item.id}
      item={item}
      index={index}
      showUser={!isPreviousItemFromSameUser}
      openComments={this.props.openComments}
      closeComments={this.props.closeComments}
      voteFeedItem={this.props.voteFeedItem}
    />)
  },

  renderFeed(feedListState, isLoadingActionTypes, isLoadingUserData) {
    const isLoading = isLoadingActionTypes || isLoadingUserData;
    const isRefreshing = this.props.isRefreshing || this.props.isSending;

    switch (feedListState) {
      case LoadingStates.LOADING:
        return (<Loading />);
      case LoadingStates.FAILED:
        return (
          <View style={styles.container}>
            <View style={{alignItems: 'center', height: height - 120, justifyContent: 'center', flex: 1}}>
              <Text style={{ marginBottom: 20, color: theme.secondary }}>Could not get feed</Text>
              <Button onPress={this.onRefreshFeed} style={styles.reloadButton}>Reload</Button>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.container}>
            <ListView
              ref='_scrollView'
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              style={styles.listView}
              onScroll={this._onScroll}
              onEndReached={this.onLoadMoreItems}
              refreshControl={
              <RefreshControl
                refreshing={!!isRefreshing}
                onRefresh={this.onRefreshFeed}
                colors={[theme.captionLayer]}
                tintColor={theme.captionLayer}
                progressBackgroundColor={theme.light} />
              } />
            <ActionButtons
              isRegistrationInfoValid={this.props.isRegistrationInfoValid}
              style={styles.actionButtons}
              isLoading={isLoading}
              onPressAction={this.onPressAction}
              onScrollTop={this.scrollTop}
              showScrollTopButton={this.state.showScrollTopButton}
              />
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
        <Notification visible={this.props.isNotificationVisible} success={this.props.notificationSuccessStyle}>
          {this.props.notificationText}
        </Notification>
        <ImageEditor
          onCancel={this.resetPostImage}
          onImagePost={this.onImagePost}
          animationType={'fade'}
          image={this.state.editableImage}
        />
        <TextActionView />
        <CommentsView />
      </View>
    );
  },
});


const mapDispatchToProps = {
  fetchFeed,
  refreshFeed,
  updateFeed,
  loadMoreItems,
  updateCooldowns,
  postImage,
  postAction,
  openTextActionView,
  voteFeedItem,

  openComments,
  closeComments,
};

const select = store => {
  const isRegistrationInfoValid = store.registration.get('name') !== '' &&
    store.registration.get('selectedTeam') >= 0;

  return {
    feed: store.feed.get('list'),
    feedListState: store.feed.get('listState'),
    isRefreshing: store.feed.get('isRefreshing'),
    isLoadingActionTypes: store.competition.get('isLoadingActionTypes'),
    actionTypes: store.competition.get('actionTypes'),
    isNotificationVisible: store.competition.get('isNotificationVisible'),
    notificationText: store.competition.get('notificationText'),
    notificationSuccessStyle: store.competition.get('notificationSuccessStyle'),
    isSending: store.competition.get('isSending'),

    isRegistrationInfoValid,
    isLoadingUserData: store.registration.get('isLoading'),
  };
};

export default connect(select, mapDispatchToProps)(FeedList);
