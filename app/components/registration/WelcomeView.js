
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Easing
} from 'react-native';

import { connect } from 'react-redux';
import { closeWelcome, getUser, postProfilePicture } from '../../actions/registration';

import theme from '../../style/theme';
import Button from '../common/Button';
import Text from '../Text';
import ICONS from '../../constants/Icons';

import ImagePickerManager from 'react-native-image-picker';
import ImageCaptureOptions from '../../constants/ImageCaptureOptions';
import { SCREEN_SMALL } from '../../utils/responsive';
import Background from '../background';

const { width } = Dimensions.get('window');



const WelcomeView = React.createClass({

  getInitialState() {
    return {
      welcome: new Animated.Value(0),
      welcomeText: new Animated.Value(0),
    }
  },

  onWelcomeDismiss() {
    this.props.closeWelcome();
  },

  onTakeProfilePicture() {
    ImagePickerManager.showImagePicker(ImageCaptureOptions, (response) => {
      if (!response.didCancel && !response.error) {
        const image = 'data:image/jpeg;base64,' + response.data;
        console.log(image);
        this.props.postProfilePicture(image);
      }
    });
  },

  componentDidMount() {
    Animated.timing(this.state.welcome,
      { toValue: 1, duration: 400, delay: 200, easing: Easing.elastic(1) }
    ).start();

    Animated.timing(this.state.welcomeText,
      { toValue: 1, duration: 300, delay: 1300, easing: Easing.ease }
    ).start();

    this.props.getUser();
  },

  render() {

      const { loggedUserName, userName, picture } = this.props;
      const name = loggedUserName || userName || 'Friend';
      const firstName = name.split(' ')[0];

      return (
      <View style={[styles.container, styles.viewBackgroundStyle]}>
        <Background color="purple" />
        <ScrollView style={styles.scroll}>
          <View style={[styles.container, styles.contentContainer]}>
          <Animated.Image source={ICONS.BALLOONS} style={[
            styles.welcomeIcon,
            {
              opacity: this.state.welcome,
              transform: [{ translateY: this.state.welcome.interpolate({ inputRange: [0, 1], outputRange: [20, 0] })}]
            }
          ]} />
        {/*
          <Image source={{ uri: picture }} style={[
            styles.selfie
          ]} />
        */}
          <Animated.View style={{ alignItems: 'center', opacity: this.state.welcomeText }}>
            <Text style={styles.welcomeTitle}>Hello {firstName}!</Text>
            <Text style={styles.welcomeTitle}>Welcome to Futufinlandia!</Text>
            <View style={styles.welcomeButtonWrap}>
              <TouchableOpacity onPress={this.onWelcomeDismiss}>
                <Text style={styles.getStartedButton}>Get started</Text>
              </TouchableOpacity>
              {/*<Button onPress={this.onTakeProfilePicture} style={styles.welcomeButton}>Take a selfie</Button>*/}
            </View>
          </Animated.View>
          </View>
        </ScrollView>
      </View>
      );

  }
});

const iconSize = width / 1.5;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    backgroundColor: theme.purpleLayer,
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    zIndex: 2,
    justifyContent: 'center',
    padding: 30,
  },
  welcomeIcon: {
    width: iconSize,
    height: iconSize,
    marginBottom: 25,
    marginTop: 35,
  },
  selfie: {
    width: iconSize,
    height: iconSize,
    marginBottom: 20,
    borderRadius: iconSize / 2,
  },
  welcomeTitle: {
    fontSize: SCREEN_SMALL ? 20 : 24,
    color: theme.white,
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  welcomeText: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: SCREEN_SMALL ? 13 : 15,
    lineHeight: 20,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  welcomeButtonWrap: {
    marginTop: 40,
    height: 50
  },
  getStartedButton: {
    textDecorationLine: 'underline',
    color: theme.white,
    fontSize: SCREEN_SMALL ? 30 : 36,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  welcomeButton: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  viewBackgroundStyle: {
    backgroundColor: theme.secondaryLight
  },
});


const select = store => {
  return {
    picture: store.registration.get('picture'),
    userName: store.registration.get('name'),
    loggedUserName: store.registration.get('loggedUserName')
  };
};

const mapDispatchToProps = {
  postProfilePicture,
  closeWelcome,
  getUser,
}

export default connect(select, mapDispatchToProps)(WelcomeView);
