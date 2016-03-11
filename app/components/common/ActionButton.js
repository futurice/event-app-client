'use strict';

import React, {
  StyleSheet,
  View
} from 'react-native';
import Button from './Button';

const ActionButton = ({ onPress, isDisabled, title }) => {
  return <View style={styles.buttonContainer}>
    <Button
      style={styles.button}
      onPress={() => onPress()}
      isDisabled={isDisabled}>
      {title}
    </Button>
  </View>;
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0.3333333,
    padding: 5
  },
  button: {
    // flex: 1
  }
});

export default ActionButton;
