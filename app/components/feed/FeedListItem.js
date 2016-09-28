'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import React, { PropTypes } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
  Easing
} from 'react-native';

import ParsedText from 'react-native-parsed-text';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { removeFeedItem, openLightBox } from '../../actions/feed';
import abuse from '../../services/abuse';
import time from '../../utils/time';
import { getGravatarForEmail } from '../../utils/gravatar';
import theme from '../../style/theme';

const { width, height } = Dimensions.get('window');
const IOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  itemWrapper: {
    width,
    backgroundColor: 'transparent',//theme.lightblue, // theme.stable,
    paddingBottom: 8,
    paddingTop:8,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  itemWrapper__adjacent: {
    paddingTop: 0
  },
  bubbleTip: {
    position: 'absolute',
    top: IOS ? 54 : 11,
    left: IOS ? 6 : 15,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: IOS ? 8 : 15,
    borderRightWidth: IOS ? 15 : 15,
    borderBottomWidth: IOS ? 8 : 15,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: IOS ? theme.lightblue : 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: IOS ? 'transparent' : '#FFF',
    transform: [{ rotate: IOS ? '30deg' : '45deg' }],
    elevation: 1,

  /*
    width: 15,
    height: 15,
    backgroundColor: '#FFF',
    left: 8,
    top: 10,
    elevation: 3,
  */
    // shadowColor: '#000000',
    // shadowOpacity: 0.15,
    // shadowRadius: 1,
    // shadowOffset: {
    //   height: 1,
    //   width: -1
    // }
  },
  bubbleTip__own: {
    left: null,
    top: IOS ? 54 : 23,
    right: IOS ? 6 : 10,

    borderRightWidth: 0,
    borderTopWidth: IOS ? 8 : 0,
    borderBottomWidth: IOS ? 8 : 15,
    borderLeftWidth: IOS ? 15 : 15,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: IOS ? theme.secondaryLight : 'transparent',
    borderBottomColor: IOS ? 'transparent' : theme.secondaryLight,
    backgroundColor: IOS ? 'transparent' : theme.secondaryLight,
    transform: [{ rotate: IOS ? '-30deg' : '135deg' }],
    // shadowOffset: {
    //   height: 1,
    //   width: 2
    // }
  },
  bubbleTip__adjacent: {
    opacity: 0
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
    borderRadius: IOS ? 10 : 4,
    // shadowColor: '#000000',
    // shadowOpacity: 0.15,
    // shadowRadius: 1,
    // shadowOffset: {
    //   height: 1,
    //   width: 0
    // },
    backgroundColor: IOS ? theme.lightblue : '#fff'
  },
  itemContent__own: {
    flex: 6,
    marginLeft: 50,
    marginRight: 15,
    backgroundColor: theme.secondaryLight
  },
  itemContent__adjacent: {
   // marginLeft: 47,
    flex: null,
    maxWidth: width * 0.75
  },
  itemContent__image: {
    marginLeft: 15,
    marginRight: 15
  },
  itemImageWrapper: {
    height:  IOS ? width - 30 : width - 36,
    width: IOS ? width - 30 : width - 36,
    left: IOS ? 0 : 3,
    bottom: IOS ? 0 : 3,
    borderRadius: IOS ? 10 : 4,
    marginTop: 15,
  },
  itemImageWrapper__adjacent: {
    marginTop: IOS ? 0 : 6,
  },
  itemTextWrapper: {
    paddingLeft: 15,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    top: 0,
  },
  itemTextWrapper__adjacent: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  feedItemListText: {
    backgroundColor: 'transparent',
    fontSize: 13,
    lineHeight: 18,
    color: theme.dark,
  },
  url: {
    fontWeight: 'bold',
    // textDecorationLine: 'underline'
  },
  hashTag: {
    opacity: 0.6
  },
  feedItemListItemImg: {
    width: IOS ? width - 30 : width - 36,
    height: IOS ? width - 30 : width - 36,
    borderRadius: IOS ? 10 : 4,
    backgroundColor: 'transparent' // theme.accent
  },
  feedItemListItemImg__admin: {
    width: width - 30
  },
  feedItemListItemInfo: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 0,
    alignItems: 'center',
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
  itemAuthorName__own: {
    color: theme.white
  },
  itemAuthorTeam:{
    fontSize:11,
    color: 'rgba(0,0,0,.4)'
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
    color: 'rgba(0,0,0,.4)',
    fontSize: 11
  },
  itemContent__admin:{
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: IOS ? 10 : 4,
    backgroundColor: '#f9f4db'
  },
  itemTextWrapper__admin: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 0,
  },
  itemAuthorName__admin: {
    color: theme.primary
  },
  feedItemListItemInfo__admin: {
    paddingLeft: 0,
    paddingBottom: 7,
  },
  feedItemListItemAuthor__admin:  {
    paddingLeft: 15,
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
// 'https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/1412341377.gif' :
// 'https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/events/bad-finance.jpg';
// 'https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/2013-10-11-22-29-08.gif'
// import BGS from '../../constants/Backgrounds';
const TEST_IMG =  'https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/events/bad-finance.jpg';


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
    this.props.removeFeedItem(this.props.item);
  },

  getItemGravatar(email, name, teamName) {
    const teamId = this.props.teams.findIndex(team => team.get('name', '').toLowerCase() === (teamName || '').toLowerCase() );
    return getGravatarForEmail(email, name, teamId);
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
   // const item = {id: "28", type: "IMAGE", author: { name: 'SYSTEM' }, url:'https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/1412341377.gif', createdAt: "2016-09-25T21:53:13.810Z", text: "Pasi gets first bite!"}
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

        {/* https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/1412341377.gif */}
        {/* https://dl.dropboxusercontent.com/u/11383584/cdn/futubileet16/events/bad-finance.jpg */}
          {item.type === 'IMAGE' ?
            <View style={styles.itemImageWrapper}>
              <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.props.openLightBox(item)}
              >
                <Image
                  resizeMode={'cover'}
                  source={{ uri: item.url }}
                  style={[styles.feedItemListItemImg, styles.feedItemListItemImg__admin]} />
              </TouchableOpacity>
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
    const { item, showUser } = this.props;
    const ago = time.getTimeAgo(item.createdAt);
    const isMyItem = this.itemIsCreatedByMe(item);
    const isItemImage = item.type === 'IMAGE' || (item.text && item.text.indexOf('TESTIMAGE') >= 0);

    setTimeout(() => {
      this.animateItem();
    });

    if (item.author.type === 'SYSTEM') {
      return this.renderAdminItem();
    }


    const itemWrapperStyles = [styles.itemWrapper];
    const itemStyles = [styles.itemContent];
    const bubbleTipStyles = [styles.bubbleTip];
    const itemAuthorNameStyles = [styles.itemAuthorName];
    const feedItemListTextStyles = [styles.feedItemListText];
    const itemTextWrapperStyles = [styles.itemTextWrapper];
    const itemImageWrapperStyles = [styles.itemImageWrapper];


    if (isMyItem) {
      itemStyles.push(styles.itemContent__own);
      bubbleTipStyles.push(styles.bubbleTip__own);
      itemAuthorNameStyles.push(styles.itemAuthorName__own);
      feedItemListTextStyles.push(styles.itemAuthorName__own);
    }

    if (!showUser) {
      itemWrapperStyles.push(styles.itemWrapper__adjacent)
      bubbleTipStyles.push(styles.bubbleTip__adjacent);
      itemTextWrapperStyles.push(styles.itemTextWrapper__adjacent);
      itemImageWrapperStyles.push(styles.itemImageWrapper__adjacent);
    }
    if (!showUser && !isItemImage) {
      itemStyles.push(styles.itemContent__adjacent);
    }

    if (isItemImage) {
      itemStyles.push(styles.itemContent__image)
    }

    return (
      <View style={[
        itemWrapperStyles,
        {
          backgroundColor: this.state.selected ? 'rgba(0,0,0,.01)' : 'transparent'
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
          { showUser &&
            <View style={styles.feedItemListItemInfo}>
              <Image
                source={{ uri: item.author.picture || this.getItemGravatar(item.author.email, item.author.name, item.author.team) }}
                style={styles.feedItemListItemAuthorImage} />

              <View style={styles.feedItemListItemAuthor}>
                <Text style={itemAuthorNameStyles}>{isMyItem ? 'You' : item.author.name }</Text>
                <Text style={styles.itemAuthorTeam}>{item.author.team}</Text>
              </View>
              <Text style={styles.itemTimestamp}>{ago}</Text>
            </View>
          }

          {isItemImage
            ?
            <View style={itemImageWrapperStyles}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.openLightBox(item)}
              >

              {/*
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
                />*/}
              <Image
                source={{ uri: item.url }}
                style={styles.feedItemListItemImg} />



              </TouchableOpacity>
            </View>
          :
            <View style={itemTextWrapperStyles}>
             {/* <Text style={feedItemListTextStyles}>{item.text}</Text> */}

              <ParsedText
                style={feedItemListTextStyles}
                parse={ [
                  {type: 'url', style: styles.url, onPress: this.props.handleUrlPress},
                  {pattern: /#(\w+)/, style: styles.hashTag},
                 ] }
              >
                {item.text}
              </ParsedText>

            </View>
          }

          {/* this.renderRemoveButton(item) */}

        </TouchableOpacity>
        {!isItemImage && !isMyItem && <View style={ styles.itemPusher } /> }
        {!isItemImage && <View style={bubbleTipStyles} />}
      </View>
    );
  }
});

const mapDispatch = { removeFeedItem, openLightBox }

const select = store => {
  return {
    teams: store.team.get('teams'),
    user: store.registration.toJS()
  }
};

export default connect(select, mapDispatch)(FeedListItem);
