import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';

import Text from '../Text'
import theme from '../../style/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60
  },
  loadMessage: {
    marginTop: 5,
    textAlign: 'center',
    color: theme.secondary
  }
});

const Loading = props => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        color={props.color || theme.secondary}
        animating={true}
        style={styles.activityIndicator}
        size='large' />
      <Text style={[styles.loadMessage, props.color ? { color: props.color } : {}]}>Loading_</Text>
    </View>
  );
};

export default Loading;
