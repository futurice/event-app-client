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
  TouchableHighlight,
  ActivityIndicatorIOS,
  View,
} = React;
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';


import theme from '../../style/theme';
import * as EventActions from '../../actions/event';
import EventPost from './EventPost'
import ProgressBar from 'ProgressBarAndroid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary
  },
  listView: {
    flex: 1,
  },
  gridListItem: {
    width: Dimensions.get('window').width,
    height: 200,
    flex: 1
  },
  gridListItemImgWrap: {
    height: 200,
    width: Dimensions.get('window').width,
    position: 'absolute'
  },
  gridListItemImgColorLayer: {
    backgroundColor: theme.primary,
    opacity: 0.5,
    elevation: 1,
    position: 'absolute',
    left: 0, top: 0, bottom: 0, right: 0
  },
  gridListItemImg: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  gridListItemContent: {
    elevation: 2,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  gridListItemTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.light,
  },
  gridListItemLikes: {
    color: theme.light,
    opacity: 0.9,
    position: 'absolute',
    right: 20,
    top: 20,
    fontSize: 15
  }
});

var EventList = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
    };
  },

  componentDidMount: function() {
    this.props.dispatch(EventActions.fetchEvents());
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>

        <ProgressBar styleAttr="Inverse" />

        <ActivityIndicatorIOS
         color={theme.primary}
         animating={true}
         style={{ alignItems: 'center', justifyContent: 'center', height: 80}}
         size="large" />

        <Text>Ladataan tapahtumia...</Text>
        </View>
    );
  },

  render: function() {
    switch (this.props.eventsListState) {
      case 'loading':
        return this.renderLoadingView();
      case 'failed':
        return (
          <View style={styles.container}>
            <Text>Tapahtumia ei saatu haettua :(</Text>
          </View>
        );
      default:
        return (
          <ListView
            dataSource={this.state.dataSource.cloneWithRows(this.props.events)}
            renderRow={this.renderEventPost}
            style={styles.listView} />
        );
    }
  },

  showSingleEvent(post){
    this.props.navigator.push({
      component: EventPost,
      name: post.title,
      actions: ['share'],
      post
    });
  },

  renderEventPost: function(post) {
    return (
      <TouchableHighlight onPress={this.showSingleEvent.bind(this, post)} underlayColor={'transparent'}>
        <View style={styles.gridListItem}>
          <View style={styles.gridListItemImgWrap}>

            <Image
            source={{uri: post.image }}
            style={styles.gridListItemImg} />
            <View style={[styles.gridListItemImgColorLayer]} ></View>
          </View>
          <View style={styles.gridListItemContent}>
            <Text style={styles.gridListItemTitle} >{post.title}</Text>
            <Text style={styles.gridListItemLikes}>
              <Icon name="android-favorite-outline" size={15} /> {post.likeCount}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

});

const select = store => {
    return {
      events: store.event.get('list').toArray(),
      eventsListState: store.event.get('listState')
    }
};

export default connect(select)(EventList);
