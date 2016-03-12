'use strict';

import React from 'react-native';
var {
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  ListView,
  Text,
  Dimensions,
  TouchableHighlight,
  InteractionManager,
  View,
  Platform,
  WebView,
} = React;
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../style/theme';
import Toolbar from './EventDetailToolbar';

import EventListItem from './EventListItem';
import time from '../../utils/time';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 20,
    marginTop: 20 // to unset
  },
  detailEventImg: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  detailEventName: {
    backgroundColor: theme.light,
    textAlign: 'left',
    color: theme.primary,
    fontWeight: 'bold',
    fontSize: 25,
  },
  detailEventDescription: {
    textAlign: 'left',
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
  }
});

const EventDetail = React.createClass({
  onPressBack() {
    this.props.navigator.pop();
  },

  getEventStatus(timepoint) {
    if (timepoint.onGoing) {
      return <Text>Käynnissä ny!</Text>;
    } else if (timepoint.startsSoon) {
      return <Text>Alkaa kohta!</Text>;
    } else {
      return null;
    }
  },

  render: function() {
    // TODO: stylize the "meta-elements"

    const model = this.props.route.model;
    const timepoint = time.formatEventTime(model.startTime, model.endTime, { formatLong: true });

    return <View style={styles.wrapper}>
      {(Platform.OS === 'android') ? <Toolbar title={model.name} navigator={this.props.navigator} /> : null }
      <ScrollView>
        <EventListItem item={model} handlePress={() => true} />

        <View>
          <Text><Icon name='social-facebook' size={20} />Event</Text>
          <Text><Icon name='android-calendar' size={15} /> {timepoint.date}</Text>
          <Text><Icon name='android-time' size={15} /> {timepoint.time}</Text>
          {this.getEventStatus(timepoint)}
        </View>

        <View style={styles.content}>
          <Text style={styles.detailEventDescription}>{model.description}</Text>
        </View>
      </ScrollView>
    </View>;
  }

});

export default EventDetail;
