'use strict';

import React, {
  Animated,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  BackAndroid
} from 'react-native';
import { connect } from 'react-redux';
import theme from '../../style/theme';
import Modal from 'react-native-modalbox';
import { closeLightBox } from '../../actions/feed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlatformTouchable from '../common/PlatformTouchable';
import Share from 'react-native-share';

const IOS = Platform.OS === 'ios';
const { width } = Dimensions.get('window');

const imageAnimateDuration = IOS ? 200 : 500;

const LightBox = React.createClass({

  getInitialState(){

    return {
      imageScale: new Animated.Value(0.35)
    };
  },

  componentWillReceiveProps(nextProps) {
    const lightBoxToggled = nextProps.isLightBoxOpen !== this.props.isLightBoxOpen;
    if (lightBoxToggled) {
      this.animateImage(nextProps.isLightBoxOpen);
    }
  },

  animateImage(show) {
    Animated.timing(
      this.state.imageScale,
      { duration: show ? imageAnimateDuration : 0, toValue: show ? 1 : 0.25 }
    ).start();

  },

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.isLightBoxOpen) {
        this.onClose()
        return true;
      }
      return false;
    });
  },

  onClose() {
    this.props.dispatch(closeLightBox());
  },

  onShare() {

    const {
      lightBoxImage
    } = this.props;

    const shareOptions = {
      url: lightBoxImage,
      message: 'Futubileet16'
    };

    Share.open(shareOptions);
  },

  render() {

    const {
      isLightBoxOpen,
      lightBoxImage
    } = this.props;

    return (
      <Modal
        animationDuration={0}
        isOpen={isLightBoxOpen}
        swipeToClose={true}
        backdropPressToClose={false}
        onClosed={this.onClose}
        >
        <View style={styles.container}>
          <View style={styles.header}>
            <PlatformTouchable delayPressIn={0} onPress={this.onClose}>
              <View style={styles.header__icon}>
                <Icon style={{ color: theme.white, fontSize: 26 }} name="close" />
              </View>
            </PlatformTouchable>
          </View>
          <Animated.Image
            style={[
              styles.image,
              {
                opacity: this.state.imageScale,
                transform: [{ scale: this.state.imageScale }]
              }
            ]}
            resizeMode={'contain'}
            source={{uri: lightBoxImage}}
          />

          <View style={styles.toolbar}>
            <PlatformTouchable onPress={this.onClose}>
              <View style={styles.toolbar__button}>
                <Icon style={styles.toolbar__icon} name="flag" />
                <Text style={styles.toolbar__button__text}>Report</Text>
              </View>
            </PlatformTouchable>

            <PlatformTouchable onPress={this.onShare}>
              <View style={styles.toolbar__button}>
                <Icon style={styles.toolbar__icon} name="share" />
                <Text style={styles.toolbar__button__text}>Share</Text>
              </View>
            </PlatformTouchable>

          </View>
        </View>
      </Modal>
    );
  }
});

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.primary,
    justifyContent: 'center'
  },
  header: {
    flex: 1,
    height: 52,
    justifyContent: 'flex-start'
  },
  header__icon: {
    position: 'absolute',
    top: IOS ? 25 : 15,
    left: 15,
  },
  toolbar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20
  },
  toolbar__button: {
    borderRadius: 25,
    width: 50,
    height: 50,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary
  },
  toolbar__icon: {
    backgroundColor: 'transparent',
    fontSize: 24,
    color: theme.white,
  },
  toolbar__button__text: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 10,
    color: theme.grey
  },
  image: {
    width,
    height: width
  }
});

const select = store => {
  return {
    lightBoxImage: store.feed.get('lightBoxImage'),
    isLightBoxOpen: store.feed.get('isLightBoxOpen'),
  };
};

const mapDispatch = dispatch => ({
  closeLightBox: () => dispatch(closeLightBox())
});

export default connect(select)(LightBox);
