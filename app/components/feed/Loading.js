import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ProgressBar from 'ProgressBarAndroid';
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
    color: 'rgba(0,0,0,.3)'
  }
});

const Loading = props => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        color={theme.secondary}
        animating={true}
        style={styles.activityIndicator}
        size='large' />
      <Text style={ styles.loadMessage}>Loading...</Text>
    </View>
  );
};

export default Loading;
