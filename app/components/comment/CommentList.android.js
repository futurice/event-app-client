
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Platform,
  ActivityIndicator,
  Dimensions
} from 'react-native';

import Text from '../Text';
import theme from '../../style/theme';
import time from '../../utils/time';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommentForm from './CommentForm';

const { width, height } = Dimensions.get('window');
const IOS = Platform.OS === 'ios';

const Comment = ({ item }) => {
  const ago = time.getTimeAgo(item.get('createdAt'));
  const profilePicture = item.get('picture');

  return (
    <View style={styles.comment}>
        <View style={styles.commentContent}>
          <View style={styles.commentAvatarCol}>
            <View style={styles.commentAvatar}>
              {profilePicture
                ? <Image source={{ uri: profilePicture }} style={styles.commentAvatarImage} />
                : <Icon name="person" style={styles.commentAvatarIcon} />
              }
            </View>
          </View>

          <View style={styles.commentTextContent}>
            <Text style={styles.commentText}>
              <Text style={styles.commentAuthor}>{item.get('userName')} </Text>
              {item.get('text')}
            </Text>

            <Text style={styles.itemTimestamp}>{ago}</Text>
          </View>
        </View>
    </View>
  );
};

const CommentPost = ({ item }) => {
  const ago = time.getTimeAgo(item.get('createdAt'));
  const profilePicture = item.getIn(['author', 'picture']);
  const userName = item.getIn(['author', 'name']);
  const isImage = item.get('type') === 'IMAGE';


  return (
    <View style={styles.comment}>
        <View style={styles.commentContent}>
          <View style={styles.commentAvatarCol}>
            <View style={styles.commentAvatar}>
              {profilePicture
                ? <Image source={{ uri: profilePicture }} style={styles.commentAvatarImage} />
                : <Icon name="person" style={styles.commentAvatarIcon} />
              }
            </View>
          </View>

          <View style={styles.commentTextContent}>
            {isImage
              ?
              <View style={{ marginTop: 0 }}>
                <Text style={styles.commentAuthor}>{item.get('userName')}</Text>
                <Image style={{ width: 120, height: 120 }} source={{ uri: item.get('url') }} />
              </View>
              :
              <Text style={styles.commentText}>
                <Text style={styles.commentAuthor}>{userName} </Text>{item.get('text')}
              </Text>
            }

            <Text style={styles.itemTimestamp}>{ago}</Text>
          </View>
        </View>
    </View>
  );
};



class CommentList extends Component {
  renderLoader() {
    return <ActivityIndicator size="large" color={theme.accent} />;
  }

  render() {
    const {
      postItem,
      comments,
      postComment,
      editComment,
      editCommentText,
      loadingComments,
      loadingCommentPost
    } = this.props;

    return (
      <View style={styles.commentList}>
        <View style={styles.commentView}>
          <View style={styles.commentScroll}>
            {loadingComments
              ? this.renderLoader()
              :
              <ScrollView
                keyboardShouldPersistTaps={'handled'}
                ref={ref => this.commentScrollView = ref}
                onContentSizeChange={(contentWidth, contentHeight) => {
                  // this.commentScrollView.scrollToEnd({ animated: false });
                }}
              >
                <CommentPost item={postItem} />
                {comments.map((comment, index) => <Comment key={index} item={comment} />)}
              </ScrollView>
            }
          </View>

          <View style={styles.commentForm}>

            <CommentForm
              postComment={postComment}
              editComment={editComment}
              text={editCommentText}
              postCommentCallback={this.scrollBottom}
              loadingCommentPost={loadingCommentPost}
            />
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({

  // # <CommentList />
  commentList: {
    flex: 1,
    backgroundColor: theme.transparent,
  },
  commentView: {
    paddingBottom: 28,
    // height: height,
    // justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: theme.transparent,
    flex: 1,
  },
  commentScroll: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: theme.transparent,
    // minHeight: height - 135,
    paddingBottom: IOS ? 0 : 20,
  },
  commentForm: {
    height: 52,
    position: 'absolute',
    zIndex: 99,
    left: 0,
    right: 0,
    bottom: IOS ? 0 : 0,
  },


  // # <Comment />
comment:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: IOS ? 25 : 20,
    paddingLeft: 15,
    paddingBottom: 0,
    paddingTop: 12,
  },
  commentContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  commentAvatarCol: {
    paddingRight: 10,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: theme.secondary,
    backgroundColor: 'rgba(254,253,183,.7)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  commentAvatarImage: {
    width: 30,
    height: 30,
    borderRadius: 18
  },
  commentAvatarIcon: {
    top: 10,
    left: 0,
    textAlign: 'center',
    width: 42,
    height: 42,
    borderRadius: 21,
    color: theme.white,
    fontSize: 22,
    lineHeight: 50,
    backgroundColor: theme.transparent
  },
  commentText: {
    textAlign: 'left',
    color: theme.white,
    fontSize: 14,
    lineHeight: 20,
  },
  commentListItemImg: {
    width: width,
    height: width,
    backgroundColor: 'transparent',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  commentTextContent:{
    flex: 1,
    paddingTop: 2,
  },
  commentAuthor: {
    marginRight: 10,
    color: theme.accent,
  },
  itemTimestamp: {
    marginTop: 7,
    color: theme.pink,
    fontSize: 12,
  },
});

export default CommentList;
