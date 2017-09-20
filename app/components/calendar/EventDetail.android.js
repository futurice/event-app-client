import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Linking,
  Image
} from 'react-native';
import Text from '../Text';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../style/theme';
import Toolbar from './EventDetailToolbar';
import Background from '../background';

import analytics from '../../services/analytics';
import time from '../../utils/time';

import PlatformTouchable from '../common/PlatformTouchable';

const { width } = Dimensions.get('window');
const VIEW_NAME = 'EventDetail';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 0,
    paddingVertical: 0,
    paddingTop: 0,
  },
  eventDetail: {
    zIndex: 10,
    top: 50,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 50,
    backgroundColor: theme.transparent,
  },
  header: {
    paddingTop: 40,
    marginBottom: 10,
    position: 'relative',
  },
  headerTextWrap: {
    position: 'absolute',
    width: width / 1.2,
    left: -3,
    top: 0,
  },
  headerText: {
    fontSize: 46,
    lineHeight:46,
    textAlign: 'left',
    color: theme.accent,
  },
  headerImageWrap: {
    borderWidth: 15,
    borderColor: theme.secondary,
    height: 200,
  },
  headerImage: {
    width: width - 70,
    height: 170,
    zIndex: 1,
  },
  headerImageLayer: {
    backgroundColor: theme.secondary,
    zIndex: 2,
    opacity: 0.4,
    position: 'absolute',
    left: 0, top: 0, bottom: 0, right: 0
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: theme.white,
    paddingVertical: 30,
    paddingBottom: 60,
    marginVertical: 20,
    backgroundColor:theme.transparent,
    flex: 1,
  },
  detailEventInfoContainer: {
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'center',
    padding:20,
    paddingTop:15,
    paddingBottom:15,
    backgroundColor:'#fff'
  },
  detailEventInfoWrapper: {
    flex:1,
    flexDirection:'row',
    alignItems:'flex-end',
  },
  detailEventInfoIcon: {
    fontSize:25,
    color:theme.secondary,
    marginTop:1,
    paddingRight:23,
    marginLeft:7,
    alignSelf:'center'
  },
  detailEventInfoAttending: {
    fontSize:14,
    color:theme.darkgrey,
    alignSelf: 'center'
  },
  detailEventInfoTime: {
    color: '#000',
    fontSize: 15,
    alignSelf: 'center'
  },
  detailEventName: {
    backgroundColor: theme.light,
    textAlign: 'left',
    color: theme.primary,
    fontWeight: 'normal',
    fontSize: 25,
  },
  detailEventDescription: {
    color: theme.white,
    fontWeight: 'normal',
    backgroundColor: 'transparent',
    fontSize: 16,
    lineHeight:24,
    marginTop: 0,
  },

  navigationButtonWrapper: {
    margin: -20,
    marginTop: 0,
    marginBottom:0,
    backgroundColor: theme.light
  },
  navigationButton: {
    height: 50,
    backgroundColor: '#E9E9E9',
    borderColor: '#C7C7C7',
    borderWidth: 2
  },
  navigationButtonText: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 35,
    fontWeight: 'normal',
    color: '#8A8A8A',
    margin: 0,
    padding: 0,
  },
  navigationButtonIcon: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    top: 10,
  },
  gridListItemMetaWrap:{
    paddingBottom: 0,
    borderBottomWidth: 0,
    borderBottomColor:'#eee',
  },
  gridListItemMeta: {
    backgroundColor: 'transparent',
    borderBottomWidth:0,
    borderBottomColor:'#eee',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  gridListItemIcon:{
    color: theme.secondary,
    fontSize: 24,
    top:2
  },
  gridListItemIconImage:{
    tintColor: theme.secondary,
    width: 26,
    height: 26,
    top:2
  },
  gridListItemMeta__block: {
    flexDirection:'column',
    alignItems:'center',
    maxWidth: width - 40,
  },
  gridListItemMetaInfo__title:{
    color:'#000',
    fontSize: 15,
  },
  gridListItemMetaInfo: {
    fontSize: 22,
    color: theme.white,
  },
  gridListItemPlace:{
    fontSize: 22,
    color:theme.pink,
  },
  gridListItemDistance: {
    color: '#000',
    textAlign:'right',
    fontSize:15
  },
  gridListItemLeftIcon: {
    width:40,
    paddingRight:15,
    color: theme.secondary,
    fontSize: 15,
  },
  gridListItemLeftImage: {
    width: 40,
    paddingRight:15
  },
  gridListItemImgColorLayer: {
    //position: 'absolute',
    //left: 0, top: 0, bottom: 0, right: 0,
    flex: 1
  }
});

