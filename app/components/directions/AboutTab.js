'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';

import theme from '../../style/theme';
import Text from '../Text';
import PlatformTouchable from '../common/PlatformTouchable';
import Content from './Content';

import { SCREEN_SMALL } from '../../utils/responsive';

const isIOS = Platform.OS === 'ios';

class AboutTab extends Component {

  render() {
    const { closeTab, color } = this.props.route;

    return (
      <ScrollView style={styles.content}>
        <PlatformTouchable
          onPress={() => closeTab()}
        >
          <Text style={[styles.title, styles[color]]}>About</Text>
        </PlatformTouchable>
        <Content>
          <Text style={styles.subTitle}>
            FutuParty
          </Text>
          <Text style={styles.paragraph}>
            FutuParty is equal parts massive event and house party. It's when we take our own advice and get out of the office to spread the Futurice spirit and transform our chosen venue into something a lot more fun. This year, in honor of Finland's 100th anniversary, we're taking over Finlandia Hall.
          </Text>

          <Text style={styles.subTitle}>
            Venue - Finlandia Hall
          </Text>
          <Text style={styles.paragraph}>
            Finlandia Hall is a congress and event venue in the centre of Helsinki on the Töölönlahti Bay. The building, which was designed by architect Alvar Aalto, was completed in 1971.
          </Text>
          <Text style={styles.paragraph}>
            Every detail in the building is designed by Aalto. The designs were completed in 1962, with building taking place between 1967–1971. The Congress Wing was designed in 1970 and built in 1973–1975. In 2011, the building was expanded with new exhibition and meeting facilities.
          </Text>
          <Text style={styles.paragraph}>
            The inauguration of the Finlandia Hall was celebrated on 2 December 1971. The inauguration concert included the first performance of Einojuhani Rautavaara’s Meren tytär (‘Daughter of the Sea’) and Aulis Sallinen’s Symphony (opus 24), as well as Sibelius’s violin concerto with Isaac Stern as the violin soloist of the Helsinki Philharmonic Orchestra.
          </Text>
          <Text style={styles.paragraph}>
            A comprehensive history of the Finlandia Hall, Events, People and Music, was published in 2001 by the Otava Publishing Company. The book was written by Pekka Suhonen, Petri Mustonen and Eeva-Kaarina Holopainen.
          </Text>
          <Text style={styles.paragraph}>
            The versatile and flexible meeting, exhibition, festival and concert facilities of the Finlandia Hall offer a setting for both large international congresses and small-scale meetings, and for various entertainment and public events. The Finlandia Hall has proved its ability to serve as a venue for several world congresses and as a forum for the world’s top economic and political leaders. The building itself is a popular attraction visited by thousands of tourists from all over the world every year. The building is owned by the City of Helsinki.
            {'\n\n\n\n'}
          </Text>
        </Content>
      </ScrollView>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.transparent
  },
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
  }
});


export default AboutTab;
