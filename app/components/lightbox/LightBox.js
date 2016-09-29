'use strict';
import React from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  BackAndroid,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import theme from '../../style/theme';
// import Modal from 'react-native-modalbox';
import { removeFeedItem, closeLightBox } from '../../actions/feed';
import abuse from '../../services/abuse';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlatformTouchable from '../common/PlatformTouchable';
import ModalBackgroundView from '../common/ModalBackgroundView';
import Loader from '../common/Loader';
import Share from 'react-native-share';
import PhotoView from 'react-native-photo-view';
import ImageZoom from 'react-native-image-zoom';


const IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

const LightBox = React.createClass({

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.isLightBoxOpen) {
        this.onClose()
        return true;
      }
      return false;
    });
  },

  // getInitialState() {
  //   return {
  //     loading: true
  //   }
  // },

  // componentWillReceiveProps(nextProps) {
  //   if (!nextProps.isLightBoxOpen) {
  //     this.setState({loading: true});
  //   }
  // },

  // onReady() {
  //   this.setState({loading: false});
  // },

  onClose() {
    this.props.closeLightBox();
  },

  onShare(imgUrl) {
    const shareOptions = {
      url: imgUrl,
      message: 'Futubileet16'
    };

    Share.open(shareOptions);
  },
  onReport() {
    console.log('test');
  },


  itemIsCreatedByMe(item) {
    return item.getIn(['author','type'],'') === 'ME';
  },

  showRemoveDialog(item) {
    if (this.itemIsCreatedByMe(item)) {
      Alert.alert(
        'Remove Content',
        'Do you want to remove this item?',
        [
          { text: 'Cancel',
            onPress: () => { }, style: 'cancel' },
          { text: 'Yes, remove item',
            onPress: () => { this.removeThisItem(item); }, style: 'destructive' }
        ]
      );
    } else {
      Alert.alert(
        'Flag Content',
        'Do you want to report this item?',
        [
          { text: 'Cancel',
            onPress: () =>  {  console.log('Cancel Pressed'); }, style: 'cancel' },
          { text: 'Yes, report item',
            onPress: () =>  {  abuse.reportFeedItem(item.toJS()); }, style: 'destructive' }
        ]
      );
    }
  },

  removeThisItem(item) {
    this.props.removeFeedItem(item.toJS());
    this.onClose();
  },

  render() {

    const {
      isLightBoxOpen,
      lightBoxItem
    } = this.props;

    const itemImage = lightBoxItem.get('url');
    const itemAuthor = lightBoxItem.getIn(['author', 'name']);
    const isSystemUser = lightBoxItem.getIn(['author', 'type'], '') === 'SYSTEM';

    return (
      <Modal
        visible={isLightBoxOpen}
        onRequestClose={this.onClose}
        style={styles.modal}
        transparent={true}
        animationType={IOS ? 'none' : 'slide'}
        >
        <ModalBackgroundView blurType="dark" style={styles.container}>
          {
          IOS ?
          <View style={{ width, height }}>
            <PhotoView
              source={{uri: itemImage}}
              minimumZoomScale={1}
              maximumZoomScale={4}
              resizeMode={'contain'}
              style={{ width, height: width}} />
          </View>
          :
          <View style={{ justifyContent: 'center', width, height }}>
            <ImageZoom
              source={{
                uri: itemImage,
                headers: {
                  "Referer" : 'http://...'
                }
              }}
              resizeMode={'contain'}
              style={{ width, height: width, flex: 1 }}
            />
          </View>
          }
          <View style={styles.header}>
                <View style={styles.header__icon}>
                <PlatformTouchable delayPressIn={0} onPress={this.onClose}>
                  <View><Icon style={{ color: theme.white, fontSize: 26 }} name="close" /></View>
                </PlatformTouchable>
                {itemAuthor && !isSystemUser &&
                  <Text style={styles.header__title}>Image from {itemAuthor}</Text>}
              </View>
          </View>

          <View style={styles.toolbar}>
            {!isSystemUser &&
            <PlatformTouchable onPress={() => this.showRemoveDialog(lightBoxItem)}>
              <View style={styles.toolbar__button}>
                <Icon style={styles.toolbar__icon} name={this.itemIsCreatedByMe(lightBoxItem) ? 'delete' : 'flag'} />
                <Text style={styles.toolbar__button__text}>{this.itemIsCreatedByMe(lightBoxItem) ? 'Remove' : 'Report'}</Text>
              </View>
            </PlatformTouchable>
            }
            <PlatformTouchable onPress={() => this.onShare(itemImage)}>
              <View style={styles.toolbar__button}>
                <Icon style={styles.toolbar__icon} name="share" />
                <Text style={styles.toolbar__button__text}>Share</Text>
              </View>
            </PlatformTouchable>

          </View>
        </ModalBackgroundView>
      </Modal>
    );
  }
});

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: IOS ? 'transparent' : theme.black,
  },
  header: {
    height: 56,
    marginTop: IOS ? 8 : 0,
    justifyContent: 'flex-start',
    position: 'absolute',
    left: 0,
    top:0,
    right: 0,
    zIndex: 2,
    backgroundColor: IOS ? 'transparent' : 'rgba(0,0,0,.3)',
  },
  header__icon: {
    position: 'absolute',
    top: IOS ? 25 : 15,
    left: 15,
    right: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  header__title: {
    color: theme.white,
    marginLeft: 20,
    fontSize: 16
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 0,
    paddingRight: 20,
    paddingBottom: IOS ? 35 : 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 3,
    backgroundColor: IOS ? 'transparent' : 'rgba(0,0,0,.3)',
  },
  toolbar__button: {
    borderRadius: 25,
    width: 50,
    height: 50,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
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
    marginTop: 2,
    color: theme.stable
  }
});

const select = store => {
  return {
    lightBoxItem: store.feed.get('lightBoxItem'),
    isLightBoxOpen: store.feed.get('isLightBoxOpen')
  };
};

const mapDispatch = { removeFeedItem, closeLightBox };

export default connect(select, mapDispatch)(LightBox);
