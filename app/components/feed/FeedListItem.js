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
  TouchableWithoutFeedback,
  View,
  Animated,
  Easing
} from 'react-native';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import md5 from 'blueimp-md5';

import { removeFeedItem, openLightBox } from '../../actions/feed';
import abuse from '../../services/abuse';
import time from '../../utils/time';
import theme from '../../style/theme';

const IOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  itemWrapper: {
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',//theme.lightblue, // theme.stable,
    paddingBottom: 8,
    paddingTop:8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center'
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
  itemPusher: {
    // position: 'absolute',
    flex: 1,
    width: 20
  },
  itemContent:{
    marginLeft: 15,
    // marginRight: 55,
    flex: 4,
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

    marginLeft: 55,
    marginRight: 15,
    backgroundColor: theme.greenLight
  },
  itemContent__image: {
    marginLeft: 15,
    marginRight: 15
  },
  itemImageWrapper: {
    height: Dimensions.get('window').width - 36,
    width: Dimensions.get('window').width - 36,
    left: 3,
    bottom: 3,
    borderRadius: 4
  },
  itemTextWrapper: {
    flex: 1,
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
    backgroundColor: 'transparent' // theme.accent
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
    backgroundColor: '#f9f4db'
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

// const TEST_IMG = 'https://images.unsplash.com/photo-1461823385004-d7660947a7c0?dpr=2&auto=compress,format&crop=entropy&fit=crop&w=376&h=251&q=80&cs=tinysrgb';
// const TEST_IMG = 'https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/events/bad-finance.jpg';
// const TEST_IMG = 'https://raw.githubusercontent.com/futurice/gif-disco/master/gif_disco.gif';
// const TEST_IMG = Math.random() >= 0.5 ?
//   'https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/1412341377.gif' :
//   'https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/events/bad-finance.jpg';

const TEST_IMG =  'https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/events/bad-finance.jpg';
 // 'https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/2013-10-11-22-29-08.gif'

import BGS from '../../constants/Backgrounds';

const FeedListItem = React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      itemAnimation: new Animated.Value(0),
      selected: false
    };
  },

  animateItem() {
    const { index } = this.props;
    const ITEMS_FETCH_LENGTH = 20;
    Animated.timing(
      this.state.itemAnimation,
      { toValue: 1, delay: 50 * (index % ITEMS_FETCH_LENGTH), duration: 200, easing: Easing.easeInOutBack }
      ).start();
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
            onPress: () => { this.deSelectItem(); console.log('Cancel Pressed'); }, style: 'cancel' },
          { text: 'Yes, remove item',
            onPress: () => { this.deSelectItem(); this.removeThisItem(); }, style: 'destructive' }
        ]
      );
    } else {
      Alert.alert(
        'Flag Content',
        'Do you want to report this item?',
        [
          { text: 'Cancel',
            onPress: () =>  { this.deSelectItem(); console.log('Cancel Pressed'); }, style: 'cancel' },
          { text: 'Yes, report item',
            onPress: () =>  { this.deSelectItem(); abuse.reportFeedItem(item); }, style: 'destructive' }
        ]
      );
    }
  },

  selectItem() {
    this.setState({ selected: true });
    this.showRemoveDialog(this.props.item);
  },

  deSelectItem() {
    this.setState({ selected: false });
  },

  removeThisItem() {
    this.props.dispatch(removeFeedItem(this.props.item));
  },

  getItemGravatar(email) {
    const defaultAvatarUrl = 'https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/avatar6.png';
    if (!email) {
      return defaultAvatarUrl;
    }
    const hashedEmail = md5(email);
    return `http://www.gravatar.com/avatar/${hashedEmail}?d=${defaultAvatarUrl}`;
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
        <Animated.View style={[styles.itemContent, styles.itemContent__admin,
          {opacity: this.state.itemAnimation}]}
        >
          <View style={[styles.feedItemListItemInfo, styles.feedItemListItemInfo__admin]}>
            <View style={[styles.feedItemListItemAuthor, styles.feedItemListItemAuthor__admin]}>
              <Text style={[styles.itemAuthorName, styles.itemAuthorName__admin]}>FutubileBot</Text>
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
        </Animated.View>
      </View>
    );
  },

  render() {
    const { item } = this.props;
    const ago = time.getTimeAgo(item.createdAt);
    const isMyItem = this.itemIsCreatedByMe(item);
    const isItemImage = item.type === 'IMAGE' || (item.text && item.text.indexOf('TESTIMAGE') >= 0);

    setTimeout(() => {
      this.animateItem();
    });

    if (item.author.type === 'SYSTEM') {
      return this.renderAdminItem();
    }

    const itemStyles = [styles.itemContent];
    const bubbleTipStyles = [styles.bubbleTip];


    if (isMyItem) {
      itemStyles.push(styles.itemContent__own)
      bubbleTipStyles.push(styles.bubbleTip__own)
    }

    if (isItemImage) {
      itemStyles.push(styles.itemContent__image)
    }

    return (
      <Animated.View style={[
        styles.itemWrapper,
        {
          backgroundColor: this.state.selected ? 'rgba(255,82,64,.1)' : 'transparent'
          /*
          opacity: this.state.itemAnimation,
          transform:
            [{ translateX: this.state.itemAnimation.interpolate({ inputRange: [0, 1], outputRange: isMyItem ? [400, 0] : [-400, 0] })}]
          */
        }
      ]}>

        {!isItemImage && isMyItem && <View style={styles.itemPusher} /> }
        <TouchableOpacity
          activeOpacity={1}
          style={itemStyles}
          onLongPress={() => this.selectItem() }

        >
          <View style={styles.feedItemListItemInfo}>

            <Image
              source={{ uri: item.author.picture || this.getItemGravatar(item.author.email) }}
              style={styles.feedItemListItemAuthorImage} />
          { /*
            <Icon name='face' style={styles.feedItemListItemAuthorIcon} />

          */}

            <View style={styles.feedItemListItemAuthor}>
              <Text style={styles.itemAuthorName}>{item.author.name}</Text>
              <Text style={styles.itemAuthorTeam}>{item.author.team}</Text>
            </View>
            <Text style={styles.itemTimestamp}>{ago}</Text>
          </View>

          {isItemImage
            ?
            <View style={styles.itemImageWrapper}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.dispatch(openLightBox(TEST_IMG || item.url))}
              >

                <Image
                resizeMode={'cover'}
                source={ BGS['BG' + (this.props.index % 8 + 1) ]}
                style={{
                  position: 'absolute',
                  height: Dimensions.get('window').width - 36,
                  width: Dimensions.get('window').width - 36,
                  left: 0,
                  top: 0,
                  right: 0,
                  opacity: 0.6,
                  borderRadius: 3
                }}
                />

              <Image
                source={{ uri: TEST_IMG || item.url }}
                style={styles.feedItemListItemImg} />



              </TouchableOpacity>
            </View>
          :
            <View style={styles.itemTextWrapper}>
              <Text style={styles.feedItemListText}>{item.text}</Text>
            </View>
          }

          {/* this.renderRemoveButton(item) */}

        </TouchableOpacity>
        {!isItemImage && !isMyItem && <View style={ styles.itemPusher } /> }
        {!isItemImage && <View style={bubbleTipStyles} />}
      </Animated.View>
    );
  }
});

const select = store => {
  return {
    user: store.registration.toJS()
  }
};

export default connect(select)(FeedListItem);
