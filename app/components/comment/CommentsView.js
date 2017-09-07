import React, { PropTypes, Component } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
  StyleSheet,
  Modal
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {
  isCommentsViewOpen,
  isLoadingComments,
  isLoadingCommentPost,
  getCommentItem,
  getComments,
  getCommentEditText,
  editComment,
  postComment,
  closeComments
} from '../../concepts/comments';

import Text from '../Text';
import theme from '../../style/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommentPost from './CommentPost';
import CommentList from './CommentList';
import Background from '../background';
import Toolbar from '../common/Toolbar';

const IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

class CommentsView extends Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.closeComments();
  }

  render() {

    const {
      isCommentsViewOpen,
      commentItem,
      comments,
      postComment,
      editComment,
      editCommentText,
      loadingComments,
      loadingCommentPost
    } = this.props;

    if (!isCommentsViewOpen) {
      return false;
    }

    return (
      <Modal
        onRequestClose={this.onClose}
        visible={isCommentsViewOpen}
        animationType={'slide'}
      >
        <Background color="purple" />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={this.onClose} style={styles.closeLink}>
              <Icon style={styles.closeLinkIcon} name="close" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Comment</Text>
          </View>
          <CommentList
            postItem={commentItem}
            comments={comments}
            postComment={postComment}
            editComment={editComment}
            editCommentText={editCommentText}
            loadingComments={loadingComments}
            loadingCommentPost={loadingCommentPost}
          />
        </View>
      </Modal>
    );
  }
}

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
    backgroundColor: theme.purpleLayer,
    // paddingTop: 0,
    // paddingBottom: 0,
    // justifyContent: 'flex-start',
  },
  header: {
    height: 56,
    backgroundColor: theme.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingTop: 28,
    zIndex: 2,
  },
  headerTitle: {
    color: theme.white,
    paddingTop: 10,
  },
  closeLink: {
    position: 'absolute',
    left: 0,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeLinkIcon: {
    top: 5,
    fontSize: 20,
    color: theme.white
  }
});

const mapDispatchToProps = {
  editComment,
  postComment,
  closeComments
};

const select = createStructuredSelector({
  isCommentsViewOpen,
  commentItem: getCommentItem,
  comments: getComments,
  editCommentText: getCommentEditText,
  loadingComments: isLoadingComments,
  loadingCommentPost: isLoadingCommentPost
})

export default connect(select, mapDispatchToProps)(CommentsView);
