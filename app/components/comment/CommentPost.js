
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native';
import theme from '../../style/theme';

import Text from '../Text';
import time from '../../utils/time';

const { width, height } = Dimensions.get('window');
const IOS = Platform.OS === 'ios';

const CommentPost = props => {
  const { item, openUserPhotos } = props;
  const ago = time.getTimeAgo(item.get('createdAt'));

  const isItemImage = item.get('type') === 'IMAGE';

  return (
      <View style={styles.itemWrapper}>
        <View style={[styles.itemContent,
          isItemImage ? styles.itemContent_image : {}
        ]}>

        {/*
          <TouchableOpacity activeOpacity={IOS ? 0.7 : 1} style={styles.feedItemListItemInfo} onPress={() => openUserPhotos(item.author)}>
            <View style={styles.feedItemListItemAuthor}>
              <Text style={styles.itemAuthorName}>{item.getIn(['author','name'])}</Text>
              <Text style={styles.itemAuthorTeam}>{item.getIn(['author','team'])}</Text>
            </View>
            <Text style={styles.itemTimestamp}>{ago}</Text>
          </TouchableOpacity>
        */}

          {isItemImage ?
            <View style={styles.itemImageWrapper}>
              <Image
              source={{ uri: item.get('url') }}
              style={styles.feedItemListItemImg} />
            </View>
          :
            <View style={styles.itemTextWrapper}>
              <Text style={styles.feedItemListText}>{item.get('text')}</Text>
            </View>
          }

        </View>
      </View>
  );
};


const styles = StyleSheet.create({
  itemWrapper: {
    width,
    flex: 1,
    backgroundColor: theme.white,
    paddingBottom: 10,
    paddingTop: 0,
  },

  itemContent:{
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
    borderBottomWidth: IOS ? 0 : 1,
    borderBottomColor: 'rgba(0, 0, 0, .075)',
    // // # Drop shadows
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.075,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 0
    },
    backgroundColor: '#fff'
  },

  itemContent_image: {
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
  },
  itemImageWrapper: {
    width: width,
    height: width,
    overflow: 'hidden'
  },
  itemTextWrapper: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 16,
    paddingBottom: 12,
    top: -10,
  },
  feedItemListText: {
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 25,
    color: theme.dark
  },
  feedItemListItemImg: {
    width: width,
    height: width,
    backgroundColor: 'transparent',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  feedItemListItemInfo: {
    flex: 1,
    flexDirection: 'row',
    padding: 13,
    paddingTop: 13,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  feedItemListItemAuthor:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  itemAuthorName: {
    fontSize: 13,
    fontWeight: 'normal',
    color: theme.secondary,
    paddingRight: 10
  },
  itemAuthorTeam:{
    fontSize:11,
    color: '#aaa'
  },
  itemTimestamp: {
    top:  IOS ? 1 : 2,
    color: '#aaa',
    fontSize: 11,
  },
});

export default CommentPost;
