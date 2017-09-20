
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { isEmpty } from 'lodash';

import Text from '../Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../style/theme';

const dismissKeyboard = require('dismissKeyboard');
const { width } = Dimensions.get('window');;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.onChangeText = this.onChangeText.bind(this);
    this.onSendText = this.onSendText.bind(this);
    this.renderSubmit = this.renderSubmit.bind(this);
  }

  onChangeText(text) {
    this.props.editComment(text);
  }

  onSendText() {
    const {
      postComment,
      text,
      loadingCommentPost
    } = this.props;

    if (!text || isEmpty(text.trim()) || loadingCommentPost) {
      return;
    }

    postComment(text)
    .then(() => {
    dismissKeyboard();
    })
  }

  renderPostLoader() {
    return <ActivityIndicator style={styles.sendButton} size={'small'} color={theme.secondary} />;
  }

  renderSubmit() {
    const { loadingCommentPost } = this.props;
    return (
      loadingCommentPost
        ? this.renderPostLoader()
        :
        <View style={styles.sendButton}>
          <TouchableOpacity onPress={this.onSendText} underlayColor={theme.white} style={{ width: 52, height: 52,  alignItems: 'center', justifyContent: 'center' }} >
            <Text>
              <Icon name="send" style={styles.sendButtonIcon} />
            </Text>
          </TouchableOpacity>
        </View>
    )
  }

  render() {
    const { text, loadingCommentPost } = this.props;

    return (
      <View style={styles.itemWrapper}>
        <KeyboardAvoidingView
          behavior={'height'}
          keyboardVerticalOffset={0}
          style={styles.inputContainer}
        >
          <TextInput
            autoFocus={false}
            autoCorrect={false}
            autoCapitalize={'sentences'}
            underlineColorAndroid={'transparent'}
            clearButtonMode={'while-editing'}
            returnKeyType={'send'}
            style={styles.inputField}
            blurOnSubmit={false}
            maxLength={131}
            placeholderTextColor={'rgba(0,0,0, 0.4)'}
            placeholder="Add comment..."
            onSubmitEditing={this.onSendText}
            onChangeText={this.onChangeText}
            value={text}
          />

          {loadingCommentPost && this.renderPostLoader()}
        </KeyboardAvoidingView>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  itemWrapper: {
    width,
    height: 52,
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
  },
  inputContainer: {
    elevation: 1,
    borderTopWidth: 0,
    backgroundColor: theme.white,
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    width,
  },
  inputField: {
    backgroundColor: theme.white,
    color: theme.dark,
    height: 52,
    fontSize: 14,
    position: 'relative',
    borderRadius: 0,
    padding: 10,
    left: 15,
    width: width - 60,
    fontFamily: 'Futurice-Regular',
  },
  sendButton: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    height: 52,
    width: 52,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white
  },
  sendButtonIcon: {
    backgroundColor: theme.transparent,
    color: theme.blue2,
    fontSize: 25,
  }
});

export default CommentForm;
