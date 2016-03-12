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
  WebView,
} = React;
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../style/theme';

import time from '../../utils/time';

const styles = StyleSheet.create({
  detailEvent: {
    flex: 1,
    backgroundColor: '#FFF'
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

    return <View style={styles.detailEvent}>
      <ScrollView>
        <TouchableHighlight underlayColor={theme.light}>
          <Image source={{ uri: model.coverImage }} style={styles.detailEventImg} />
        </TouchableHighlight>


        <View>
          <Text><Icon name='social-facebook' size={20} />Event</Text>
          <Text><Icon name='android-calendar' size={15} /> {timepoint.date}</Text>
          <Text><Icon name='android-time' size={15} /> {timepoint.time}</Text>
          {this.getEventStatus(timepoint)}
        </View>

        <View style={styles.content}>
          <Text style={styles.detailEventName}>{model.name}</Text>
          <Text style={styles.detailEventDescription}>{model.description}</Text>
        </View>
      </ScrollView>
    </View>;
  }

});

export default EventDetail;
