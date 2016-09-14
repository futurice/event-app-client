'use strict';

import React, {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  Animated,
  Easing,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';

import * as RegistrationActions from '../../actions/registration';

import theme from '../../style/theme';
import Button from '../../components/common/Button';
import Loading from '../../components/common/RadioLoader';

const Icon = require('react-native-vector-icons/Ionicons');
const MDIcon = require('react-native-vector-icons/MaterialIcons');
const {height, width} = Dimensions.get('window');
const IOS = Platform.OS === 'ios';
import ICONS from '../../constants/Icons';


const INVITE_CODE_LENGTH = 4
const headerImg = require('../../../assets/planssi/pullo.png');

const IntroView = React.createClass({

  getInitialState() {
    return {
      heroPosition: new Animated.Value(0),
      buttonPosition: new Animated.Value(0),
      bubblePosition: new Animated.Value(0),
      welcome: new Animated.Value(0),
      inviteCodeText: ''
    }
  },

  componentDidMount() {

    setTimeout(() => {
      this.animateHero();
      this.animateBubbles();
    }, 200);

  },

  onRegister(inviteCode) {
    this.props.dispatch(RegistrationActions.loginUser(inviteCode));
  },
  onWelcomeDismiss() {
    this.props.dispatch(RegistrationActions.closeWelcome());
  },

  updateTextInput(inviteCodeText) {

    if (inviteCodeText.length >= INVITE_CODE_LENGTH) {
      this.onRegister(inviteCodeText.substr(0, INVITE_CODE_LENGTH).toLowerCase());
    } else {
      this.setState({inviteCodeText})
    }
  },

  animateHero() {
    Animated.timing(
      this.state.heroPosition,
      { toValue: 1, duration: 300, delay: 500 }
      ).start();

    Animated.timing(
      this.state.buttonPosition,
      { toValue: 1, delay: 1200, duration: 350, easing: Easing.elastic(1) }
      ).start();

  },

  animateBubbles() {
    Animated.timing(
      this.state.bubblePosition,
      {
        toValue: 1,
        duration: 1750,
        easing: Easing.linear()
      }
    ).start(() => {
      Animated.timing(
        this.state.bubblePosition,
        {
          toValue: 0,
          duration: 0,
        }
      ).start(() => {
          this.animateBubbles(); // repeating
        });
    });
  },


  renderWelcomeScreen(userName) {

    Animated.timing(this.state.welcome,
      { toValue: 1, duration: 600, delay: 400, easing: Easing.inOut(Easing.ease) }
    ).start();

    return (
      <View style={[styles.container, styles.viewBackgroundStyle]}>
        <View style={[styles.container, styles.contentContainer, styles.welcomeContainer]}>
          <Animated.Image source={ICONS.HEART} style={[
            styles.welcomeIcon,
            { zIndex: 9, transform: [{ scale: this.state.welcome.interpolate({ inputRange: [0, 1], outputRange: [100, 1] })}]}
          ]} />
          <Animated.View style={{ alignItems: 'center', opacity: this.state.welcome }}>
            <Text style={styles.welcomeTitle}>Hello {userName || 'Friend'}!</Text>
            <Text style={styles.welcomeText}>Let's have great Futubileet in October 7th!</Text>
            <View style={styles.welcomeButtonWrap}>
              <Button onPress={this.onWelcomeDismiss} style={styles.welcomeButton} >Get started</Button>
            </View>
          </Animated.View>
        </View>
      </View>
      );

  },

  render() {
    const {
      bubblePosition,
      buttonPosition,
      heroPosition
    } = this.state;

    const {
      inviteCodeSending,
      loginFailed,
      isWelcomeScreenOpen,
      loggedUserName
    } = this.props;

    if (isWelcomeScreenOpen) {
      return this.renderWelcomeScreen(loggedUserName);
    }


    const bubbleVerticalPositions = [
      bubblePosition.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [50, 25, 10, -10, -20] }),
      bubblePosition.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [60, 55, 40, 25, 10] }),
      bubblePosition.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [60, 60, 50, 40, 25] })
    ]

    const bubbleHorizontalPositions = [
      bubblePosition.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [15, 11, 15, 12, 13] }),
      bubblePosition.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [5, 8, 5, 7, 6] }),
      bubblePosition.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [15, 11, 15, 12, 13] })
    ]

    const bubbleOpacity = [
      bubblePosition.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [0.8, 1, 0.4, 0.1, 0] }),
      bubblePosition.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [0, 0.5, 1, 0.6, 0] }),
      bubblePosition.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [0, 0, 1, 0.8, 0] })
    ];
    const bottlePosition = buttonPosition.interpolate({ inputRange: [0,1], outputRange: [230, 0] });

    return (
      <View style={[styles.container, styles.viewBackgroundStyle]}>
          <ScrollView style={{flex:1, width: null, height: null}}>
            <View style={[styles.container, styles.contentContainer]}>

              <Animated.View style={[
                {
                  justifyContent: 'center',
                  flex: 1, alignItems: 'center', marginTop: IOS ? 50 : 30,
                  width: width / 1.5, height: width / 1.5, borderRadius: width / 1.5,
                  backgroundColor: theme.secondaryBlur,
                  flexDirection: 'row',
                  overflow: 'hidden'
                 },
                { transform: [{ scale: heroPosition }] }
              ]}>
                <Animated.View style={{ overflow: 'hidden', width: width / 1.5, height: width / 1.5, flex: 1, justifyContent: 'center', flexDirection: 'row', transform: [{ translateY: bottlePosition }]}} >
                  <Animated.View style={{ elevation: 2, flex: 1, top: -20, left: width / 3 - 25, position:'absolute', height:60, width: 50, opacity: buttonPosition}} >
                    <Animated.View style={{ width: 10, height: 10, borderRadius: 5, position:'absolute',  transform: [{ translateX: bubbleHorizontalPositions[0] }, { translateY: bubbleVerticalPositions[0] }], opacity: bubbleOpacity[0], borderWidth: 1, borderTopWidth:2, borderRightWidth:3, borderColor:'rgba(255,255,255,1)'}} />
                    <Animated.View style={{ width: 12, height: 12, borderRadius: 6, position:'absolute', transform: [{ translateX: bubbleHorizontalPositions[1] }, { translateY: bubbleVerticalPositions[1] }], opacity: bubbleOpacity[1], borderWidth: 2, borderTopWidth:3, borderRightWidth:4, borderColor:'rgba(255,255,255,1)'}} />
                    <Animated.View style={{ width: 14, height: 14, borderRadius: 7, position:'absolute', transform: [{ translateX: bubbleHorizontalPositions[2] }, { translateY: bubbleVerticalPositions[2] }], opacity: bubbleOpacity[2], borderWidth: 3, borderTopWidth:4, borderRightWidth:5, borderColor:'rgba(255,255,255,1)'}} />
                  </Animated.View>
                  <Image
                    source={headerImg}
                    style={{ width: width / 1.8, height: width / 1.8, top: 30,
                      shadowColor: '#000000',
                      shadowOpacity: 0.075,
                      shadowRadius: 0,
                      shadowOffset: {
                        height: 3,
                        width: -5
                      }}}
                  />
                </Animated.View>
              </Animated.View>

            {inviteCodeSending ?
              <View style={styles.loading}><Loading color={theme.white} /></View> :
              <Animated.View style={[styles.bottomButtons, { transform: [{ scale: this.state.buttonPosition }] }]}>
                <TextInput
                  autoCorrect={false}
                  autoCapitalize={'characters'}
                  returnKeyType={'done'}
                  style={[styles.inputField, styles['inputField_' + Platform.OS]]}
                  autoFocus={false}
                  underlineColorAndroid={theme.white}
                  placeholderTextColor={IOS ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255, 0.7)'}
                  placeholder="Your invite code"
                  onChangeText={this.updateTextInput}
                 />
              </Animated.View>
            }


              {loginFailed ?
              <Text style={[styles.rowTitle, { color: theme.primary } ]}>
                The code you entered is incorrect.
              </Text> :
              <Text style={styles.rowTitle}>
                Login with your personal invite code
              </Text>
              }


              <View style={styles.rowTextContainer}>
                  <Text style={styles.rowText}>
                    Futubileet16, October 7th 2016, 18:00-01:30
                  </Text>

                  <Text style={styles.rowText}>
                    Heureka, Kuninkaalantie 7, Vantaa
                  </Text>
              </View>

            </View>
          </ScrollView>


      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  },
  welcomeContainer: {
    justifyContent: 'center',
    backgroundColor: theme.white,
    padding: 30
  },
  welcomeIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
    tintColor: theme.secondaryLight,
    elevation: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.075,
    shadowRadius: 0,
    shadowOffset: {
      height: 3,
      width: 5
    }
  },
  welcomeTitle: {
    fontSize: 27,
    color: theme.secondaryLight,
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  welcomeText: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  welcomeButtonWrap: {
    marginTop: 40,
    height: 50
  },
  welcomeButton: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  loading: {
    marginTop: 25
  },
  viewBackgroundStyle: {
    backgroundColor: theme.secondaryLight
  },
  innerContainer: {
    flex: 1,
    paddingTop: IOS ? 15 : 15,
  },
  header: {
    fontWeight: 'bold',
    color: theme.secondary,
    marginTop: 40,
    marginBottom: 20,
    marginLeft: IOS ? 25 : 15,
    fontSize: 28
  },
  rowNumberContainer: {
    paddingLeft: 10,
    paddingTop:6,
    borderWidth:2,
    borderColor:theme.secondary,
    borderRadius:25,
    width:50,
    height:50,
    paddingRight: 10,
    top: 2
  },
  rowNumberText: {
    fontSize: 28,
    color: theme.secondary,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold'
  },
  rowIconContainer: {
    width: 50,
    height:50,
    backgroundColor:theme.secondary,
    borderRadius:25,
    marginRight:5,
    marginLeft:10,
    justifyContent:'center'
  },
  rowIcon: {
    textAlign:'center',
    color: theme.white,
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 24
  },
  rowTextContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  rowTitle:{
    color: 'rgba(0,0,0,0.4)',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    fontWeight: '700',
    fontSize: 15,
    marginTop: 15,
    marginBottom: 65
  },
  rowText: {
    //color: 'rgba(255,255,255,.9)',
    color: 'rgba(0,0,0,0.4)',
    fontSize: 12,
    marginTop: 2,
    fontWeight: 'normal',
  },
  rowSecondaryText: {
    marginTop: 0
  },
  bottomButtons:{
    marginTop: 30,
    position:'relative',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  modalButton: {
    flex:1,
    width: 50,
    height: 50,
    marginLeft:IOS ? -5 : 8,
    borderWidth: IOS ? 0 : 2,
    borderColor: IOS ? null : theme.white,
    borderRadius: IOS ? 0 : 30,
    borderBottomRightRadius: IOS ? 5 : null,
    borderTopRightRadius: IOS ? 5 : null,
    backgroundColor: IOS ? theme.green : theme.green,
    elevation: 1
  },
  inputField: {
    width: 200,
    height: 50,
    fontSize:22,
    marginBottom: 5,
    textAlign: 'center'
  },
  inputField_android: {
    color: theme.white
  },
  inputField_ios: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(255,255,255,.9)',
    borderRadius: 5,
  },
});

const select = store => {
  return {
    inviteCodeSending: store.registration.get('isLoading'),
    isIntroViewOpen: store.registration.get('isIntroViewOpen'),
    isWelcomeScreenOpen: store.registration.get('isWelcomeScreenOpen'),
    loginFailed: store.registration.get('loginFailed'),
    loggedUserName: store.registration.get('loggedUserName')
  };
};

export default connect(select)(IntroView);
