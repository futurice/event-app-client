'use strict';

import React from 'react-native';
var {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
  View,
  Platform,
  Linking
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
    paddingBottom: 20
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
    textAlign: 'justify',
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
  },

  navigationButton: {
    height: 50,
    margin: 30,
    marginTop: 0,
    backgroundColor: '#E9E9E9',
    borderColor: '#C7C7C7',
    borderWidth: 4
  },
  navigationButtonText: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 35
  },
  navigationButtonIcon: {
    paddingTop: 5,
    marginRight: 10
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
    // TODO: stylize the icon on get me there better, it sucks right now

    const model = this.props.route.model;
    const timepoint = time.formatEventTime(model.startTime, model.endTime, { formatLong: true });

    return <View style={styles.wrapper}>
      {(Platform.OS === 'android') ? <Toolbar title={model.name} navigator={this.props.navigator} /> : null }
      <ScrollView>
        <EventListItem item={model} handlePress={() => true} />

        <View>
          <Text><Icon name='social-facebook' size={20} />FB-event</Text>
          {this.getEventStatus(timepoint)}
        </View>

        <View style={styles.content}>
          <Text style={styles.detailEventDescription}>{model.description}</Text>
        </View>

        <TouchableHighlight
          style={styles.navigationButton}
          onPress={() => {
            console.log('Get me there -link clicked:', geoURL);
            const geoURL = 'http://maps.google.com/maps?ll' + model.location.latitude + ',' + model.location.longitude;
            Linking.openURL(geoURL);
          }}
        >
          <Text style={styles.navigationButtonText}>
            <Icon name='navigate' size={35} color='#EA489C' style={styles.navigationButtonIcon} />
            Get me there!
          </Text>
        </TouchableHighlight>
      </ScrollView>
    </View>;
  }

});

export default EventDetail;
