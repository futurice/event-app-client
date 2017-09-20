import React from 'react';
import {
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30
  }
});

const Loader = props => {
  return <ActivityIndicator
    color={props.color || theme.secondary}
    animating={true}
    style={styles.activityIndicator}
    size={props.size || 'large'} />;
};

export default Loader;
