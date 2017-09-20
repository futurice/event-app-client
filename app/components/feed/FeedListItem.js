

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import React, { PropTypes } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  View,
  Animated,
  Easing
} from 'react-native';
import Text from '../Text';

import ParsedText from 'react-native-parsed-text';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import { removeFeedItem, openLightBox } from '../../actions/feed';
import abuse from '../../services/abuse';
import time from '../../utils/time';
import { getGravatarForEmail } from '../../utils/gravatar';
import theme from '../../style/theme';
import VotePanel from './VotePanel';
import CommentsLink from './CommentsLink';

const { width, height } = Dimensions.get('window');
const IOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  itemWrapper: {
    width,
    backgroundColor: 'transparent',//theme.lightblue, // theme.stable,
    paddingBottom: 8,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  itemWrapper__adjacent: {
    paddingTop: 0
  },
  itemContent:{
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 2,
    borderColor: theme.secondary,

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
    backgroundColor: theme.white
  },
  itemContent__own: {
    // flex: 6,
    // marginLeft: 50,
    // marginRight: 15,
    // backgroundColor: theme.secondaryLight
  },
  itemContent__adjacent: {
    // marginLeft: 47,
    // flex: null,
    // maxWidth: width * 0.75
  },
  itemContent__image: {
    marginLeft: 15,
    marginRight: 15
  },
  itemImageWrapper: {
    height:  width - 44,
    width: width - 44,
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 0,
    margin: 5,
    marginBottom: IOS ? 0 : 5,
  },
  itemImageWrapper__adjacent: {
    // marginTop: IOS ? 0 : 6,
  },
  itemTextWrapper: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 20,
    paddingBottom: IOS ? 15 : 20,
    top: 0,
    margin: 5,
    backgroundColor: theme.secondary,
  },
  itemTextWrapper__short: {
    backgroundColor: theme.accent,
    paddingBottom: IOS ? 10 : 20,
  },
  itemTextWrapper__short__odd: {
    backgroundColor: theme.pink
  },
  itemTextWrapper__adjacent: {},
  feedItemListText: {
    backgroundColor: theme.transparent,
    fontFamily: IOS ? 'Futurice' : 'Futurice-Regular',
    color: theme.white,
    fontSize: 16,
    lineHeight: IOS ? 16 : 22,
  },
  feedItemListText__short: {
    color: theme.secondary,
    fontSize: 36,
    lineHeight: 50,
    textAlign: 'center',
  },
  feedItemListText__short__odd: {
    color: theme.white,
  },
  url: {
    textDecorationLine: 'underline'
  },
  hashTag: {
    opacity: 0.6
  },
  feedItemListItemImg: {
    width: width - 44,
    height: width - 44,
    borderRadius: 0,
    backgroundColor: 'transparent' // theme.accent
  },
  feedItemListItemImg__admin: {
    backgroundColor: theme.white,
    // width: width - 40
  },
  feedItemListItemInfo: {
    flex: 1,
    flexDirection: 'row',
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: theme.secondary,
  },
  feedItemListItemAuthor:{
    flex: 1,
    flexDirection: 'column',
    top: IOS ? 5 : 2,
    backgroundColor: theme.transparent,
  },
  itemAuthorName: {
    fontSize: 16,
    color: theme.secondary,
    backgroundColor: theme.transparent,
  },
  itemAuthorName__own: {
    color: theme.secondary
  },
  itemAuthorTeam:{
    fontSize: 16,
    color: theme.pink,
    backgroundColor: theme.transparent,
    top: -2,
  },
  feedItemListItemAuthorIcon: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginRight: 8,
    borderWidth: 2,
    borderColor: theme.secondary,
    overflow: 'hidden',
  },
  feedItemListItemAuthorIconText: {
    color: '#ddd',
    fontSize: 24,
    backgroundColor: 'transparent'
  },
  feedItemListItemAuthorImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    borderWidth: 2,
    borderColor: theme.secondary
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
    color: theme.secondary,
    opacity: 0.8,
    fontSize: 15,
    paddingTop: IOS ? 4 : 0,
  },
  itemContent__admin:{
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: IOS ? 10 : 4,
    backgroundColor: theme.accent,
  },
  itemTextWrapper__admin: {
    paddingLeft: 5,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: IOS ? 0 : 5,
    backgroundColor: theme.transparent,
  },
  itemAuthorName__admin: {
    color: theme.primary,
    paddingVertical: 2,
    paddingBottom: 6
  },
  feedItemListItemInfo__admin: {
    paddingLeft: 0,
    paddingBottom: 7,
  },
  feedItemListItemAuthor__admin:  {
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTimestamp__admin:{
    paddingTop: IOS ? 2 : 2,
  },
  feedItemListText__admin: {
    color: theme.secondary,
    fontSize: 15,
    lineHeight: 20,
  },
  footer: {
    paddingVertical: 0,
    borderTopWidth: 2,
    borderTopColor: theme.secondary,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
});


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

  // animateItem() {
  //   const { index } = this.props;
  //   const ITEMS_FETCH_LENGTH = 20;
  //   Animated.timing(
  //     this.state.itemAnimation,
  //     { toValue: 1, delay: 50 * (index % ITEMS_FETCH_LENGTH), duration: 200, easing: Easing.easeInOutBack }
  //     ).start();
  // },



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
    const team = this.props.teams.find(t => t.get('name', '').toLowerCase() === (teamName || '').toLowerCase() );
    const teamId = team ? team.get('id') : 0;
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
    const ago = time.getTimeAgo(item.createdAt);

    return (
      <View style={styles.itemWrapper}>
        <View style={[styles.itemContent, styles.itemContent__admin]}>
          <View style={[styles.feedItemListItemInfo, styles.feedItemListItemInfo__admin]}>
            <View style={[styles.feedItemListItemAuthor, styles.feedItemListItemAuthor__admin]}>
              <Text style={[styles.itemAuthorName, styles.itemAuthorName__admin]}>Futufinlandia</Text>
              <Text style={[styles.itemTimestamp, styles.itemTimestamp__admin]}>{ago}</Text>
            </View>
          </View>

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
        </View>
      </View>
    );
  },

  render() {
    const { item, showUser, openComments } = this.props;
    const ago = time.getTimeAgo(item.createdAt);
    const isMyItem = this.itemIsCreatedByMe(item);
    const isItemImage = item.type === 'IMAGE';

    // setTimeout(() => {
    //   this.animateItem();
    // });

    if (item.author.type === 'SYSTEM') {
      return this.renderAdminItem();
    }


    const itemWrapperStyles = [styles.itemWrapper];
    const itemStyles = [styles.itemContent];
    const itemAuthorNameStyles = [styles.itemAuthorName];
    const feedItemListTextStyles = [styles.feedItemListText];
    const itemTextWrapperStyles = [styles.itemTextWrapper];
    const itemImageWrapperStyles = [styles.itemImageWrapper];


    if (isMyItem) {
      itemStyles.push(styles.itemContent__own);
      itemAuthorNameStyles.push(styles.itemAuthorName__own);
    }

    if (item.text && item.text.length < 20) {
      itemTextWrapperStyles.push(styles.itemTextWrapper__short)
      feedItemListTextStyles.push(styles.feedItemListText__short)

      // vary short item styling
      const itemHash = moment(item.createdAt).valueOf();
      if (itemHash % 2) {
        itemTextWrapperStyles.push(styles.itemTextWrapper__short__odd);
        feedItemListTextStyles.push(styles.feedItemListText__short__odd);
      }
    }

    if (!showUser) {
      itemWrapperStyles.push(styles.itemWrapper__adjacent)
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
          backgroundColor: this.state.selected ? 'rgba(0,0,0,.01)' : 'transparent',
          // opacity: this.state.itemAnimation,
          // transform:
          //   [{ translateY: this.state.itemAnimation.interpolate({ inputRange: [0, 1], outputRange: [100, 0] })}]
        }
      ]}>

        <TouchableOpacity
          activeOpacity={1}
          style={itemStyles}
          onLongPress={() => this.selectItem() }

        >

          <View style={styles.feedItemListItemInfo}>
          {item.author.picture
            ? <Image
              source={{ uri: item.author.picture }}
              style={styles.feedItemListItemAuthorImage} />
            :
              <View style={styles.feedItemListItemAuthorIcon}>
                <Icon
                  name="person-outline"
                  style={styles.feedItemListItemAuthorIconText} />
              </View>
            }
            <View style={styles.feedItemListItemAuthor}>
              <Text style={itemAuthorNameStyles}>{isMyItem ? 'You' : item.author.name}</Text>
              <Text style={styles.itemAuthorTeam}>{item.author.team}</Text>
            </View>
            <Text style={styles.itemTimestamp}>{ago}</Text>
          </View>

          {isItemImage
            ?
            <View style={itemImageWrapperStyles}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.openLightBox(item)}
              >

              <Image
                source={{ uri: item.url }}
                style={styles.feedItemListItemImg} />



              </TouchableOpacity>
            </View>
          :
            <View style={itemTextWrapperStyles}>

              <ParsedText
                style={feedItemListTextStyles}
                parse={[
                  { type: 'url', style: styles.url, onPress: this.props.handleUrlPress },
                  { pattern: /#(\w+)/, style: styles.hashTag },
                ]}
              >
                {item.text}
              </ParsedText>

            </View>
          }

          <View style={styles.footer}>
            <VotePanel
              item={item}
              voteFeedItem={this.props.voteFeedItem}
              openRegistrationView={this.props.openRegistrationView}
            />

            <CommentsLink
              parentId={item.id}
              commentCount={item.commentCount}
              openComments={() => openComments(item.id)}
            />

          </View>

        </TouchableOpacity>
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