const EventDetail = React.createClass({
  propTypes: {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
  },

  componentDidMount() {
    analytics.viewOpened(VIEW_NAME);
  },

  onPressBack() {
    this.props.navigator.pop();
  },

  render: function() {
    // TODO: stylize the "meta-elements"

    const model = this.props.route.model;
    const currentDistance = this.props.route.currentDistance;
    const timepoint = time.formatEventTime(model.startTime, model.endTime, { formatLong: true });
    const coverImage =  model.coverImage;

    return <View style={[styles.wrapper, { paddingTop: 0 }]}>
      <Toolbar title={model.name} title="" navigator={this.props.navigator} />

      <Background color="purple" />
      <View style={{ flex: 1, backgroundColor: theme.purpleLayer, zIndex: 2, }}>
      <ScrollView style={styles.eventDetail}>
        <View style={styles.header}>
          <View style={styles.headerImageWrap}>
            <Image style={styles.headerImageLayer} />
            <Image style={styles.headerImage} source={{ uri: coverImage }} />
          </View>
          <View style={styles.headerTextWrap}>
            <Text style={styles.headerText}>
              {model.name}
            </Text>
          </View>
        </View>

        <View style={{ marginTop:10 }}>
            <View style={styles.gridListItemMetaWrap}>

            <View style={styles.gridListItemMeta}>
              <View style={[styles.gridListItemMeta__block, {alignItems: 'flex-start'}]}>
                <Text style={styles.gridListItemMetaInfo}>{timepoint.time} - {timepoint.endTime}</Text>
              </View>
            </View>

            <View style={styles.gridListItemMeta}>
              <View style={[styles.gridListItemMeta__block, {alignItems: 'flex-start'}]}>
                <Text style={styles.gridListItemPlace}>{model.locationName}</Text>
              </View>
            </View>

            { currentDistance !== '' && currentDistance &&
            <View style={styles.gridListItemMeta}>
              <View style={styles.gridListItemMeta__block}>
                <Text style={styles.gridListItemLeftIcon}><MaterialIcon style={styles.gridListItemIcon} name='redo'/> </Text>
              </View>

              <View style={[styles.gridListItemMeta__block, {alignItems: 'flex-start'}]}>
                <Text style={styles.gridListItemMetaInfo__title}>Distance from you</Text>
                <Text style={styles.gridListItemMetaInfo}>{currentDistance}</Text>
              </View>
            </View>
            }

            { model.facebookId &&
                <PlatformTouchable
                activeOpacity={0.6} delayPressIn={1}
                underlayColor={'#eee'}
                onPress={() =>
                  Linking.openURL(`https://www.facebook.com/${ model.facebookId }`)}
                >
                  <View style={styles.detailEventInfoContainer}>
                    <View style={styles.detailEventInfoWrapper}>
                      <Icon style={styles.detailEventInfoIcon} name='social-facebook' size={18}/>
                      <Text style={styles.detailEventInfoAttending}>
                        Facebook page
                      </Text>
                    </View>
                  </View>
                </PlatformTouchable>
              }
              </View>

              <View style={styles.content}>
                <Text style={styles.detailEventDescription}>{model.description}</Text>
              </View>
          </View>
      </ScrollView>
      </View>
    </View>
  }

});

export default EventDetail;
