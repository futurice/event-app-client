

import React, { Component } from 'react';
import { View, TouchableOpacity, Linking, StyleSheet, ScrollView, Platform } from 'react-native';

import theme from '../../style/theme';
import Text from '../Text';
import PlatformTouchable from '../common/PlatformTouchable';
import Content from './Content';
import { SCREEN_SMALL } from '../../utils/responsive';
import locationService from '../../services/location';

const isIOS = Platform.OS === 'ios';

const EVENT_LOCATION = { latitude: 60.1756973, longitude: 24.9336035 };
const mapLink = locationService.getGeoUrl({ location: EVENT_LOCATION, locationName: 'Futufinlandia' })
const parkInfoLink = 'http://www.q-park.fi/language/fi-fi/fi/pysakointi-q-parkissa/pysakointilaitokset/kaupunki/qparkparkinglocatorvw2837/parkingdetail/parkingid/2173'

class DirectionsTab extends Component {
  render() {
    const { closeTab, color } = this.props.route;

    return (
      <ScrollView style={styles.content}>
        <PlatformTouchable
          onPress={() => closeTab()}
        >
          <Text style={[styles.title, styles[color]]}>Directions</Text>
        </PlatformTouchable>
        <Content>
          <Text style={styles.subTitle}>Address</Text>
          <Text style={styles.paragraph}>
            {`Finlandia Hall \nMannerheimintie 13e \n00100 Helsinki\n\nMain entrance: M4/K4`}
          </Text>

          <TouchableOpacity onPress={() => Linking.openURL(mapLink)}>
            <Text style={styles.link}>Open in Map</Text>
          </TouchableOpacity>

          <Text style={styles.paragraph} />


          <Text style={styles.subTitle}>Public transport</Text>
          <Text style={styles.paragraph}>
            Finlandia Hall is located in a park on Töölönlahti Bay in the centre of Helsinki, not far from main bus and railways stations. Tram and bus stops can be found right in front of the building, and Finlandia Hall is only a short walk from the city centre.
            {'\n\n'}
            Trams 4, 7, and 10 stop on Mannerheimintie in front of Finlandia Hall (National Museum stop).
            {'\n\n'}
            Finlandia Hall’s taxi stand can be found on Karamzininranta, in front of the K1 entrance. Taxis can also be asked to pick up guests on the Mannerheimintie side of the building.
          </Text>
          <Text style={styles.subTitle}>Parking</Text>
          <Text style={styles.paragraph}>
            Q-Park Finlandia is located nearby and connected to Finlandia Hall by an underground walkway during Finlandia Hall's opening hours.
            {'\n\n'}
            The entrance to the car park is on Karamzininranta. Parking charges apply and the 650-space facility is operated by Q-Park.
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(parkInfoLink)}>
            <Text style={styles.link}>More info about Parking</Text>
          </TouchableOpacity>
          <Text>{'\n\n\n\n'}</Text>
        </Content>
      </ScrollView>
    );
  }
};


const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 30,
    paddingTop: 60,
    paddingBottom: 50,
  },
  title: {
    fontSize: SCREEN_SMALL ? 38 : 46,
    marginBottom: 20,
    textDecorationLine: 'underline',
    color: theme.white,
  },
  subTitle: {
    color: theme.pink,
    textDecorationLine: 'underline',
    marginBottom: 15,
    fontSize: 17
  },
  paragraph: {
    fontSize: 17,
    marginBottom: 15,
    color: theme.white
  },
  yellow: {
    color: theme.accent,
  },
  white: {
    color: theme.white,
  },
  pink: {
    color: theme.pink
  },
  link: {
    color: theme.white,
    fontSize: 17,
    textDecorationLine: 'underline',
  }
});


export default DirectionsTab;
