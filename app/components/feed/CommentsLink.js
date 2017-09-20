import React, { Component } from 'react';
import { View, StyleSheet, Platform, Image } from 'react-native';

import Text from '../Text';
import PlatformTouchable from '../common/PlatformTouchable';
import theme from '../../style/theme';

import ICONS from '../../constants/Icons';
const IOS = Platform.OS === 'ios';

class CommentsLinks extends Component {
  render() {
    const { commentCount, openComments } = this.props;

    const hasComments = commentCount > 0;

    return (
      <PlatformTouchable style={styles.commentLink} onPress={openComments}>
        <View style={styles.comment}>

          <Text style={[styles.commentText, styles.commentTextRight]}>
            <Image
              source={hasComments ? ICONS.COMMENT_ON : ICONS.COMMENT_OFF}
              style={styles.commentIcon}
            />
            {/*<Icon
              style={[styles.commentIcon, hasComments ? styles.activeCommentIcon : {}]}
              name={hasComments ? 'chat-bubble' : 'chat-bubble-outline'}
            />*/}
          </Text>
          <Text style={styles.commentText}>
            {hasComments ? commentCount : '0'}
          </Text>
        </View>
      </PlatformTouchable>
    );
  }
};


const styles = StyleSheet.create({
  comment: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentText: {
    color: theme.secondary,
    fontSize: 17,
    top: IOS ? 3 : 0,
    paddingTop: 1,
    marginLeft: 5,
  },
  commentTextRight: {
    marginLeft: 7,
  },
  commentIcon: {
    width: 20
  },
  activeCommentIcon: {
    color: theme.secondary,
  }
});


export default CommentsLinks;
