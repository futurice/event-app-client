'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import React, {
  Alert,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  PropTypes,
  TouchableOpacity,
  View
} from 'react-native';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { removeFeedItem } from '../../actions/feed';
import abuse from '../../services/abuse';
import time from '../../utils/time';
import theme from '../../style/theme';

const IOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  itemWrapper: {
    width: Dimensions.get('window').width,
    backgroundColor: theme.lightblue, // theme.stable,
    paddingBottom: 10,
    paddingTop:5,
  },
  bubbleTip: {
    position: 'absolute',
    top: IOS ? 25 : 14,
    left: IOS ? 6 : 15,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: IOS ? 10 : 15,
    borderRightWidth: IOS ? 10 : 15,
    borderBottomWidth: IOS ? 10 : 15,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: IOS ? '#FFF' : 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: IOS ? 'transparent' : '#FFF',
    transform: [{ rotate: IOS ? '0deg' : '45deg' }],
    elevation: 1,

  /*
    width: 15,
    height: 15,
    backgroundColor: '#FFF',
    left: 8,
    top: 10,
    elevation: 3,
  */
    shadowColor: '#000000',
    shadowOpacity: 0.075,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: -1
    }
  },
  bubbleTip__own: {
    left: null,
    top: IOS ? 25 : 28,
    right: IOS ? 6 : 10,

    borderRightWidth: 0,
    borderTopWidth: IOS ? 10 : 0,
    borderBottomWidth: IOS ? 10 : 15,
    borderLeftWidth: IOS ? 10 : 15,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: IOS ? theme.greenLight : 'transparent',
    borderBottomColor: IOS ? 'transparent' : theme.greenLight,
    transform: [{ rotate: IOS ? '0deg' : '135deg' }],
    shadowOffset: {
      height: 1,
      width: 2
    }
  },
  itemContent:{
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    elevation: 1,
    borderRadius: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0
    },
    backgroundColor: '#fff'
  },
  itemContent__own: {
    backgroundColor: theme.greenLight
  },
  itemImageWrapper: {
    height: Dimensions.get('window').width - 36,
    width: Dimensions.get('window').width - 36,
    left: 3,
    bottom: 3,
    borderRadius: 4
  },
  itemTextWrapper: {
    paddingLeft: 47,
    paddingRight: 30,
    paddingTop: 0,
    paddingBottom: 10,
    top: -10
  },
  feedItemListText: {
    fontSize: 13,
    color: theme.dark
  },
  feedItemListItemImg: {
    width: Dimensions.get('window').width - 36,
    height: Dimensions.get('window').width - 36,
    borderRadius: 4,
    backgroundColor: '#ddd'
  },
  feedItemListItemImg__admin: {
    width: Dimensions.get('window').width - 30
  },
  feedItemListItemInfo: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  feedItemListItemAuthor:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemAuthorName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.secondary,
    paddingRight: 10
  },
  itemAuthorTeam:{
    fontSize:11,
    color: '#aaa'
  },
  feedItemListItemAuthorIcon:{
    color: '#bbb',
    fontSize: 18,
    width: 22,
    marginRight: 10
  },
  feedItemListItemAuthorImage: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: 10
  },
  listItemRemoveButton:{
    backgroundColor: 'transparent',
    color: 'rgba(150,150,150,.65)',
    fontSize: Platform.OS === 'ios' ? 22 : 20,
  },
  listItemRemoveContainer: {
    position: 'absolute',
    right: 8,
    bottom: 10,
    borderRadius:15,
    width: 30,
    height: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemTimestamp: {
    top:  Platform.OS === 'ios' ? 1 : 2,
    color: '#aaa',
    fontSize: 11
  },
  itemContent__admin:{
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 4,
    backgroundColor: '#f7f4ef'
  },
  itemTextWrapper__admin: {
    paddingLeft: 25,
    paddingRight: 15
  },
  itemAuthorName__admin: {
    color: theme.primary
  },
  feedItemListItemInfo__admin: {
    paddingLeft: 0,
    paddingBottom: 18,
  },
  feedItemListItemAuthor__admin:  {
    paddingLeft: 25,
  },
  itemTimestamp__admin:{
    color: '#b5afa6'
  },
  feedItemListText__admin: {
    color: '#7d776e',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 19,
  }
});

const TEST_IMG = 'https://images.unsplash.com/photo-1461823385004-d7660947a7c0?dpr=2&auto=compress,format&crop=entropy&fit=crop&w=376&h=251&q=80&cs=tinysrgb';

