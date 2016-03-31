'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import React, {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  PropTypes,
  Text,
} from 'react-native';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import analytics from '../services/analytics';
import LeaderboardEntry from '../components/competition/LeaderboardEntry';
const Icon = require('react-native-vector-icons/Ionicons');

const VIEW_NAME = 'CompetitionView';

const CompetitionView = React.createClass({
  propTypes: {
    teams: PropTypes.instanceOf(Immutable.List).isRequired
  },

  componentDidMount() {
    analytics.viewOpened(VIEW_NAME);
  },

  render() {
    let topscore = 0;
    this.props.teams.map((team) => {
      topscore = Math.max(
        parseInt(team.get('score'), 10), topscore);
    });

    return (
      <View style={styles.container}>
          <View style={styles.leaderboardIntro}>
            <View style={styles.leaderboardIconWrap}>
              <Icon name='trophy' style={styles.leaderboardIcon} />
            </View>
            <View style={styles.leaderboardIntroTextWrap}>
              <Text style={styles.leaderboardIntroText}>
                Current Whappupoints between Guilds.
                Be an active Whappu user and lead your Guild to the victory!
              </Text>
              <Text style={[styles.leaderboardIntroText, styles.leaderboardIntroText__grey]}>
                Competition ends at 30th April 00:00
              </Text>
            </View>
          </View>
        <ScrollView style={styles.leaderboard}>
          {this.props.teams.map((team, index) =>
            <LeaderboardEntry key={team.get('id')} topscore={+topscore}
              team={team} position={index + 1} logo={team.get('imagePath')} />
          )}
        </ScrollView>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 0,
  },
  leaderboardIntro:{
    height:90,
    flexDirection:'row',
    margin:20,
    marginBottom:0,
    marginTop:5,
    padding: Platform.OS === 'ios' ? 13 : 9,
    paddingLeft:7,
    paddingRight:5,
    justifyContent:'space-between',
    borderBottomWidth:1,
    borderBottomColor:'#eee',
  },
  leaderboardIconWrap:{
    width:62,
    paddingRight:10,
  },
  leaderboardIcon: {
    color:'#FFCC03',
    fontSize:44,
    top:5
  },
  leaderboardIntroTextWrap:{
    flex:1,
  },
  leaderboardIntroText:{
    color:'#212121',
    fontSize:12
  },
  leaderboardIntroText__grey:{
    color:'#aaa',
    marginTop:5,
  },
  leaderboard: {
    flex: 1,

  }
});

const select = store => {
  return {
    teams: store.team.get('teams'),
    actionTypes: store.competition.get('actionTypes')
  };
};

export default connect(select)(CompetitionView);
