'use strict';

import React, { Animated, View, Text, Platform, StyleSheet } from 'react-native';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  label:{
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    padding: 6,
    top: 16,
    height: Platform.OS === 'ios' ? 26 : 27,
    backgroundColor: '#FFF',
    elevation:2,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0
    },
    borderRadius: 3,
    right: 60
  },
  labelText:{
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.secondary
  },
  additionalLabelText:{
    color: '#bbb',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 11,
    flex: 1
  }
});

const ActionButtonLabel = React.createClass({
  render() {
    const combinedStyle = [styles.label];
    const { extraStyle, children, additionalLabel } = this.props;

    if (extraStyle) {
      combinedStyle.push(extraStyle);
    }

    return (
      <Animated.View style={combinedStyle}>
        <Text style={styles.labelText}>{children}</Text>
        <Text style={styles.additionalLabelText}>{additionalLabel}p</Text>
      </Animated.View>

    );
  }
});

export default ActionButtonLabel;
