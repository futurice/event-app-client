'use strict';

import React, {
  View,
  Modal,
  Text,
  TextInput,
  StyleSheet,
  Modal
} from 'react-native';
import Team from "./Team";

const TeamSelector = React.createClass({
  render() {
    return (
      <View>
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

export default TeamSelector;
