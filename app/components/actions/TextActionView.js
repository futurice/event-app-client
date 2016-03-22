'use strict';

import React, {
  View,
  Text,
  TextInput,
  Platform,
  Image,
  PropTypes,
  Dimensions,
  Animated,
  Easing,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/common/Button';
import theme from '../../style/theme';
import Modal from 'react-native-modalbox';

import * as CompetitionActions from '../../actions/competition';
const Icon = require('react-native-vector-icons/Ionicons');

const {width} = Dimensions.get('window');
const TextActionView = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    isTextActionViewOpen: PropTypes.bool.isRequired
  },
  getInitialState() {
    return {
      text: '',
      formAnimation: new Animated.Value(1),
      okAnimation: new Animated.Value(0)
    }
  },
  showOK() {
    Animated.spring(this.state.okAnimation, {toValue:1, duration:250}).start();
    Animated.timing(this.state.formAnimation, {toValue:0, duration:100}).start();
  },
  hideOK(){
    this.state.formAnimation.setValue(1);
    this.state.okAnimation.setValue(0);
  },
  onChangeText(text) {
    this.setState({text: text});
  },
  onCancel() {
    this.setState({text: ''});
    this.props.dispatch(CompetitionActions.closeTextActionView());
  },
  onSendText() {

    if(!this.state.text.length){
      this.onCancel();
      return;
    }

    this.showOK()
    setTimeout( () => {
      this.props.dispatch(CompetitionActions.postText(this.state.text));
      this.setState({text: ''});
      this.props.dispatch(CompetitionActions.closeTextActionView());

      // reset values for the next time
      setTimeout( () => {
        this.hideOK();
      },100);

    }, 600);

  },
  render() {
    const AnimatedIcon = Animated.createAnimatedComponent(Icon);
    return (
      <Modal
        isOpen={this.props.isTextActionViewOpen}
        swipeToClose={false}
        backdropPressToClose={false}>
        <View style={[styles.container, styles.modalBackgroundStyle]}>


          <Animated.View style={[styles.okWrap,
            {opacity: this.state.okAnimation, transform:[{scale:this.state.okAnimation}]}
          ]}>
            <Icon name="android-done" style={styles.okSign} />
          </Animated.View>

          <Animated.View style={[styles.innerContainer, {opacity:this.state.formAnimation}]}>

            <View style={styles.title}><Text style={styles.titleText}>
              Hi, how's your Whappu going?</Text>
            </View>
            <TextInput
              autoFocus={true}
              underlineColorAndroid={theme.light}
              clearButtonMode={'while-editing'}
              returnKeyType={'send'}
              onSubmitEditing={this.onSendText}
              style={[styles.inputField, styles['inputField_' + Platform.OS]]}
              onChangeText={this.onChangeText}
              value={this.state.text} />

            <View style={styles.bottomButtons}>
              <Button
                onPress={this.onCancel}
                style={styles.cancelButton}>
                Cancel
              </Button>

              <Button
                onPress={this.onSendText}
                style={styles.modalButton}
                isDisabled={!this.state.text}>
                Send!
              </Button>
            </View>

             <View style={styles.bottomInfo}>
              <Text style={styles.bottomInfoText}>
                Each message gives points to your Kilta and boosts the Wappu spirit!
              </Text>
             </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
});

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
  },
  innerContainer: {
    padding:10,
  },
  title:{
    padding: 10,
    backgroundColor:'transparent'
  },
  titleText:{
    fontSize: 22,
    color: theme.accent,
    fontWeight: 'bold',
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
  },
  bottomButtons:{
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    alignItems: 'stretch',
  },
  modalButton: {
    flex: 1,
    marginLeft: 5,
  },
  cancelButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#999',
  },
  modalBackgroundStyle: {
    backgroundColor: theme.secondary
  },
  inputField: {
    height: 50,
    fontSize: 18,
    margin: 10,
    color:'#FFF',
  },
  inputField_android: {
  },
  inputField_ios: {
    padding:10,
    backgroundColor: 'rgba(250,250,250,0.5)',
  },
  bottomInfo:{
    marginTop: 50,
    padding: 10,
    backgroundColor: 'transparent'
  },
  bottomInfoText:{
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    fontSize: 11,
    color: theme.light
  },
  okWrap:{
    top: 60,
    left: width / 2 - 77,
    position: 'absolute',
    borderWidth:5,
    borderColor: theme.light,
    paddingTop: 32,
    borderRadius: 75,
    width: 150,
    height: 150,
    opacity: 0,
    transform: [{scale: 0}]
  },
  okSign:{
    fontSize:75,
    color:theme.light,
    backgroundColor:'transparent',
    textAlign:'center'
  }
});

const select = store => {
  return {
    isTextActionViewOpen: store.competition.get('isTextActionViewOpen')
  };
};

export default connect(select)(TextActionView);
