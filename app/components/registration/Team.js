'use strict';

import React, {
  View,
  Modal,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

const Team = React.createClass({
  render() {
    return (
      <View onPress={this.props.onPress}>
        <Text>
          {this.props.name}
        </Text>
      </View>
    );
  }
});

export default Team;
