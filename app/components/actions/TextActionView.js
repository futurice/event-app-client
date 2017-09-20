import React, { Component } from 'react';

import {
  View,
  TextInput,
  Platform,
  Dimensions,
  Animated,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Modal
} from 'react-native';
import { connect } from 'react-redux';

import Text from '../Text';
import Button from '../../components/common/Button';
import theme from '../../style/theme';
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as keyboard from '../../utils/keyboard';

import {
  postText,
  closeTextActionView
} from '../../actions/competition';

const IOS = Platform.OS === 'ios';

const { width, height } = Dimensions.get('window');

class TextActionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      formAnimation: new Animated.Value(1),
      okAnimation: new Animated.Value(0)
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSendText = this.onSendText.bind(this);
    this.hideOK = this.hideOK.bind(this);
    this.showOK = this.showOK.bind(this);
  }

  componentWillReceiveProps({ isTextActionViewOpen }) {
    // when opening again
    if (isTextActionViewOpen && !this.props.isTextActionViewOpen){
      this.hideOK();
      this.setState({text: ''});
    }
  }

  showOK() {
    Animated.spring(this.state.okAnimation, { toValue: 1, duration: 250 }).start();
    Animated.timing(this.state.formAnimation, { toValue: 0, duration: 100 }).start();
  }

  hideOK() {
    this.state.formAnimation.setValue(1);
    this.state.okAnimation.setValue(0);
  }

  onChangeText(text) {
    this.setState({text: text});
  }

  onClose() {
    this.setState({text: ''});
    this.props.closeTextActionView();
  }

  onSendText() {

    if (!this.state.text.length) {
      this.onClose();
      return;
    }

    this.showOK();
    this.props.postText(this.state.text);

    setTimeout(() => {
      this.setState({ text: '' });
      this.props.closeTextActionView();

      // reset values for the next time
      setTimeout(() => {
        this.hideOK();
      }, 100);

    }, 600);
  }

  render() {

    const { isTextActionViewOpen } = this.props;

    if (!isTextActionViewOpen) {
      return false;
    }

    return (
      <Modal
        onRequestClose={this.onClose}
        visible={isTextActionViewOpen}
        animationType={'slide'}
      >
        <View style={[styles.container, styles.modalBackgroundStyle]}>

          <Animated.View style={[styles.okView, { opacity: this.state.okAnimation }]}>
            <Animated.View style={[styles.okWrap,
              { opacity: this.state.okAnimation, transform:[{ scale: this.state.okAnimation }] }
            ]}>
              <Icon name='done' style={styles.okSign} />
            </Animated.View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.okText}>Let's publish your message...</Text>
            </View>
          </Animated.View>


          <Animated.View style={[styles.innerContainer, {opacity:this.state.formAnimation}]}>
            <ScrollView ref={view => this.containerScrollViewRef = view} style={{ flex: 1 }}>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={view => this.textActionInputRef = view}
                  onFocus={() => {
                    keyboard.onInputFocus(this.containerScrollViewRef, this.textActionInputRef,300);
                  }}
                  onBlur={() => {
                    keyboard.onInputBlur(this.containerScrollViewRef)
                  }}
                  autoFocus={true}
                  multiline={true}
                  autoCapitalize={'sentences'}
                  underlineColorAndroid={'transparent'}
                  clearButtonMode={'while-editing'}
                  returnKeyType={'send'}
                  blurOnSubmit={true}
                  onSubmitEditing={this.onSendText}
                  style={styles.inputField}
                  onChangeText={this.onChangeText}
                  numberOfLines={3}
                  maxLength={151}
                  placeholderTextColor={'rgba(255,255,255, 0.65)'}
                  placeholder=" Say something..."
                  autoCorrect={false}
                  value={this.state.text} />
                <View style={styles.bottomButtons}>
                  <Button
                    onPress={this.onClose}
                    style={styles.cancelButton}>
                    Cancel
                  </Button>

                  <Button
                    onPress={this.onSendText}
                    style={styles.modalButton}
                    textStyle={{ color: theme.white }}
                    isDisabled={!this.state.text}>
                    Post
                  </Button>
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  },
  innerContainer: {
    padding: IOS ? 10 : 0,
    paddingBottom: 10,
    flex:1,
    justifyContent: 'center',
  },
  inputContainer: {
    minHeight: height / 2,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    flex: 1,
  },
  title:{
    padding: 10,
    paddingBottom: 100,
    paddingTop: 0,
    backgroundColor:'transparent',
    flexDirection: 'row',
    justifyContent: IOS ? 'center' : 'center',
  },
  titleText:{
    fontSize: 20,
    color: theme.primary,
    fontWeight: 'normal',
    textAlign: IOS ? 'center' : 'left',
  },
  titleIcon:{
    top:5,
    fontSize:20,
    marginRight:5,
    color:theme.primary,
  },
  bottomButtons:{
    flexDirection: 'row',
    alignItems: IOS ? 'stretch' : 'flex-end',
    justifyContent: IOS ? 'center' : 'flex-end',
    position: 'absolute',
    bottom: IOS ? 0 : 10,
    right: 0,
    left: 0,
    padding: 20,
    paddingBottom: 0,
    paddingLeft: IOS ? 0 : 20,
    paddingRight: IOS ? 0 : 20,
    borderTopWidth: IOS ? 0 : 1,
    borderTopColor:'rgba(0,0,0,.1)',
  },
  modalButton: {
    flex: 1,
    marginLeft: 6,
    backgroundColor: theme.primary
  },
  cancelButton: {
    flex: 1,
    marginRight: 6,
    backgroundColor: '#aaa',
  },
  modalBackgroundStyle: {
    backgroundColor: theme.secondary
  },
  inputField: {
    fontFamily: 'Futurice',
    fontSize: 18,
    margin: 0,
    marginLeft: 20,
    marginTop: IOS ? 110 : 0,
    color:'#FFF',
    textAlign: 'center',
    height: 220,
    width: width - 40,
  },
  bottomInfo:{
    padding: 15,
    paddingBottom:10,
    paddingTop:5,
    backgroundColor: 'transparent'
  },
  bottomInfoText:{
    textAlign: IOS ? 'center' : 'left',
    fontSize: 12,
    color: 'rgba(255,255,255,.7)'
  },
  okView: {
    position: 'absolute',
    top: IOS ? height / 2 - 170 : 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  okWrap:{
    position: 'relative',
    overflow: 'visible',
    paddingTop: 32,
    width: 140,
    height: 140,
    opacity: 0,
    transform: [{ scale: 0 }]
  },
  okSign:{
    fontSize: 105,
    color: theme.light,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  okText:{
    color: theme.light,
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 15
  }
});


const mapDispatchToProps = {
  closeTextActionView,
  postText
};


const select = store => ({
  isTextActionViewOpen: store.competition.get('isTextActionViewOpen')
})

export default connect(select, mapDispatchToProps)(TextActionView);
