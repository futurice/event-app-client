'use strict';

import React, {
  Image,
  StyleSheet,
  ListView,
  Dimensions,
  Text,
  TouchableHighlight,
  RefreshControl,
  View,
  Platform,
  Animated,
  Easing,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { ImagePickerManager } from 'NativeModules';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';

import time from '../../utils/time';
import theme from '../../style/theme';
import * as FeedActions from '../../actions/feed';
import FeedListItem from './FeedListItem';
import Notification from '../common/Notification';
import Loading from './Loading';
import Fab from '../common/Fab';
import TextActionView from '../../components/actions/TextActionView';
import FeedListState from '../../constants/FeedListState';

import ImageCaptureOptions from '../../constants/ImageCaptureOptions';
import * as CompetitionActions from '../../actions/competition';
import * as RegistrationActions from '../../actions/registration';

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
  plusButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 67 : 20,
    right: 20,
    backgroundColor: theme.secondary,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 0
    },
  },
  mainButton: {
    elevation:2,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 0
    },
  },
  buttonEnclosure: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 67 : 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  plusText: {
    alignSelf: 'center',
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    color: '#fff'
  },
  actionButton: {
    bottom: 10,
    right: 5,
    width: 46,
    height: 46
  }
});

// in a happy world all this would be calculated on the fly but no
const BUTTON_COUNT = 6;
const DISTANCE = 60;
const BUTTON_WIDTH = 46;
const BIG_BUTTON_WIDTH = 56;
const ANGLE_RAD = 30 * Math.PI / 180;
const ANGLE_INNER = 10 * Math.PI / 180;

const OPEN = 'OPEN';
const CLOSED = 'CLOSED';

const BUTTON_POS = [];
for (let i = 0; i < BUTTON_COUNT; i++) {
  BUTTON_POS.push({
    x: 0,
    y: -DISTANCE * (i) - (BUTTON_WIDTH + BIG_BUTTON_WIDTH / 2) + 10
  });
}

const FeedList = React.createClass({
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      buttons: BUTTON_POS.map((i) => (new Animated.ValueXY())),
      plusButton: new Animated.Value(0),
      actionButtonsOpen: false
    };
  },

  componentDidMount() {
    this.props.dispatch(FeedActions.fetchFeed());
    this.cooldownUpdater = setInterval(() => {
      this.props.dispatch(CompetitionActions.updateCooldowns());
    }, 1000);
    this.props.dispatch(CompetitionActions.updateCooldowns());
  },

  componentWillUnmount() {
    // TODO: Never called (does it matter?)
    clearInterval(this.cooldownUpdater);
  },

  componentWillReceiveProps({feed}) {
    if (feed !== this.props.feed) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(feed)
      })
    }
  },

  animateButtonsToState(nextState) {
    // state is manipulated here directly on purpose, so the animations works smoothly
    this.state.actionButtonsOpen = nextState === OPEN;
    BUTTON_POS.forEach((pos, i) => {
      Animated.spring(this.state.buttons[i], { toValue: nextState === OPEN ? pos : { x: 0, y: 0 } }).start();
    });
    Animated.spring(this.state.plusButton, { toValue: nextState === OPEN ? 1 : 0 }).start();
  },

  onToggleActionButtons() {
    if (this.props.isRegistrationInfoValid === false) {
      this.props.dispatch(RegistrationActions.openRegistrationView());
    } else {
      this.animateButtonsToState(this.state.actionButtonsOpen ? CLOSED : OPEN);
    }
  },

  onRefreshFeed() {
    this.props.dispatch(FeedActions.refreshFeed());
  },

  onLoadMoreItems() {
    const lastItemID = this.props.feed[this.props.feed.length - 1].id || null;
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

  getIconForAction(type) {
    const mapping = {
      'TEXT': 'textsms',
      'IMAGE': 'photo-camera',
      'BEER': 'local-drink',
      'CIDER': 'local-bar',
      'SODA': 'local-cafe',
      'BUTTON_PUSH': 'touch-app',
      'default': 'image'
    }
    return mapping[type] || mapping['default'];
  },

  renderButton(text, onPress, extraStyle) {
    const combinedStyle = [styles.plusButton];

    if (extraStyle != null) {
        combinedStyle.push(extraStyle);
    }

    return <Fab text={text} onPress={onPress} styles={combinedStyle} />
  },

  getIconOrCooldownTimer(actionType) {
    const isEnabled = this.props.disabledActionTypes.indexOf(actionType) < 0;
    if (isEnabled) {
      const iconName = this.getIconForAction(actionType);
      return <Icon name={iconName} size={22} style={{color: '#ffffff'}}></Icon>;
    } else {
      const now = new Date().getTime();
      const timeLeft = Math.floor((this.props.cooldownTimes.get(actionType) - now) / 1000);
      return <Text>{timeLeft}</Text>;
    }
  },

  renderActionButtons(isLoading) {
    return isLoading ? null : this.props.actionTypes.map((actionType, i) => {
      return (
        <Animated.View key={'button_' + i}
          style={[
            styles.buttonEnclosure,
            { transform: this.state.buttons[i].getTranslateTransform() }
          ]}>
          {this.renderButton(
            this.getIconOrCooldownTimer(actionType.get('code')),
            this.onPressAction.bind(this, actionType.get('code')),
            styles.actionButton
          )}
        </Animated.View>
      );
    });
  },

  renderPlusButton(isLoading) {
    const rotation = this.state.plusButton.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '225deg'] });
    return isLoading ? null : this.renderButton((
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <Icon name="add" size={22} style={{color: '#ffffff'}}></Icon>
      </Animated.View>
      ),
      this.onToggleActionButtons,
      styles.mainButton
    );
  },

  renderFeed(feedListState, isLoadingActionTypes, isLoadingUserData) {
    const refreshControl = <RefreshControl
      refreshing={this.props.isRefreshing}
      onRefresh={this.onRefreshFeed}
      title="Refreshing..."
      colors={[theme.primary]}
      tintColor={theme.primary}
      progressBackgroundColor={theme.light} />;

    const isLoading = isLoadingActionTypes || isLoadingUserData;

    switch (feedListState) {
      case FeedListState.LOADING:
        return <Loading />;
      case FeedListState.FAILED:
        return (
          <ScrollView style={{flex: 1}} refreshControl={refreshControl}>
            <Text style={{marginTop: 20}}>Could not get feed :(</Text>
          </ScrollView>
        );
      default:
        return (
          <View style={styles.container}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={item => <FeedListItem item={item} />}
              style={styles.listView}
              onEndReached={this.onLoadMoreItems}
              refreshControl={refreshControl} />
              {this.renderActionButtons(isLoading)}
              {this.renderPlusButton(isLoading)}
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
        <Notification visible={this.props.isNotificationVisible}>{this.props.notificationText}</Notification>
        <TextActionView />
      </View>
    );
  }
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
    disabledActionTypes: store.competition.get('disabledActionTypes'),
    cooldownTimes: store.competition.get('cooldownTimes'),

    user,
    isRegistrationInfoValid,
    isLoadingUserData: store.registration.get('isLoading')
  };
};

export default connect(select)(FeedList);
