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
  Platform,
} = React;
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import time from '../../utils/time';
import theme from '../../style/theme';
import * as EventActions from '../../actions/event';
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
    padding:20,
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
    alignItems:'center',
    justifyContent:'space-between',
  },
  feedItemListItemAuthor:{
    flex:1,
    flexDirection:'row',
  },
  feedItemListItemAuthorName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.secondary
  },
  feedItemListItemAuthorIcon:{
    color:'#aaa',
    fontSize: 13,
    marginTop:3,
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
    this.props.dispatch(EventActions.fetchEvents());
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
      <Text>Ladataan kuvia...</Text>
    </View>;
  },

  navigateToSinglePhoto(model){
    this.props.navigator.push({
      component: SinglePhoto,
      name: model.name,
      actions: ['share'],
      model
    });
  },

  renderEventItem(item) {
    const ago = time.getTimeAgo(item.startTime);

    return (
      <View style={styles.feedItemListItem}>

        <View style={styles.feedItemListItemInfo}>
          <View style={styles.feedItemListItemAuthor}>
            <Icon name='android-contact' style={styles.feedItemListItemAuthorIcon} />
            <Text style={styles.feedItemListItemAuthorName}>{item.name}</Text>
          </View>
          <Text style={styles.feedItemListItemTime}>

            <Icon name='android-time' size={13} /> {ago}
          </Text>
        </View>
        {item.type!=='IMAGE' ?
        <View style={styles.feedItemListItemImgWrap}>
          <Image
            source={{ uri: item.coverImage }}
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
    switch (this.props.eventsListState) {
      case 'loading':
        return this.renderLoadingView();
      case 'failed':
        return (
          <View style={styles.container}>
            <Text>Kuvia ei saatu haettua :(</Text>
          </View>
        );
      default:
        return (
          <ListView
            dataSource={this.state.dataSource.cloneWithRows(this.props.events)}
            renderRow={this.renderEventItem}
            style={styles.listView} />
        );
    }
  }
});

const select = store => {
    return {
      events: store.event.get('list').toJS(),
      eventsListState: store.event.get('listState')
    }
};

export default connect(select)(feedItemList);
