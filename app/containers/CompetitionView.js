'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import React, {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  PropTypes,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  RefreshControl
} from 'react-native';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import theme from '../style/theme';
import * as TeamActions from '../actions/team';
import analytics from '../services/analytics';
import LeaderboardEntry from '../components/competition/LeaderboardEntry';
const Icon = require('react-native-vector-icons/Ionicons');

const IOS = Platform.OS === 'ios';
const VIEW_NAME = 'CompetitionView';


import PlatformTouchable from '../components/common/PlatformTouchable';

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

  renderTabs() {
    const TABS = ['Team', 'Personal'];
    const { leaderBoardFilter } = this.props;


    return (
      <View style={styles.tabsWrap }>
        <View style={ styles.tabs }>
          {TABS.map((tab, index) => {
            const isCurrentTab = index === 0 && !leaderBoardFilter || leaderBoardFilter === tab;
            return (
            <PlatformTouchable activeOpacity={0.6} delayPressIn={1} onPress={() => this.changeLeaderBoardFilter(tab)} style={styles.tabLink} >
              <View style={ [styles.tab, { backgroundColor: isCurrentTab ? theme.secondary : null }]}>
                <Text style={ [styles.tabText, { color: isCurrentTab ? theme.white : theme.secondary }] }>{tab}</Text>
              </View>
            </PlatformTouchable>
            )
          })}
        </View>
      </View>

    )
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
      colors={[theme.primary]}
      tintColor={theme.primary}
      progressBackgroundColor={theme.light} />;

    return (
      <View style={styles.container}>



        {/*
        <View style={styles.leaderboardIntro}>
          <View style={styles.leaderboardIconWrap}>
            <Icon name='trophy' style={styles.leaderboardIcon} />
          </View>
          <View style={styles.leaderboardIntroTextWrap}>
            <Text style={styles.leaderboardIntroText}>
                Current Futubileet2016 points for each team.
                Be active App user and lead your team to the victory!
            </Text>
          </View>
        </View>
        */ }

        {this.renderTabs()}

        {(!this.props.leaderBoardFilter || this.props.leaderBoardFilter === 'Team') ?
        <ScrollView style={styles.leaderboard}
          refreshControl={refreshControl}
        >
          {this.props.teams.map((team, index) =>
            <LeaderboardEntry key={team.get('id')} topscore={+topscore}
              team={team} position={index + 1} logo={team.get('imagePath')} />
          )}
        </ScrollView> :
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Personal Leaderboard is coming later</Text></View>
        }



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
    flexDirection:'row',
    margin:20,
    marginBottom:0,
    marginTop:5,
    padding: IOS ? 13 : 13,
    paddingLeft:7,
    paddingRight:5,
    justifyContent:'space-between',
    borderBottomWidth:2,
    borderBottomColor:'#eee',
  },
  leaderboardIconWrap:{
    width:62,
    paddingRight:10,
  },
  leaderboardIcon: {
    color:'#FFCC03',
    fontSize:44,
    top:4
  },
  leaderboardIntroTextWrap:{
    flex:1,
  },
  leaderboardIntroText:{
    color: theme.dark,
    fontSize:12
  },
  leaderboardIntroText__grey:{
    color:'#aaa',
    marginTop:5,
  },
  leaderboard: {
    flex: 1,

  },
  tabsWrap: { margin: IOS ? 20 : 0, marginTop: IOS ? 10 : 0, marginBottom: IOS ? 10 : 0, elevation: 3 },
  tabs: { borderRadius: IOS ? 5 : 0, borderWidth: IOS ? 1 : 0, borderTopWidth: 1, borderColor: IOS ? theme.secondary : '#eee', flex: 1, flexDirection: 'row' },
  tabLink: { height: IOS ? 32 : 45, flex: 1 },
  tab: { height: IOS ? 32 : 45, flex: 1, alignItems: 'center', justifyContent: 'center'},
  tabText: { color: theme.secondary }

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
