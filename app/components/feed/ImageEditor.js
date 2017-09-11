'use strict';

import React, { Component } from 'react';
import {
  Modal,
  View,
  Image,
  StyleSheet,
  Platform,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  BackAndroid,
  KeyboardAvoidingView,
  PanResponder
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../../style/theme';
import Toolbar from '../common/Toolbar';

const { width, height } = Dimensions.get('window');
const IOS = Platform.OS === 'ios';

const inputHeight = 40;

class ImageEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showTextInput: false,
      textInputValue: '',
      imagePos: 0,
      editing: false,
    };

    this.moveTextInput = this.moveTextInput.bind(this);
    this.centerImageText = this.centerImageText.bind(this);
    this.showTextInput = this.showTextInput.bind(this);
    this.sendImage = this.sendImage.bind(this);
    this.getImagePosition = this.getImagePosition.bind(this);
    this.clearTextInput = this.clearTextInput.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.renderGuideLayer = this.renderGuideLayer.bind(this);
    this.renderTextInput = this.renderTextInput.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.renderSubmitButtonForAndroid = this.renderSubmitButtonForAndroid.bind(this);
    this.onImageEditCancel = this.onImageEditCancel.bind(this);
  }

  _panResponder = {};

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true, // Math.abs(gestureState.dx) > 5,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.moveTextInput(gestureState.y0);
      },
      onPanResponderMove: (e, gestureState) => {
        this.moveTextInput(gestureState.moveY);
      },
    });
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.state.editing) {
        this.setState({ editing: false });
        return true;
      }
      return false;
    })
  }

  componentWillReceiveProps({ image }) {
    if (image && !this.props.image) {
      // new image arrived
      this.centerImageText({image});
      this.setState({ showTextInput: false });
    } else if (!image && this.props.image) {
      // image removed and editorview hidden
    }
  }

  moveTextInput(touchPosition) {
    const { image } = this.props;
    const { editing } = this.state;

    // Disable dragging while editing
    if (editing) {
      return false;
    }

    const imagePosY = this.state.imagePos.pageY;
    const scaledImageHeight = image ? width * (image.height / image.width) : 0;

    const calculatedNewPos = touchPosition - imagePosY - 20;
    const newPos = Math.min(
          scaledImageHeight - inputHeight, // upper limit
          Math.max(0, calculatedNewPos)
          )

    this.setState({ textPosition: newPos });
  }

  centerImageText(props) {
    const { image } = props || this.props;
    const scaledImageHeight = image ? width * (image.height / image.width) : 0;
    const centerTextPos = scaledImageHeight / 2 - inputHeight / 2;
    this.setState({ textPosition: centerTextPos });
  }

  showTextInput() {
    this.setState({ showTextInput: true, editing: true });
  }

  sendImage() {
    const { onImagePost, image } = this.props;
    const { textInputValue, textPosition } = this.state;
    const scaledImageHeight = image ? width * (image.height / image.width) : 0;

    // If caption is on bottom
    const onBottom = scaledImageHeight - (textPosition + inputHeight) === 0;

    const imageTextPosition = onBottom ? 1 : textPosition / scaledImageHeight;

    onImagePost(image.data, textInputValue, imageTextPosition);

    // TODO Success/Loading indicator
    this.clearTextInput();
  }

  getImagePosition(){
    const view = this.refs.editImgRef;
    if (!view) {
      return;
    }

    view.measure((x, y, w, h, pageX, pageY) => {
      this.setState({
        imagePos: { x, y, w, h, pageY }
      });
    });
  }

  clearTextInput() {
    this.onChangeText('');
  }

  onChangeText(textInputValue) {
    this.setState({ textInputValue });
  }

  renderGuideLayer(imgHeight) {
    const visibleHeight = Math.min(imgHeight, height - 100);
    return (
      <TouchableOpacity style={[styles.tapGuide, { top: visibleHeight / 2 - 25 }]} onPress={this.showTextInput} >
        <Text style={styles.tapGuideText}>ADD CAPTION</Text>
      </TouchableOpacity>
    );
  }

  renderTextInput(imgHeight) {
    const { editing, textPosition } = this.state;
    return (

      <View
        {...this._panResponder.panHandlers}
        style={{
          top: editing ? 0 : textPosition,
          position: 'absolute',
          left: 0,
          right: 0,
          zIndex: 12,
          backgroundColor: theme.captionLayer,
          width,
          height: inputHeight
      }}>
        <KeyboardAvoidingView
          behavior={'height'}
          keyboardVerticalOffset={0}
          style={{flex: 1}}
        >
        <View style={{
          height: inputHeight,
          width,
          flex: 1,
          backgroundColor: theme.transparent
        }}>
        {!editing
        ?
        <TouchableOpacity onPress={() => this.setState({ editing: true })} activeOpacity={1} style={styles.inputFieldWrap}>
          <Text style={styles.inputFieldText}>{this.state.textInputValue}</Text>
        </TouchableOpacity>
        :
        <TextInput
          ref={'imageCaptionInput'}
          autoFocus={true}
          multiline={false}
          underlineColorAndroid={'transparent'}
          clearButtonMode={'never'}
          returnKeyType={'done'}
          blurOnSubmit={true}
          onSubmitEditing={() => this.setState({ editing: false })}
          onEndEditing={() => this.setState({ editing: false })}
          onFocus={() => this.setState({ editing: true })}
          onBlur={() => this.setState({ editing: false })}
          // onSubmitEditing={this.sendImage}
          style={styles.inputField}
          onChangeText={this.onChangeText}
          numberOfLines={1}
          maxLength={36}
          placeholderTextColor={theme.secondary}
          placeholder={''}
          value={this.state.textInputValue}
        />
        }

      </View>
      </KeyboardAvoidingView>
      </View>
      )
  }

  renderEditButton(imgHeight) {
    const { textPosition } = this.state;

    return (
      <View
        style={{
          top: textPosition,
          position: 'absolute',
          left: 0,
          zIndex: 12,
          backgroundColor: theme.transparent,
          width: inputHeight,
          height: inputHeight
      }}>
        <TouchableOpacity
          onPress={() => this.setState({ editing: true })}
          activeOpacity={1}
          style={{ flex: 1 }}
        >
          <Text style={[styles.inputFieldText, styles.editButton]}>
            <Icon name="create" size={24}/>
          </Text>
        </TouchableOpacity>
      </View>
      )
  }

  renderSubmitButtonForAndroid() {
    return (
      <View style={styles.buttonWrap}>
        <TouchableHighlight underlayColor={theme.primaryDark} onPress={this.sendImage} style={styles.button}>
          <Text style={styles.buttonText}>
            <Icon size={38} name="done" />
          </Text>
        </TouchableHighlight>
      </View>
    )
  }

  onImageEditCancel() {
    const { onCancel } = this.props;

    onCancel();
    this.clearTextInput();
  }


  render() {

    const { image } = this.props;
    const { showTextInput, editing } = this.state;

    const scaledImageHeight = image ? width * (image.height / image.width) : 0;
    const scaledImageHeightStyle = { height: scaledImageHeight };

    return (
      <Modal
        visible={!!image}
        animationType={'fade'}
        onRequestClose={this.onImageEditCancel}
      >
      {image &&
      <View style={{ flex: 1 }}>
        <Toolbar
          leftIcon={'close'}
          rightText={'Post'}
          rightIcon={'done'}
          rightIconClick={this.sendImage}
          leftIconClick={this.onImageEditCancel}
          title='Photo'
        />
        <View style={styles.container}>
          <View style={[styles.imageWrap, scaledImageHeightStyle]}>
            <View
              style={[styles.imageWrap, scaledImageHeightStyle]}
              onLayout={this.getImagePosition}
            >
              <Image
                ref="editImgRef"
                style={[
                  styles.image,
                  scaledImageHeightStyle
                ]}
                resizeMode={'contain'}
                source={{ uri: image.data }}
              />
            </View>
            {showTextInput && this.renderTextInput(scaledImageHeight)}
          </View>
          {!showTextInput && this.renderGuideLayer(scaledImageHeight)}
          {showTextInput && !editing && this.renderEditButton(scaledImageHeight)}
        </View>
        {!IOS && !editing && this.renderSubmitButtonForAndroid()}
      </View>
      }
      </Modal>
    );
  }
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.stable,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  imageWrap: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: theme.stable,
    width,
  },
  image: {
    backgroundColor: theme.stable,
    width,
  },
  tapGuide: {
    position: 'absolute',
    width: 150,
    height: 50,
    top: 0,
    left: width / 2 - 75,
    backgroundColor: theme.captionLayer,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: 3,
  },
  tapGuideText: {
    color: theme.white,
    opacity: 0.9,
  },
  inputFieldWrap: {
    height: inputHeight,
    margin: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    top: IOS ? 0 : -1,
    left: 0,
    width,
    zIndex: 9,
    backgroundColor: theme.transparent,
  },
  inputFieldText: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.transparent,
    fontSize: 17,
    color: theme.white,
    textAlign: 'center',
    lineHeight: IOS ? inputHeight - 2 : null,
  },
  inputField: {
    position: 'absolute',
    top: IOS ? 0 : 1.5,
    left: 0,
    fontSize: 17,
    color: theme.white,
    textAlign: 'center',
    height: inputHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    zIndex: 9,
  },
  editButton: {
    color: 'rgba(255,255,255,.6)',
    paddingTop: IOS ? 8 : 7,
    paddingLeft: 6,
    lineHeight: null,
    fontSize: 26,
  },
  buttonWrap: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 70,
    width: 70,
    zIndex: 9,
  },
  button: {
    backgroundColor: theme.primary,
    height: 66,
    width: 66,
    borderRadius: 33,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    backgroundColor: 'transparent',
    fontSize: 25,
    fontWeight: 'bold',
    color: theme.white
  },
});


export default ImageEditor;
