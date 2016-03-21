'use strict';

import React, { StyleSheet, Platform } from 'react-native';
import Fab from '../common/Fab';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 67 : 20,
    right: 20,
    backgroundColor: theme.secondary,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 0
    },
  }
});

const ActionButton = React.createClass({
  render() {
    const combinedStyle = [styles.button];
    const { extraStyle, onPress, disabled, children } = this.props;

    if (extraStyle) {
      combinedStyle.push(extraStyle);
    }

    return (
      <Fab onPress={onPress} styles={combinedStyle} disabled={disabled} underlayColor={theme.secondaryLight}>
        {children}
      </Fab>
    );
  }
});

export default ActionButton;
