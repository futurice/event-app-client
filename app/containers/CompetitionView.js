'use strict';

import React, {
  StyleSheet,
  View,
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
    let topscore = 0
    this.props.teams.map((team) => {
      topscore = team.get('score') > topscore ? team.get('score') : topscore;
    });

    return (
      <View style={styles.container}>
          <View style={styles.leaderboardIntro}>
            <View style={styles.leaderboardIconWrap}>
              <Icon name='trophy' style={styles.leaderboardIcon} />
            </View>
            <View style={styles.leaderboardIntroTextWrap}>
              <Text style={styles.leaderboardIntroText}>
                Current situation between Killat.
                Be an active Whappu user and lead your Kilta to victory!
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
    backgroundColor:'#FFF',
  },
  leaderboardIntro:{
    height:80,
    flexDirection:'row',
    margin:20,
    marginBottom:0,
    marginTop:5,
    padding:15,
    paddingLeft:7,
    justifyContent:'space-between',
    borderBottomWidth:1,
    borderBottomColor:'#eee'
  },
  leaderboardIconWrap:{
    width:62,
    paddingRight:10,
  },
  leaderboardIcon: {
    color:'#FFCC03',
    fontSize:44,
  },
  leaderboardIntroTextWrap:{
    flex:1,
  },
  leaderboardIntroText:{
    color:'#212121',
    fontSize:13
  },
  leaderboard: {
    flex: 1
  }
});

const select = store => {
  return {
    teams: store.team.get('teams'),
    actionTypes: store.competition.get('actionTypes')
  };
};

export default connect(select)(CompetitionView);
