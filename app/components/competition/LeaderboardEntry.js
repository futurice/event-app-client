'use strict';

import React, {
  View,
  Modal,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

const LeaderboardEntry = React.createClass({
  render() {
    return (
      <View>
        <Text style={styles.entry}>
          {this.props.position} - {this.props.team.get('name')}: {this.props.team.get('score')}
        </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  entry: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
});

export default LeaderboardEntry;