const FeedListItem = React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  },

  itemIsCreatedByMe(item) {
    return item.author.type === 'ME';
  },

  showRemoveDialog(item) {
    if (this.itemIsCreatedByMe(item)) {
      Alert.alert(
        'Remove Content',
        'Do you want to remove this item?',
        [
          { text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Yes, remove item',
            onPress: () => this.removeThisItem(), style: 'destructive' }
        ]
      );
    } else {
      Alert.alert(
        'Flag Content',
        'Do you want to report this item?',
        [
          { text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Yes, report item',
            onPress: () => abuse.reportFeedItem(item), style: 'destructive' }
        ]
      );
    }
  },

  removeThisItem() {
    this.props.dispatch(removeFeedItem(this.props.item));
  },

  // Render "remove" button, which is remove OR flag button,
  // depending is the user the creator of this feed item or not
  renderRemoveButton(item) {
    if (item.author.type === 'SYSTEM') {

      return <View></View>; // currently it is not possible to return null in RN as a view
    }

    const iconName = this.itemIsCreatedByMe(item) ? 'delete' : 'flag';
    return (
      <TouchableOpacity
       style={[styles.listItemRemoveContainer,
         {backgroundColor:item.type !== 'IMAGE' ? 'transparent' : 'rgba(255,255,255,.1)'}]}
       onPress={() => this.showRemoveDialog(this.props.item)}>

        <Icon name={iconName} style={[styles.listItemRemoveButton,
          {opacity:item.type !== 'IMAGE' ? 0.7 : 1}]
        }/>

      </TouchableOpacity>
    );
  },

  renderAdminItem() {
    const item = this.props.item;
    const ago = time.getTimeAgo(item.createdAt);

    return (
      <View style={styles.itemWrapper}>
        <View style={[styles.itemContent, styles.itemContent__admin]}>

          <View style={[styles.feedItemListItemInfo, styles.feedItemListItemInfo__admin]}>
            <View style={[styles.feedItemListItemAuthor, styles.feedItemListItemAuthor__admin]}>
              <Text style={[styles.itemAuthorName, styles.itemAuthorName__admin]}>FutuBot</Text>
              <Text style={[styles.itemTimestamp, styles.itemTimestamp__admin]}>{ago}</Text>
            </View>
          </View>

          {item.type === 'IMAGE' ?
            <View style={styles.itemImageWrapper}>
              <Image
                source={{ uri: item.url }}
                style={[styles.feedItemListItemImg, styles.feedItemListItemImg__admin]} />
            </View>
          :
            <View style={[styles.itemTextWrapper, styles.itemTextWrapper__admin]}>
              <Text style={[styles.feedItemListText, styles.feedItemListText__admin]}>
                {item.text}
              </Text>
            </View>
          }
        </View>
      </View>
    );
  },

  render() {
    const item = this.props.item;
    const ago = time.getTimeAgo(item.createdAt);

    if (item.author.type === 'SYSTEM') {
      return this.renderAdminItem();
    }

    const itemStyles = [styles.itemContent];
    const bubbleTipStyles = [styles.bubbleTip];
    if (this.itemIsCreatedByMe(item)) {
      itemStyles.push(styles.itemContent__own)
      bubbleTipStyles.push(styles.bubbleTip__own)
    }

    return (
      <View style={styles.itemWrapper}>

        <View style={itemStyles}>
          <View style={styles.feedItemListItemInfo}>
          { item.author.picture ?
            <Image
              source={{ uri: item.author.picture }}
              style={styles.feedItemListItemAuthorImage} /> :
            <Icon name='face' style={styles.feedItemListItemAuthorIcon} />
          }

            <View style={styles.feedItemListItemAuthor}>
              <Text style={styles.itemAuthorName}>{item.author.name}</Text>
              <Text style={styles.itemAuthorTeam}>{item.author.team}</Text>
            </View>
            <Text style={styles.itemTimestamp}>{ago}</Text>
          </View>

          {item.type === 'IMAGE' ||
            (item.text && item.text.indexOf('TESTIMAGE') >= 0)
            ?
            <View style={styles.itemImageWrapper}>
              <Image
                source={{ uri: TEST_IMG || item.url }}
                style={styles.feedItemListItemImg} />
            </View>
          :
            <View style={styles.itemTextWrapper}>
              <Text style={styles.feedItemListText}>{item.text}</Text>
            </View>
          }

          {this.renderRemoveButton(item)}

        </View>
        <View style={bubbleTipStyles} />
      </View>
    );
  }
});

const select = store => {
  return {
    user: store.registration.toJS()
  }
};

export default connect(select)(FeedListItem);
