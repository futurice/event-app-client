'use strict';

import React, {
  View,
  Modal,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import Button from "../../components/common/Button";

const Team = React.createClass({
  render() {
    return (
      <Button onPress={this.props.onPress}>
        {this.props.name}
      </Button>
    );
  }
});

export default Team;
