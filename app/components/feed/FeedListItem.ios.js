'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  Navigator,
  TouchableHighlight,
  View
} = React;

import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import time from '../../utils/time';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  feedItemListItem: {
    width: Dimensions.get('window').width,
    flex: 1
  },
  feedItemListItemImgWrap: {
    height: 400,
    top:-1, // to get top of the separator line of item above
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
    paddingRight:10,
  },
  feedItemListItemTime: {
    color: '#aaa',
    fontSize: 13,
  },
  feedItemBottomLine:{
    height:1,
    position:'absolute',
    bottom:0,
    left:15,
    right:15 ,
    backgroundColor:'#eee'
  }
});

export default React.createClass({
  render() {

    const item = this.props.item;
    const ago = time.getTimeAgo(item.createdAt);

    return (
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
          <View>
            <View style={styles.feedItemListTextWrap}>
              <Text style={styles.feedItemListText}>{item.text}</Text>
            </View>
            <View style={styles.feedItemBottomLine} />
          </View>
        }
      </View>
    );
  }
});
