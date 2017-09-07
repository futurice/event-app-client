
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { fromJS } from 'immutable';
import moment from 'moment';

import Text from '../Text';
import theme from '../../style/theme';
import time from '../../utils/time';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ICONS from '../../constants/Icons';
import CommentForm from './CommentForm';

const { width, height } = Dimensions.get('window');
const IOS = Platform.OS === 'ios';

const Comment = ({ item }) => {
  const ago = time.getTimeAgo(item.get('createdAt'));
  const profilePicture = item.get('profilePicture');

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
  const profilePicture = item.getIn(['author', 'profilePicture']);
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
              <View style={{ marginTop: -5 }}>
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
  constructor(props) {
    super(props);

    this.scrollBottom = this.scrollBottom.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  scrollBottom(animated = false) {
    if (this.commentScrollView){
     this.commentScrollView.scrollToEnd({ animated });
    }
  }

  postComment(comment) {
    this.props.postComment(comment);
    this.scrollBottom(true);
  }

  renderLoader() {
    return <ActivityIndicator size="large" color={theme.blue1} />;
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
                  this.commentScrollView.scrollToEnd({ animated: false });
                }}
              >
                <CommentPost item={postItem} />
                {comments.map((comment, index) => <Comment key={index} item={comment} />)}
              </ScrollView>
            }
          </View>

          <View style={styles.commentForm}>

            <CommentForm
              postComment={this.postComment}
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
    backgroundColor: theme.white,
  },
  commentView: {
    paddingBottom: 28,
    // height: height,
    // justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: theme.white,
    flex: 1,
  },
  commentScroll: {
    // flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: theme.white,
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
    paddingBottom: 15,
    paddingTop: 15,
  },
  commentContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  commentAvatarCol: {
    paddingRight: IOS ? 25 : 20,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.earth1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentAvatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18
  },
  commentAvatarIcon: {
    top: 0,
    left: 0,
    textAlign: 'center',
    width: 36,
    height: 36,
    borderWidth: 2,
    borderColor: theme.earth1,
    borderRadius: 18,
    color: theme.white,
    fontSize: 36,
    lineHeight: 44,
    backgroundColor: theme.transparent
  },
  commentText: {
    textAlign: 'left',
    color: theme.dark
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
  },
  commentAuthor: {
    marginRight: 5,
    color: theme.blue2,
    fontWeight: 'bold',
  },
  itemTimestamp: {
    marginTop: 7,
    color: '#aaa',
    fontSize: 12,
  },
});

export default CommentList;
