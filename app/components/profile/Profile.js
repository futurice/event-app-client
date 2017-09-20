

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
import PlatformTouchable from '../common/PlatformTouchable';
import WebViewer from '../webview/WebViewer';
import Loader from '../common/Loader';
import ICONS from '../../constants/Icons';

import ImagePickerManager from 'react-native-image-picker';
import ImageCaptureOptions from '../../constants/ImageCaptureOptions';


const { width } = Dimensions.get('window');

const IOS = Platform.OS === 'ios';

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
    paddingBottom: IOS ? 18 : 20,
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
  },
  listItemButton:{ },
  listItemSeparator: {
    marginBottom: 15,
    elevation: 0,
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
    // color: theme.white,
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
    backgroundColor: theme.white,
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
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 18,
    // paddingHorizontal: 5,
    // paddingVertical: 2,
  },
  listItemText: {
    color: theme.white,
    fontSize: 18,
    lineHeight: 20,
    top: IOS ? 3 : 0,
  },
  nametag: {
    padding: 2,
  },
  listItemText__highlight: {
    backgroundColor: theme.secondary,
  },
  listItemText__downgrade: {
    color: theme.stable,
  },
  listItemText__team: {
    backgroundColor: theme.pink,
  },
  listItemText__code: {
    backgroundColor: theme.white,
  },
  nameText__code: {
    color: theme.pink,
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
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,.5)',
    zIndex: 5,
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

  componentWillReceiveProps({ links, name, email, picture }) {
    const listData = [{ title: name, icon:'photo-camera', link:'', picture, email }].concat(links.toJS());

    this.setState({ dataSource: this.state.dataSource.cloneWithRows(listData) });
  },


  openRegistration() {
    return;
  },

  onTakeProfilePicture() {
    const profilePicCaptureOptions = Object.assign(_.cloneDeep(ImageCaptureOptions), { cameraType: 'front' });
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

  renderLinkItem(item, key) {
    const linkItemStyles = [styles.listItemButton];
    if (item.separatorAfter || item.last) {
      linkItemStyles.push(styles.listItemSeparator)
    }

    return (
      <PlatformTouchable
        key={key}
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

  renderModalItem(item, key) {
    const { loadingProfilePicture, teams, selectedTeam, code } = this.props;
    const currentTeam = _.find(teams.toJS(), ['id', selectedTeam]) || { name: '' };

    const avatar = item.picture;

    return (
      <View key={key} style={[styles.listItemButton, { marginBottom: 15 }]}>
        <View style={[styles.listItem, styles.listItem__hero]}>

          {!!avatar &&
            <PlatformTouchable
              onPress={this.onTakeProfilePicture}
            >
              <View style={{ position: 'absolute', elevation: 3, zIndex: 5, top: 30, right: 20, flex:1, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: theme.secondary, backgroundColor: theme.white, borderRadius: 19, width: 38, height: 38, }}>
                <Icon style={{ color: theme.pink, backgroundColor: theme.transparent }} size={18} name="camera-alt" />
              </View>
            </PlatformTouchable>
          }

          <View style={styles.listItemHeroIcon}>
            {!!loadingProfilePicture && <View style={styles.loader}><Loader /></View>}
            {!loadingProfilePicture &&
              <PlatformTouchable onPress={this.onTakeProfilePicture}>
              <View style={styles.listItemHeroAvatarButton}>
              {!!avatar
                ? <Image style={styles.profilePic} source={{ uri: avatar }} />
                : <Icon style={[styles.listItemIcon, styles.listItemIcon__hero]} name={item.icon} />
              }
              </View>
            </PlatformTouchable>
            }
          </View>
          <View style={{ flexDirection:'column', flex:1, alignItems:'center' }}>

            <View style={[styles.nametag, styles.listItemText__highlight]}>
              <Text style={styles.nameText}>
                {item.title || 'Unnamed Guest'}
              </Text>
            </View>
            <View style={[styles.nametag, styles.listItemText__team]}>
              <Text style={styles.nameText}>
                {currentTeam.name}
              </Text>
            </View>

            {!!code &&
            <View style={[styles.nametag, styles.listItemText__code]}>
              <Text style={[styles.nameText, styles.nameText__code]}>
                GIF Disco code <Text style={{ fontWeight: 'bold' }}>{code.toUpperCase()}</Text>
              </Text>
            </View>
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
      // return this.renderLogo();
    }
    return this.renderModalItem(item, key);
  },

  render() {
    return (
      <View style={styles.container}>
        <ListView style={styles.scrollView}
          dataSource={this.state.dataSource}
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
