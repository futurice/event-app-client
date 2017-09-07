'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';

import theme from '../../style/theme';
import Text from '../Text';
import PlatformTouchable from '../common/PlatformTouchable';
import Content from './Content';

const isIOS = Platform.OS === 'ios';

class AboutTab extends Component {

  render() {
    const { color, closeTab } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <PlatformTouchable
          onPress={() => closeTab()}
        >
          <Text style={[styles.title, styles[color]]}>About</Text>
        </PlatformTouchable>
        <Content>
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
          </Text>
        </Content>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.purpleLayer
  },
  content: {
    padding: 30,
    paddingTop: isIOS ? 40 : 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 46,
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
