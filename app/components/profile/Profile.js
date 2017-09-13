

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  TouchableHighlight,
  Image,
  Linking,
  Platform,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Text from '../Text';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../style/theme';
import * as ProfileActions from '../../actions/profile';
import { postProfilePicture } from '../../actions/registration';
import { getGravatarForEmail } from '../../utils/gravatar';
import PlatformTouchable from '../common/PlatformTouchable';
import WebViewer from '../webview/WebViewer';
import Loader from '../common/Loader';
import ICONS from '../../constants/Icons';

import ImagePickerManager from 'react-native-image-picker';
import ImageCaptureOptions from '../../constants/ImageCaptureOptions';


const { width, height } = Dimensions.get('window');

const IOS = Platform.OS === 'ios';
const CODE_WIDTH = 210;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.transparent,
  },
  scrollView:{
    flex: 1,
  },
  listItem: {
    padding:20,
    paddingBottom: 18,
    margin: 0,
    flexDirection: 'row',
    backgroundColor: theme.purpleLayer,
  },
  listItem__hero:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 15,
    backgroundColor: theme.transparent,
    elevation: 3,
    overflow: 'hidden'
  },
  listItemButton:{ },
  listItemSeparator: {
    marginBottom: 15,
    elevation: 1,
    borderBottomWidth: 0,
    borderBottomColor: '#fff',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
  listItemCustomIcon: {
    color: theme.white,
    alignItems: 'center',
    width: 24,
    height: 22,
    marginRight: 15,
    padding: 3,
  },
  listItemIcon: {
    fontSize: 22,
    color: theme.white,
    alignItems: 'center',
    width: 35,
  },
  listItemHeroIcon:{
    backgroundColor: '#eee',
    borderColor: theme.secondary,
    borderWidth: 5,
    borderRadius: 60,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -10,
    overflow:'hidden'
  },
  listItemHeroAvatarButton: {
    borderRadius: 60,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicBgLayer:{
    position: 'absolute',
    left: 0,
    right: 0,
    opacity: 0,
    bottom: 0,
    top: 0,
    backgroundColor: theme.secondaryBlur,
  },
  profilePicBg: {
    backgroundColor: theme.primary,
    position: 'absolute',
    opacity: 1,
    width: width + 40,
    height: width * 2.5,
    left: -20,
    top: -20,
    bottom: -20,
    right: -20,
  },
  profilePic: {
    borderColor: theme.white,
    borderWidth: 6,
    width: 110,
    height: 110,
    borderRadius: 55
  },
  listItemIcon__hero:{
    top: 4,
    backgroundColor: theme.transparent,
    width:40,
    fontSize: 40,
    color: '#ccc',
  },
  listItemIconRight:{
    position: 'absolute',
    right: 0,
    color: '#aaa',
    top: 27,
  },
  nameText: {
    color: theme.white,
    fontSize: 16,
    paddingHorizontal: 5,
    paddingTop: 6,
  },
  listItemText: {
    color: theme.white,
    fontSize: 18,
    lineHeight: 20,
    top: 3,
  },
  listItemText__highlight: {
    backgroundColor: theme.secondary,
  },
  listItemText__downgrade: {
    color: theme.stable,
  },
  listItemText__small: {
    backgroundColor: theme.pink,
  },
  listItemText__code: {
    backgroundColor: theme.white,
    // position: 'absolute',
    // left: 20,
    // top: 35,
    color: theme.pink,
    // transform: [{ rotate: '-15deg' }]
  },
  listItemBottomLine:{
    position:'absolute',
    right: 20,
    left: 20,
    bottom:0,
    height:1,
    backgroundColor:'#f4f4f4'
  },
  futuLogoWrap: {
    padding: 20,
    marginBottom: 50,
    paddingTop: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  futuLogoTextWrap: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  futuLogo: {
    width:75,
    height:15,
    tintColor: theme.white
  },
  futuLogoHeart: {
    marginRight: 10,
    marginLeft: 8,
    height: 16,
    width: 16,
    tintColor: theme.accent,
  },
  futuLogoText: {
    color: theme.white,
    top: IOS ? 1 : 2,
    fontSize: 18
  },
  bubbleTip: {
    position: 'absolute',
    top: IOS ? 30 : 24,
    left: IOS ? 6 : 16,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: IOS ? 8 : 8,
    borderRightWidth: IOS ? 19 : 15,
    borderBottomWidth: IOS ? 8 : 12,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: theme.white,
    borderLeftColor: 'transparent',
    borderBottomColor: IOS ? 'transparent' : theme.white,
    transform: [{ rotate: IOS ? '30deg' : '45deg' }],
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.075,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: -1
    }
  },
  bubbleTip__own: {
    left: null,
    top: IOS ? 54 : 30,
    right: IOS ? 6 : 14,

    borderRightWidth: 0,
    borderTopWidth: IOS ? 8 : 0,
    borderBottomWidth: IOS ? 8 : 15,
    borderLeftWidth: IOS ? 15 : 15,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: IOS ? theme.white : 'transparent',
    borderBottomColor: IOS ? 'transparent' : theme.white,
    backgroundColor: IOS ? 'transparent' : theme.white,
    transform: [{ rotate: IOS ? '-30deg' : '130deg' }],

  },
  bubble: {
    borderRadius: IOS ? 10 : 4,
    backgroundColor: theme.white,
    padding:15,
    paddingTop: 12,
    paddingBottom: 12,
    width: width - 40, //CODE_WIDTH + 30,
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.075,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,.5)',
    zIndex: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

var Profile = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    links: PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    }
  },

  componentDidMount() {
    this.props.dispatch(ProfileActions.fetchLinks());
  },

  openRegistration() {
    return;
    // this.props.dispatch(RegistrationActions.openRegistrationView());
  },

  onTakeProfilePicture() {
    const profilePicCaptureOptions = Object.assign(ImageCaptureOptions, { cameraType: 'front' });
    ImagePickerManager.showImagePicker(profilePicCaptureOptions, (response) => {
      if (!response.didCancel && !response.error) {
        const image = 'data:image/jpeg;base64,' + response.data;
        this.props.postProfilePicture(image);
      }
    });
  },

  onLinkPress(url, text, openInWebview) {
    if (!url) {
      return;
    }
    if (!openInWebview) {
      Linking.openURL(url)
    } else {
      this.props.navigator.push({
        component: WebViewer,
        name: text,
        url: url
      });

    }
  },

  renderComponentItem(item, index) {
    const linkItemStyles = [styles.listItemButton];
    const { navigator } = this.props;
    const { component, title } = item;



    if (item.separatorAfter || item.last) {
      linkItemStyles.push(styles.listItemSeparator)
    }

    return (
      <PlatformTouchable
        key={index}
        underlayColor={theme.secondary}
        activeOpacity={0.9}
        delayPressIn={0}
        style={[styles.listItemButton, item.last ? { marginBottom: 34 } : null]}
        onPress={() => navigator.push({ name: title, component, showName: true })}>
        <View style={linkItemStyles}>
          <View style={styles.listItem}>
            <Image
              source={ICONS[item.icon]}
              resizeMode={'contain'}
              style={styles.listItemCustomIcon} />
            <Text style={[styles.listItemText, item.secondary ? { color: theme.accent } : null]}>{item.title}</Text>
            {!item.separatorAfter && !item.last && <View style={styles.listItemBottomLine} />}
          </View>
        </View>
      </PlatformTouchable>
    );
  },

  renderLinkItem(item) {
    const linkItemStyles = [styles.listItemButton];
    if (item.separatorAfter || item.last) {
      linkItemStyles.push(styles.listItemSeparator)
    }

    return (
      <PlatformTouchable
        underlayColor={theme.secondary}
        activeOpacity={0.9}
        delayPressIn={0}
        style={[styles.listItemButton, item.last ? { marginBottom: 34 } : null]}
        onPress={() => this.onLinkPress(item.link, item.title, item.showInWebview)}>
        <View style={linkItemStyles}>
          <View style={styles.listItem}>
            <Image
              source={ICONS[item.icon]}
              resizeMode={'contain'}
              style={styles.listItemCustomIcon} />
            <Text style={[styles.listItemText, item.secondary ? { color: theme.accent } : null]}>{item.title}</Text>
            {!item.separatorAfter && !item.last && <View style={styles.listItemBottomLine} />}
          </View>
        </View>
      </PlatformTouchable>
    );
  },

  renderModalItem(item) {
    const { loadingProfilePicture, teams, selectedTeam, code } = this.props;
    const currentTeam = _.find(teams.toJS(), ['id', selectedTeam]) || { name: '' };

    const avatar = item.picture || getGravatarForEmail(item.email, item.title, selectedTeam, 300);

    return (
      <View style={[styles.listItemButton, styles.listItemSeparator]}>
        <View style={[styles.listItem, styles.listItem__hero]}>
          <View style={styles.profilePicBgLayer} />

            <PlatformTouchable
              onPress={this.onTakeProfilePicture}
              style={{ position: 'absolute', zIndex: 5, top: 30, right: 20, flex:1, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: theme.secondary, backgroundColor: theme.white, borderRadius: 19, width: 38, height: 38, }}
            >
              <Icon style={{ color: theme.pink, backgroundColor: theme.transparent }} size={18} name="camera-alt" />
            </PlatformTouchable>

          <View style={styles.listItemHeroIcon}>
            {loadingProfilePicture && <View style={styles.loader}><Loader /></View>}
            <PlatformTouchable style={styles.listItemHeroAvatarButton} onPress={this.onTakeProfilePicture}>
            { avatar
              ? <Image style={styles.profilePic} source={{ uri: avatar }} />
              : <Icon style={[styles.listItemIcon, styles.listItemIcon__hero]} name={item.icon} />
            }
            </PlatformTouchable>
          </View>
          <View style={{flexDirection:'column',flex:1, alignItems:'center'}}>
            {
              item.title ?
              <Text style={[styles.nameText, styles.listItemText__highlight]}>
                {item.title}
              </Text> :
              <Text style={[styles.nameText, styles.listItemText__downgrade]}>
                Unnamed Futubileet Participant
              </Text>
            }
            <Text style={[styles.nameText, styles.listItemText__small]}>
              {currentTeam.name}
            </Text>

            {!!code &&
            <Text style={[styles.nameText, styles.listItemText__code]}>
              GIF Disco code <Text style={{ fontWeight: 'bold' }}>{code.toUpperCase()}</Text>
            </Text>
            }
          </View>
        </View>
      </View>
    );
  },

  renderLogo() {
    return (
      <View style={styles.futuLogoWrap}>
        <TouchableHighlight underlayColor={'transparent'} onPress={() => Linking.openURL('http://www.futurice.com?utm_source=futubileet&utm_medium=banner&utm_campaign=futubileet17app')}>
          <View style={styles.futuLogoTextWrap}>
            <Image
              resizeMode={'contain'}
              source={require('../../../assets/futurice.png')}
              style={styles.futuLogo} />
            <Image
              source={ICONS.HEART}
              style={styles.futuLogoHeart} />
            <Text style={styles.futuLogoText}>Futubileet17</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  },

  renderItem(item) {
    const key = item.id || item.title;

    if (item.component) {
      return this.renderComponentItem(item, key);
    } else if (item.link) {
      return this.renderLinkItem(item, key);
    } else if (item.logo) {
      return null;
      return this.renderLogo();
    }
    return this.renderModalItem(item, key);
  },

  render() {
    console.log(this.props);
    const { links, name, email, picture } = this.props;

    const listData = [{
      title: name,
      icon:'photo-camera',
      link:'',
      picture,
      email
      },
      ].concat(
        links.toJS(),
        [{logo: true}]
      );

    return (
      <View style={styles.container}>
        <ListView style={styles.scrollView}
          dataSource={this.state.dataSource.cloneWithRows(listData)}
          renderRow={this.renderItem}
        />
      </View>
      );

  }
});

const select = store => {
  return {
      selectedTeam: store.registration.get('selectedTeam'),
      teams: store.team.get('teams'),
      code: store.registration.get('code'),
      name: store.registration.get('name'),
      picture: store.registration.get('picture'),
      email: store.registration.get('email'),
      loadingProfilePicture: store.registration.get('isLoadingProfilePicture'),
      links: store.profile.get('links'),
    }
};

const mapDispatchToProps = {
  postProfilePicture,
}

export default connect(select, mapDispatchToProps)(Profile);
