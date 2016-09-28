'use strict';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  Animated,
  Easing
} from 'react-native';

import * as RegistrationActions from '../../actions/registration';

import theme from '../../style/theme';
import Button from '../../components/common/Button';
import Loading from '../../components/common/RadioLoader';
const Icon = require('react-native-vector-icons/Ionicons');
const MDIcon = require('react-native-vector-icons/MaterialIcons');
const { height, width } = Dimensions.get('window');
const IOS = Platform.OS === 'ios';
import ICONS from '../../constants/Icons';


const WelcomeView = React.createClass({

  getInitialState() {
    return {
      welcome: new Animated.Value(0)
    }
  },

  onWelcomeDismiss() {
    console.log('test');
    this.props.dispatch(RegistrationActions.closeWelcome());
  },

  componentDidMount() {
    this.props.dispatch(RegistrationActions.getUser());


    Animated.timing(this.state.welcome,
      { toValue: 1, duration: 600, delay: 500, easing: Easing.inOut(Easing.ease) }
    ).start();


  },

  render() {

      const { userName } = this.props;

      return (
      <View style={[styles.container, styles.viewBackgroundStyle]}>
        <Animated.View style={[styles.container, styles.contentContainer, styles.welcomeContainer,
            { backgroundColor: this.state.welcome.interpolate({ inputRange: [0, 1], outputRange: [theme.secondaryLight, theme.stable] }) }
          ]}>
          <Animated.Image source={ICONS.HEART} style={[
            styles.welcomeIcon,
            { zIndex: 9, transform: [{ scale: this.state.welcome.interpolate({ inputRange: [0, 1], outputRange: [100, 1] })}]}
          ]} />
          <Animated.View style={{ alignItems: 'center', opacity: this.state.welcome }}>
            <Text style={styles.welcomeTitle}>Hello {userName || 'Friend'}!</Text>
            <Text style={styles.welcomeText}>Let's have a mad Futubileet on October 7th!</Text>
            <View style={styles.welcomeButtonWrap}>
              <Button onPress={this.onWelcomeDismiss} style={styles.welcomeButton} >Get started</Button>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
      );

  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    alignItems: 'center'
  },
  welcomeContainer: {
    justifyContent: 'center',
    padding: 30
  },
  welcomeIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
    tintColor: theme.secondaryLight,
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
  viewBackgroundStyle: {
    backgroundColor: theme.secondaryLight
  },
});

export default WelcomeView;
