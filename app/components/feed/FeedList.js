'use strict';

import React, {
  StyleSheet,
  ListView,
  Text,
  ActivityIndicatorIOS,
  RefreshControl,
  View,
  Platform,
  PropTypes,
  Animated,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { ImagePickerManager } from 'NativeModules';
import Immutable from 'immutable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from 'ProgressBarAndroid';

import theme from '../../style/theme';
import * as FeedActions from '../../actions/feed';
import FeedListItem from './FeedListItem';
import Notification from '../../components/common/Notification';
import Fab from '../common/Fab';
import TextActionView from '../../components/actions/TextActionView';

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
    position:'absolute',
    bottom: Platform.OS === 'ios' ? 67 : 20,
    right: 20,
    backgroundColor: theme.secondary,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation:2,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 0
    },
  },
  mainButton:{
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
    position:'absolute',
    bottom: Platform.OS === 'ios' ? 67 : 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  plusText: {
    alignSelf:'center',
    flex:1,
    fontWeight:'bold',
    textAlign:'center',
    fontSize:16,
    color:'#fff'
  },

});

// in a happy world all this would be calculated on the fly but no
const BUTTON_COUNT = 6;
const DISTANCE = 60;
const BUTTON_WIDTH = 46;
const BIG_BUTTON_WIDTH = 56;
// const ANGLE_RAD = 30 * Math.PI / 180;
// const ANGLE_INNER = 10 * Math.PI / 180;

var BUTTON_POS = [];

/*
Radial Layout
for (var i = 0; i < BUTTON_COUNT; i++) {
  const radius = (i < 2) ? DISTANCE : DISTANCE * 2;
  const angleMod = (i > 1) ? i - 2 : i + 1;
  const angle = (i < 1) ? ANGLE_INNER : ANGLE_RAD;
  BUTTON_POS.push({ x: -Math.cos(angle * angleMod) * radius, y: - Math.sin(angle * angleMod) * radius });
}
*/

for (var i = 0; i < BUTTON_COUNT; i++) {
  BUTTON_POS.push({ x: 0, y: -DISTANCE * i - (BUTTON_WIDTH + BIG_BUTTON_WIDTH / 2) + 10 });
}

