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
  Animated
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
  },
  plusButton: {
      flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
      flex:1,
    position:'absolute',
    bottom: 20,
    right: 20,
    backgroundColor:'#55cde1',
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
      console.log("expand buttons to visible");
      if(!this.state.isExpaned) {
          this.state.isExpaned = true;
          console.log("animate it");
      //Animated.spring(this.state.buttons[0], {toValue:{x:-70, y:-70}}).start();
      BUTTON_POS.forEach((pos, i) => {
          Animated.spring(this.state.buttons[i], {toValue: pos}).start();
      });
      }else {
        this.state.isExpaned = false;
        BUTTON_POS.forEach((pos, i) => {
            Animated.spring(this.state.buttons[i], {toValue: {x:0, y:0}}).start();
        });
      }
  },
  buttonPressed(index) {
      console.log("you pressed ", index);
  },
  
  render() {
      var feedRendering;
      var buttonRendering = [];
      var plusButtonRendering = [];
      if(this.props.isLoadingActionTypes === false) {
          buttonRendering = this.props.actionTypes.map((actiontype, i) => {
              return (
                  <Animated.View
                      style={[
                          styles.buttonEnclosure,
                          {
                              transform: this.state.buttons[i].getTranslateTransform()
                          }]
                      }
                      >
                      {this.renderButton(actiontype.get('name'), this.buttonPressed.bind(this, i), { bottom: 0, right: 0 }) }
                  </Animated.View>
              );
            });
            plusButtonRendering = this.renderButton("+",this.expandButtons);
      }
      
      
    switch (this.props.feedListState) {
      case 'loading':
        feedRendering =  this.renderLoadingView();
        break;
      case 'failed':
        feedRendering = (
          <View style={styles.container}>
            <Text>Feedia ei saatu haettua :(</Text>
          </View>
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
            <Text style={styles.plusText}>{text}</Text>
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
      actionTypes: store.competition.get('actionTypes')
    }
};

export default connect(select)(feedItemList);
