'use strict';
import React, { PropTypes } from 'react';

import {
  View,
  StyleSheet
} from 'react-native';
import Team from './Team';

/** DEPRECATED */
const TeamSelector = React.createClass({
  propTypes: {
    teams: PropTypes.array.isRequired,
    onSelectTeam: PropTypes.func.isRequired
  },

  render() {
    return (
      <View style={styles.teamList}>
        {this.props.teams.map(team =>
          <Team
            key={team.get('id')}
            name={team.get('name')}
            onPress={this.props.onSelectTeam.bind(null, team.get('id'))} />
        )}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  teamList: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#ffffff'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  }
});

export default TeamSelector;
