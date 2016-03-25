'use strict';

import React from 'react-native';
var {
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
  View,
  PropTypes,
  Platform,
  Linking
} = React;
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../style/theme';
import Toolbar from './EventDetailToolbar';

import analytics from '../../services/analytics';
import time from '../../utils/time';
import EventListItem from './EventListItem';

const VIEW_NAME = 'EventDetail';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  detailEventImg: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  content: {
    paddingTop:10,
    padding: 20,
    paddingBottom:40,
    flex: 1,
  },
  detailEventInfoContainer: {
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'center',
    padding:20,
    backgroundColor:'#eee'
  },
  detailEventInfoWrapper: {
    flex:1,
    flexDirection:'row',
    alignItems:'flex-end',
  },
  detailEventInfoIcon: {
    fontSize:25,
    color:'#888',
    marginTop:1,
    paddingRight:10,
  },
  detailEventInfoAttending: {
    fontSize:14,
    color:'#aaa',
    alignSelf: 'center'
  },
  detailEventInfoTime: {
    color: '#aaa',
    fontSize: 14,
    alignSelf: 'center'
  },
  detailEventName: {
    backgroundColor: theme.light,
    textAlign: 'left',
    color: theme.primary,
    fontWeight: 'bold',
    fontSize: 25,
  },
  detailEventDescription: {
    color: '#888',
    fontWeight: 'normal',
    fontSize: 15,
    marginTop: 10,
  },

  navigationButtonWrapper: {
    margin: 20,
    marginTop:10,
    marginBottom: 50,
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
    fontWeight: 'bold',
    color: '#8A8A8A',
    margin: 0,
    padding: 0
  },
  navigationButtonIcon: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    top: 10,
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

  getEventStatus(timepoint) {
    if (timepoint.onGoing) {
      return 'Ongoing';
    } else if (timepoint.startsSoon) {
      return 'Starting soon';
    } else {
      return null;
    }
  },

  render: function() {
    // TODO: stylize the "meta-elements"

    const model = this.props.route.model;
    const currentDistance = this.props.route.currentDistance;
    const timepoint = time.formatEventTime(model.startTime, model.endTime, { formatLong: true });

    return <View style={styles.wrapper}>
      {(Platform.OS === 'android') ?
        <Toolbar title={model.name} navigator={this.props.navigator} /> : null}

      <ScrollView style={{flex:1}}>
        <EventListItem item={model} currentDistance={currentDistance} handlePress={() => true} />

       {model.facebookId && this.getEventStatus(timepoint) &&
        <View style={styles.detailEventInfoContainer}>
          <View style={styles.detailEventInfoWrapper}>
            {model.facebookId &&
            <TouchableHighlight
              style={styles.detailEventInfoWrapper}
              onPress={() =>
                Linking.openURL(`https://www.facebook.com/events/${ model.facebookId }`)}
            >
              <View style={styles.detailEventInfoWrapper}>
                <Icon style={styles.detailEventInfoIcon} name='social-facebook' size={18}/>
                <Text style={styles.detailEventInfoAttending}>
                  {model.attendingCount}
                </Text>
              </View>
            </TouchableHighlight>
            }
          </View>
          <Text style={styles.detailEventInfoTime}>{this.getEventStatus(timepoint)}</Text>
        </View>
        }

        <View style={styles.content}>
          <Text style={styles.detailEventDescription}>{model.description}</Text>
        </View>
      </ScrollView>
    </View>;
  }

});

export default EventDetail;
