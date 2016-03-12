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
  PullToRefreshViewAndroid,
  View,
  Platform,
} = React;
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import time from '../../utils/time';
import theme from '../../style/theme';
import * as FeedActions from '../../actions/feed';
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
  feedItemListItem: {
    width: Dimensions.get('window').width,
    flex: 1
  },
  feedItemListItemImgWrap: {
    height: 400,
    width: Dimensions.get('window').width,
  },
  feedItemListTextWrap: {
    paddingLeft:15,
    paddingRight:15,
    paddingTop:0,
    paddingBottom:10,
    top:-10
  },
  feedItemListText: {
    fontSize:13,
    color:theme.dark,
  },
  feedItemListItemImg: {
    width: Dimensions.get('window').width,
    height: 400,
    backgroundColor:'#ddd',
  },
  feedItemListItemInfo: {
    flex: 1,
    flexDirection:'row',
    padding: 20,
    paddingLeft:15,
    paddingRight:15,
    alignItems:'flex-start',
    justifyContent:'space-between',
  },
  feedItemListItemAuthor:{
    flex:1,
    flexDirection:'row',
    alignItems:'flex-end',
  },
  feedItemListItemAuthorName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.secondary,
    paddingRight:10,
  },
  feedItemListItemAuthorTeam:{
    fontSize:11,
    color:'#aaa',
  },
  feedItemListItemAuthorIcon:{
    color:'#aaa',
    fontSize: 15,
    marginTop:1,
    paddingRight:10,
  },
  feedItemListItemTime: {
    color: '#aaa',
    fontSize: 13,
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

  _onRefresh(){
    alert('test')
  //  this.props.dispatch(FeedActions.fetchFeed());
  },

  renderFeedItem(item) {
    const ago = time.getTimeAgo(item.createdAt);

    return (
      <View style={styles.feedItemListItem}>

        <View style={styles.feedItemListItemInfo}>
          <Icon name='android-contact' style={styles.feedItemListItemAuthorIcon} />
          <View style={styles.feedItemListItemAuthor}>
            <Text style={styles.feedItemListItemAuthorName}>{item.author.name}</Text>
            <Text style={styles.feedItemListItemAuthorTeam}>{item.author.team}</Text>
          </View>
          <Text style={styles.feedItemListItemTime}>

            <Icon name='android-time' size={15} /> {ago}
          </Text>
        </View>
        {item.type==='IMAGE' ?
        <View style={styles.feedItemListItemImgWrap}>
          <Image
            source={{ uri: item.url }}
            style={styles.feedItemListItemImg} />
        </View>
        :
        <View style={styles.feedItemListTextWrap}>
          <Text style={styles.feedItemListText}>{item.contactDetails}</Text>
        </View>
        }

      </View>
   );
  },

  render() {

    //const rows = this.state.rowData.map((row, ii) => { return {this.renderFeedItem()}; });

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
            style={styles.listView} />
        );
    }
  }
});

const select = store => {
    return {
      feed: store.feed.get('list').toJS(),
      feedListState: store.feed.get('listState')
    }
};

export default connect(select)(feedItemList);