const FeedList = React.createClass({
  propTypes: {
    feed: PropTypes.array.isRequired,
    isRegistrationInfoValid: PropTypes.bool.isRequired,
    isLoadingActionTypes: PropTypes.bool.isRequired,
    isLoadingUserData: PropTypes.bool.isRequired,
    isNotificationVisible: PropTypes.bool.isRequired,
    notificationText: PropTypes.string.isRequired,
    feedListState: PropTypes.oneOf(['loading', 'ready', 'failed']).isRequired,
    refreshListState: PropTypes.oneOf(['loading', 'ready', 'failed']).isRequired,
    actionTypes: PropTypes.instanceOf(Immutable.List).isRequired,
    dispatch: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      buttons: BUTTON_POS.map((j) => new Animated.ValueXY()),
      plusButton: new Animated.Value(0),
      buttonsExpanded: false
    };
  },

  componentDidMount() {
    this.props.dispatch(FeedActions.fetchFeed());
  },

  componentWillReceiveProps({feed}) {
    if (feed !== this.props.feed) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(feed)
      })
    }
  },

  renderLoadingView() {
    return <View style={styles.container}>
      {Platform.OS === 'android' ?
        <ProgressBar styleAttr='Inverse' color={theme.primary}/>
      :
        <ActivityIndicatorIOS
          color={theme.primary}
          animating={true}
          style={{ alignItems: 'center', justifyContent: 'center', height: 80 }}
          size='large' />
      }
      <Text>Downloading the latest awesomeness...</Text>
    </View>;
  },

  expandButtons() {
    if (this.props.isRegistrationInfoValid === false) {
      this.props.dispatch(RegistrationActions.openRegistrationView());
    } else {
      if (!this.state.buttonsExpanded) {
        // state is manipulated here directly on purpose, so the animations works smoothly
        this.state.buttonsExpanded = true;
        BUTTON_POS.forEach((pos, j) => {
          Animated.spring(this.state.buttons[j], { toValue: pos }).start();
        });
        Animated.spring(this.state.plusButton, { toValue: 1 }).start();
      } else {
        // state is manipulated here directly on purpose, so the animations works smoothly
        this.state.buttonsExpanded = false;
        BUTTON_POS.forEach((pos, j) => {
          Animated.spring(this.state.buttons[j], { toValue: { x: 0, y: 0 } }).start();
        });
        Animated.spring(this.state.plusButton, { toValue: 0 }).start();
      }
    }
  },

  refreshFeed() {
    this.props.dispatch(FeedActions.refreshFeed());
  },

  loadMoreItems() {
    const lastItemID = this.props.feed[this.props.feed.length - 1].id || null;
    if (lastItemID) {
      this.props.dispatch(FeedActions.loadMoreItems(lastItemID));
    }
  },

  renderFeedItem(item) {
    return <FeedListItem item={item}/>;
  },

  chooseImage() {
    ImagePickerManager.showImagePicker(ImageCaptureOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const image = 'data:image/jpeg;base64,' + response.data;
        this.props.dispatch(CompetitionActions.postImage(image));
      }
    });
  },

  sendText() {
    this.props.dispatch(CompetitionActions.openTextActionView());
  },

  sendBasicAction(type) {
    this.props.dispatch(CompetitionActions.postAction(type));
  },

  onPressAction(type) {
    switch (type) {
      case 'IMAGE':
        return this.chooseImage();
      case 'TEXT':
        return this.sendText();
      default:
        return this.sendBasicAction(type);
    }
  },

  getIconForAction(type) {
    var mapping = {
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

  renderButton(text, onPress, extraStyle)  {
    var combinedStyle = [styles.plusButton];

    if (extraStyle != null) {
      combinedStyle.push(extraStyle);
    }
    return <Fab text={text} onPress={onPress} styles={combinedStyle} />
  },

  render() {
    var feedRendering;
    var buttonRendering = [];
    var plusButtonRendering = [];

    if (this.props.isLoadingActionTypes === false && this.props.isLoadingUserData === false) {
      buttonRendering = this.props.actionTypes.map((actiontype, index) => {
        const iconName = this.getIconForAction(actiontype.get('code'));
        return (
          <Animated.View
            key={'button_' + index}
            style={[
              styles.buttonEnclosure,
              { transform: this.state.buttons[index].getTranslateTransform() }
            ]}
          >
            {this.renderButton(<Icon name={iconName} size={22}
              style={{color: '#ffffff'}}></Icon>,
              this.onPressAction.bind(this, actiontype.get('code')),
              { bottom: 10, right: 5, width:46, height:46 }) }
          </Animated.View>
        );
      });

      plusButtonRendering = this.renderButton((
        <Animated.View
        style={{ transform: [{
          rotate: this.state.plusButton.interpolate({
            inputRange: [0, 1], outputRange: ['0deg', '225deg']
          })
        }]
        }}
        >
          <Icon name='add' size={22} style={{color: '#ffffff'}}></Icon>
        </Animated.View>
        ),
        this.expandButtons,
        styles.mainButton
      );
    }

    switch (this.props.feedListState) {
      case 'loading':
        feedRendering =  this.renderLoadingView();
        break;

      case 'failed':
        feedRendering = (
          <ScrollView style={{flex: 1}}
          refreshControl={
            <RefreshControl
              refreshing={this.props.refreshListState}
              onRefresh={this.refreshFeed}
              title='Refreshing...'
              colors={[theme.primary]}
              tintColor={theme.primary}
              progressBackgroundColor={theme.light}
             />
            }
          >
            <Text style={{marginTop: 20}}>Could not get feed :(</Text>
          </ScrollView>
        );
        break;

      default:
        feedRendering = (
          <View style={styles.container}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderFeedItem}
              style={styles.listView}
              onEndReached={this.loadMoreItems}
              refreshControl={
                <RefreshControl
                  refreshing={this.props.refreshListState}
                  onRefresh={this.refreshFeed}
                  title='Refreshing...'
                  colors={[theme.primary]}
                  tintColor={theme.primary}
                  progressBackgroundColor={theme.light}
                 />
              }
            />
              {buttonRendering}
              {plusButtonRendering}
          </View>
        );
    }

    return (
      <View style={styles.container}>
        {feedRendering}
        <Notification visible={this.props.isNotificationVisible}>
          {this.props.notificationText}
        </Notification>
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
    refreshListState: store.feed.get('refreshState'),
    isLoadingActionTypes: store.competition.get('isLoadingActionTypes'),
    actionTypes: store.competition.get('actionTypes'),
    isNotificationVisible: store.competition.get('isNotificationVisible'),
    notificationText: store.competition.get('notificationText'),

    user,
    isRegistrationInfoValid,
    isLoadingUserData: store.registration.get('isLoading')
  };
};

export default connect(select)(FeedList);
