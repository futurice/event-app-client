'use strict';

import React from 'react';

import  {
  View,
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
import WelcomeView from './WelcomeView';
import Background from '../background';
import Text from '../Text';

const Icon = require('react-native-vector-icons/Ionicons');
const MDIcon = require('react-native-vector-icons/MaterialIcons');
const { height, width } = Dimensions.get('window');
const IOS = Platform.OS === 'ios';
import ICONS from '../../constants/Icons';


const INVITE_CODE_LENGTH = 4;
const headerImg = require('../../../assets/planssi/pullo.png');

const IntroView = React.createClass({

  getInitialState() {
    return {
      heroPosition: new Animated.Value(0),
      buttonPosition: new Animated.Value(0),
      bubblePosition: new Animated.Value(0),
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
        duration: 2500,
        easing: Easing.linear
      }
    ).start(() => {
      Animated.timing(
        this.state.bubblePosition,
        {
          toValue: 0,
          duration: 2500,
          easing: Easing.linear
        }
      ).start(() => {
          this.animateBubbles(); // repeating
        });
    });
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
      return <WelcomeView userName={loggedUserName} dispatch={this.props.dispatch} />;
    }

    return (
      <View style={[styles.container, styles.viewBackgroundStyle]}>
        <Background color="purple" />
          <ScrollView style={{ width: null, height, backgroundColor: theme.purpleLayer }}>
            <View style={[styles.container, styles.contentContainer]}>
            {/*
              <Animated.View style={[styles.introHero, { transform: IOS ? [{ scale: heroPosition }] : []  }]}>
                <Animated.View style={{ overflow: 'hidden', width: width / 1.5, height: width / 1.5, justifyContent: 'center', flexDirection: 'row', transform: IOS ? [{ translateY: bottlePosition }] : [] }} >
                  <Animated.View style={{ elevation: 2, top: -20, left: width / 3 - 25, position:'absolute', height:60, width: 50, opacity: buttonPosition}} >
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
            */}
            <View>
              <Text style={styles.h2}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../../assets/futurice-logo.png')}
                  style={styles.futuLogo} /> presents
              </Text>
              <Text style={styles.h1}>Futu</Text>
              <View style={{ top: -10 }}>
                <Text style={[styles.h1, styles.yellow]}>Finlandia<Text style={styles.pink}>_</Text></Text>
              </View>
              <Text style={styles.h3}>
                {'22.08.17 \nFinlandia Hall \nHelsinki'}
              </Text>
            </View>

            <View style={styles.bgImageWrap}>
              <Animated.Image
                resizeMode={'contain'}
                source={require('../../../assets/intro/fireworks.gif')}
                style={[styles.bgImage]} />
            </View>

            {inviteCodeSending ?
              <View style={styles.loading}><Loading color={theme.white} /></View> :
              <View style={styles.bottomButtons}>
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
              </View>
            }

              {loginFailed ?
              <Text style={[styles.rowTitle, { color: theme.primary } ]}>
                The code you entered is incorrect.
              </Text> :
              <Text style={styles.rowTitle}>
                Login with your personal invite code
              </Text>
              }

              {/*
              <View style={styles.rowTextContainer}>
                  <Text style={styles.rowText}>
                    Futubileet16, October 7th 2016, 18:00-01:30
                  </Text>

                  <Text style={styles.rowText}>
                    Heureka, Kuninkaalantie 7, Vantaa
                  </Text>
              </View>
              */}

            </View>
          </ScrollView>


      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
  },
  contentContainer: {
    //alignItems: 'center'
    padding: 30,
    paddingTop: 50,
    minHeight: height,
  },
  loading: {
    marginTop: 25
  },
  viewBackgroundStyle: {
    backgroundColor: theme.secondaryLight
  },
  innerContainer: {
    paddingTop: IOS ? 15 : 15,
  },
  header: {
    color: theme.secondary,
    marginTop: 40,
    marginBottom: 20,
    marginLeft: IOS ? 25 : 15,
    fontSize: 28
  },
  h1: {
    fontSize: 46,
    color: theme.white,
    marginBottom: 0,
  },
  yellow: {
    color: theme.accent,
  },
  pink: {
    color: theme.pink
  },
  h2: {
    fontSize: 18,
    color: theme.white,
    marginBottom: 30,
  },
  h3: {
    fontSize: 18,
    color: theme.white,
    marginBottom: 20,
  },
  futuLogo: {
    width: 80,
    height: 18,
    top: -4,
    marginTop: -4,
    tintColor: theme.white
  },
  bgImageWrap: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    height: height / 0.8,
  },
  bgImage: {
    height: height / 0.8,
  },
  balloonImage: {
    height: height / 1.75,
  },
  introHero: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: IOS ? 50 : 30,
    width: width / 1.5,
    height: width / 1.5,
    borderRadius: width / 1.5,
    backgroundColor: theme.secondaryBlur,
    flexDirection: 'row',
    overflow: 'hidden'
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
    alignItems: 'center',
    marginTop: 40
  },
  rowTitle:{
    color: theme.accent,
    fontSize: 15,
    marginTop: 15,
    marginBottom: 65,
    textAlign: 'center',
  },
  rowText: {
    //color: 'rgba(255,255,255,.9)',
    color: 'rgba(255,255,255,0.4)',
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
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  modalButton: {
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
