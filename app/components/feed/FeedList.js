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
  Animated,
  ScrollView
} = React;
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import time from '../../utils/time';
import theme from '../../style/theme';
import * as FeedActions from '../../actions/feed';
import FeedListItem from './FeedListItem';
import Notification from '../../components/common/Notification';

//import SinglePhoto from './SinglePhoto'
import ProgressBar from 'ProgressBarAndroid';
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
    flex: 1,
  },
  plusButton: {
      flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
      flex:1,
    position:'absolute',
    bottom: 20,
    right: 20,
    backgroundColor:theme.secondary,
    width: 56,
    height: 56,
    borderRadius:56,

  },
  buttonEnclosure: {
      flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
      flex:1,
    position:'absolute',
    bottom: 20,
    right: 20,

    width: 56,
    height: 56,

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
//in a happy world all this would be calculated on the fly but no
const BUTTON_COUNT = 6;
const DISTANCE = 70;
const BUTTON_WIDTH = 56;
const ANGLE_RAD = 30 * Math.PI/180;
const ANGLE_INNER = 10 * Math.PI/180;
var BUTTON_POS = [];
for(var i = 0; i < BUTTON_COUNT; i++) {

    var radius = (i < 2) ? DISTANCE : DISTANCE * 2;
    var angleMod = (i > 1) ? i - 2 : i+1;
    var angle = (i < 1) ? ANGLE_INNER : ANGLE_RAD;
    BUTTON_POS.push({x: -Math.cos(angle * angleMod) * radius, y: -Math.sin(angle * angleMod) * radius});
}

var feedItemList = React.createClass({

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      buttons: BUTTON_POS.map((i) => {return new Animated.ValueXY();}),
      isExpaned: false
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
  expandButtons() {
      if (this.props.isRegistrationInfoValid === false) {
          this.props.dispatch(RegistrationActions.openRegistrationView());

      } else {
          console.log("expand buttons to visible");
          if (!this.state.isExpaned) {
              this.state.isExpaned = true;
              console.log("animate it");
              //Animated.spring(this.state.buttons[0], {toValue:{x:-70, y:-70}}).start();
              BUTTON_POS.forEach((pos, i) => {
                  Animated.spring(this.state.buttons[i], { toValue: pos }).start();
              });
          } else {
              this.state.isExpaned = false;
              BUTTON_POS.forEach((pos, i) => {
                  Animated.spring(this.state.buttons[i], { toValue: { x: 0, y: 0 } }).start();
              });
          }
      }
  },
  buttonPressed(index) {
      console.log("you pressed ", index);
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
          'TEXT': 'chatbubble-working',
          'IMAGE': 'camera',
          'BEER': 'beer',
          'CIDER': 'ios-pint',
          'SODA': 'soup-can-outline',
          'BUTTON_PUSH': 'ios-circle-filled',
          'default': 'beer'
      }
      return mapping[type] ||mapping['default'];
  },

  render() {
      var feedRendering;
      var buttonRendering = [];
      var plusButtonRendering = [];
      if(this.props.isLoadingActionTypes === false) {
          buttonRendering = this.props.actionTypes.map((actiontype, i) => {
              console.log("action ",actiontype.get('code'));
              let iconname = this.getIconForAction(actiontype.get('code'));
              return (
                  <Animated.View
                      style={[
                          styles.buttonEnclosure,
                          {
                              transform: this.state.buttons[i].getTranslateTransform()
                          }]
                      }
                      >
                      {this.renderButton(<Icon name={iconname} size={22} style={{color: '#ffffff'}}></Icon>, this.onPressAction.bind(this, actiontype.get('code')), { bottom: 0, right: 0 }) }
                  </Animated.View>
              );
            });
            plusButtonRendering = this.renderButton((<Icon name="plus" size={22} style={{color: '#ffffff'}}></Icon>),this.expandButtons, { elevation:2 });
      }

      console.log("Render:" + this.props.feedListState);
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
              title="Refreshing..."
              colors={[theme.primary]}
              tintColor={theme.primary}
              progressBackgroundColor={theme.light}
             />
            }
          >
            <Text style={{marginTop: 20}}>Feedia ei saatu haettua :(</Text>
          </ScrollView>
        );
        break;
      default:
        feedRendering =  (
            <View style={styles.container}>
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
            {buttonRendering}
            {plusButtonRendering}
            </View>
        );
    }

    return (
        <View style={styles.container}>
        {feedRendering}
        <Notification visible={this.props.isNotificationVisible}>{this.props.notificationText}</Notification>
        
        </View>
    );
  },

  renderButton(text, onPress, extraStyle)  {
      var combinedStyle = [styles.plusButton];
      if(extraStyle != null) {
          combinedStyle.push(extraStyle);
      }
      return (
      <TouchableHighlight style={combinedStyle} onPress={onPress}>
            <View style={[styles.plusButton, {bottom:0, right:0}]}>
            <View>
            {text}
            </View>
            </View>
            </TouchableHighlight>
      );
  }
});

const select = store => {
    return {
      feed: store.feed.get('list').toJS(),
      feedListState: store.feed.get('listState'),
      refreshListState: store.feed.get('refreshState'),
      isLoadingActionTypes: store.competition.get('isLoadingActionTypes'),
      actionTypes: store.competition.get('actionTypes'),
      isNotificationVisible: store.competition.get('isNotificationVisible'),
      notificationText: store.competition.get('notificationText'),
       isRegistrationInfoValid: !!store.registration.get('name') && !!store.registration.get('selectedTeam')
    }
};

export default connect(select)(feedItemList);
