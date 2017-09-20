

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import React, { PropTypes } from 'react';

import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  RefreshControl
} from 'react-native';
import Text from '../components/Text';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import theme from '../style/theme';
import * as TeamActions from '../actions/team';
import analytics from '../services/analytics';
import LeaderboardEntry from '../components/competition/LeaderboardEntry';

const IOS = Platform.OS === 'ios';
const VIEW_NAME = 'CompetitionView';

const CompetitionView = React.createClass({
  propTypes: {
    teams: PropTypes.instanceOf(Immutable.List).isRequired
  },

  componentDidMount() {
    analytics.viewOpened(VIEW_NAME);
  },
  onRefreshFeed(){
    this.props.dispatch(TeamActions.fetchTeams());
  },

  changeLeaderBoardFilter(type) {
    this.props.dispatch(TeamActions.changeListType(type));
  },

  render() {
    let topscore = 0;
    this.props.teams.map((team) => {
      topscore = Math.max(
        parseInt(team.get('score'), 10), topscore);
    });

    const refreshControl = <RefreshControl
      refreshing={this.props.isRefreshing}
      onRefresh={this.onRefreshFeed}
      colors={IOS ? [theme.accent] : [theme.secondary]}
      tintColor={theme.accent}
      progressBackgroundColor={theme.light} />;

    return (
      <View style={styles.container}>

        <View style={styles.leaderboardIntro}>
          <View style={styles.leaderboardIntroTextWrap}>
            <Text style={styles.leaderboardIntroText}>
              Be active App user and lead your team to the victory!
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.leaderboard}
          refreshControl={refreshControl}
        >
        {this.props.teams.map((team, index) =>
          <LeaderboardEntry
            key={team.get('id')}
            topscore={+topscore}
            team={team}
            position={index + 1}
            logo={team.get('imagePath')}
            last={this.props.teams.size === index + 1}
          />
          )}
        </ScrollView>


      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingBottom: 0,
  },
  leaderboardIntro:{
    flexDirection: 'row',
    margin:20,
    marginBottom: 15,
    marginTop: 15,
    padding: IOS ? 10 : 13,
    paddingLeft:7,
    paddingRight:5,
    justifyContent:'space-between',
    alignItems: 'center',
  },
  leaderboardIconWrap:{
    width: 72,
    paddingRight: 15,
  },
  leaderboardIcon: {
    top:0,
    left: -3,
    height: 55,
    width: 55,
    tintColor: '#FFDF46'
  },
  leaderboardIntroTextWrap:{
    flex:1,
    backgroundColor: theme.pink,
    padding: 15,
    paddingBottom: IOS ? 10 : 15,
  },
  leaderboardIntroText:{
    color: theme.white,
    fontSize: 17,
    lineHeight: 25,
  },
  leaderboard: {
    flex: 1,
    backgroundColor: theme.purpleLayer

  },

});

const select = store => {
  return {
    isRefreshing: store.team.get('isRefreshing'),
    teams: store.team.get('teams'),
    actionTypes: store.competition.get('actionTypes'),
    leaderBoardFilter: store.team.get('leaderBoardFilter')
  };
};

export default connect(select)(CompetitionView);
