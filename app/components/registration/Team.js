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
      <View>
        <Button style={styles.item} onPress={this.props.onPress}>
          {this.props.name}
        </Button>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
});

export default Team;
