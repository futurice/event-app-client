'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View
} = React;

import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import time from '../../utils/time';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  feedItemListItemWrap: {
    width: Dimensions.get('window').width,
    backgroundColor:'#f9f9f9',
    paddingBottom:15,
  },
  feedItemListItem:{
    flex: 1,
    elevation:2,
    backgroundColor:'#fff'
  },
  feedItemListItemImgWrap: {
    height: 400,
    width: Dimensions.get('window').width,
  },
  feedItemListTextWrap: {
    paddingLeft:36,
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
    alignItems:'center',
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
    color:'#bbb',
    fontSize: 15,
    marginTop:1,
    paddingRight:10,
  },
  feedItemListItemTime: {
    color: '#aaa',
    fontSize: 13,
  }
});

export default React.createClass({
  render() {

    const item = this.props.item;
    const ago = time.getTimeAgo(item.createdAt);

    return (
      <View style={styles.feedItemListItemWrap}>
        <View style={styles.feedItemListItem}>

        <View style={styles.feedItemListItemInfo}>
          <Icon name='android-contact' style={styles.feedItemListItemAuthorIcon} />
          <View style={styles.feedItemListItemAuthor}>
            <Text style={styles.feedItemListItemAuthorName}>{item.author.name}</Text>
            <Text style={styles.feedItemListItemAuthorTeam}>{item.author.team}</Text>
          </View>
          <Text style={styles.feedItemListItemTime}>{ago}</Text>
        </View>
        {item.type==='IMAGE' ?
        <View style={styles.feedItemListItemImgWrap}>
          <Image
            source={{ uri: item.url }}
            style={styles.feedItemListItemImg} />
        </View>
        :
        <View style={styles.feedItemListTextWrap}>
          <Text style={styles.feedItemListText}>{item.text}</Text>
        </View>
        }

        </View>
      </View>
    );
  }
});
