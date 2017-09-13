
import React, { Component } from 'react';
import {
  Alert,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  BackAndroid,
  Modal,
  CameraRoll,
} from 'react-native';

import Text from '../Text';
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
import moment from 'moment';
import PhotoView from 'react-native-photo-view';
import ImageZoom from 'react-native-image-zoom';


const IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

class LightBox extends Component {


  state = { loading: false };
  constructor(props) {
    super(props);

    this.state = { saveOK: false };

    this.onClose = this.onClose.bind(this);
    this.saveImage = this.saveImage.bind(this);
    this.flashSaveOkIndicator = this.flashSaveOkIndicator.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.isLightBoxOpen) {
        this.onClose()
        return true;
      }
      return false;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLightBoxOpen) {
      this.setState({loading: true});
    }
  }


  onClose() {
    this.props.closeLightBox();
  }

  onShare(imgUrl) {
    const shareOptions = {
      url: imgUrl,
      message: 'Futufinlandia'
    };
    Share.open(shareOptions);
    // TODO Android CameraRoll cannot access to url directly
    // CameraRoll.saveToCameraRoll(imgUrl)
    // .then(localImagePath => {
    //   console.log(localImagePath);
    //   return;
    //   const shareOptions = {
    //     url: localImagePath,
    //     message: 'Futufinlandia'
    //   };
    //   Share.open(shareOptions);
    // })

  }
  onReport() {
    console.log('test');
  }

  flashSaveOkIndicator(a, b) {
    console.log(a);
    this.setState({ saveOK: true });

    setTimeout(() => {
      if (this.state && this.state.saveOK) {
        this.setState({ saveOK: false });
      }
    }, 2000);
  }

  saveImage(imgUrl) {
    // TODO Android  CameraRollcannot access to url directly
    // https://medium.com/react-native-training/mastering-the-camera-roll-in-react-native-13b3b1963a2d
    // // TODO OK Sign
    CameraRoll.saveToCameraRoll(imgUrl)
    .then(this.flashSaveOkIndicator)
  }

  itemIsCreatedByMe(item) {
    return item.getIn(['author','type'],'') === 'ME';
  }

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
  }

  removeThisItem(item) {
    this.props.removeFeedItem(item.toJS());
    this.onClose();
  }

  render() {

    const {
      isLightBoxOpen,
      lightBoxItem
    } = this.props;
    const { saveOK } = this.state;

    const itemImage = lightBoxItem.get('url');
    const itemAuthor = lightBoxItem.getIn(['author', 'name']);
    const isSystemUser = lightBoxItem.getIn(['author', 'type'], '') === 'SYSTEM';
    const created = moment(lightBoxItem.get('createdAt', ''));
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
              onLoad={() => {
                this.setState({ loading: false });
              }}
              source={{ uri: itemImage }}
              resizeMode={'contain'}
              style={{ width, height: width, flex: 1 }}
            />
            {this.state.loading &&
            <View style={{position: 'absolute', left: width / 2 - 25, top: height / 2 - 25, alignItems: 'center', justifyContent: 'center', width: 50, height: 50}}>
              <Loader color={theme.stable} />
            </View>
            }
          </View>
          }
          <View style={styles.header}>
            <View style={styles.header__icon}>
              <PlatformTouchable style={{ padding: 10, paddingHorizontal: 15, }} delayPressIn={0} onPress={this.onClose}>
                <View><Icon style={{ color: theme.white, fontSize: 26 }} name="close" /></View>
              </PlatformTouchable>

              <View style={styles.headerTitle}>
              {itemAuthor &&
                <Text style={styles.headerTitleText}>{!isSystemUser ? itemAuthor : 'Futufinlandia'}</Text>
              }
                <View style={styles.date}>
                  <Text style={styles.dateText}>
                    {created.format('ddd DD.MM.YYYY')} at {created.format('HH:mm')}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.toolbar}>

            <View />

            <View style={{ justifyContent:'flex-end', flexDirection: 'row' }}>
              {!isSystemUser &&
              <PlatformTouchable onPress={() => this.showRemoveDialog(lightBoxItem)}>
                <View style={styles.toolbar__button}>
                  <Icon style={styles.toolbar__icon} name={this.itemIsCreatedByMe(lightBoxItem) ? 'delete' : 'flag'} />
                  <Text style={styles.toolbar__button__text}>{this.itemIsCreatedByMe(lightBoxItem) ? 'Remove' : 'Report'}</Text>
                </View>
              </PlatformTouchable>
              }
              {/*
              <PlatformTouchable onPress={() => this.saveImage(itemImage)}>
                <View style={styles.toolbar__button}>
                  <Icon style={styles.toolbar__icon} name={!saveOK ? 'file-download' : 'check-circle'} />
                  <Text style={styles.toolbar__button__text}>{!saveOK ? 'Save' : 'Done!'}</Text>
                </View>
              </PlatformTouchable>
              */}
              <PlatformTouchable onPress={this.onShare.bind(this, itemImage)}>
                <View style={styles.toolbar__button}>
                  <Icon style={styles.toolbar__icon} name="share" />
                  <Text style={styles.toolbar__button__text}>Share</Text>
                </View>
              </PlatformTouchable>
            </View>

          </View>
        </ModalBackgroundView>
      </Modal>
    );
  }
}

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
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top:0,
    right: 0,
    zIndex: 2,
    backgroundColor: IOS ? 'transparent' : 'rgba(0,0,0,.3)',
  },
  header__icon: {
    position: 'absolute',
    top: IOS ? 15 : 10,
    left: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    marginLeft: 5,
    top: 2,
  },
  headerTitleText: {
    color: theme.white,
    fontWeight: 'normal',
    fontSize: 14
  },
  date: {
    paddingTop: IOS ? 0 : 0
  },
  dateText: {
    color: theme.white,
    opacity: 0.9,
    fontSize: 12
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    paddingRight: IOS ? 20 : 10,
    paddingLeft: IOS ? 20 : 15,
    paddingBottom: IOS ? 35 : 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 58,
    zIndex: 3,
    backgroundColor: IOS ? 'transparent' : 'rgba(0,0,0,.3)',
  },
  toolbar__button: {
    borderRadius: 25,
    width: 50,
    height: 50,
    marginTop: 5,
    marginLeft: 15,
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
