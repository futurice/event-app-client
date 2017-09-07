'use strict';

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Text from '../Text';
import theme from '../../style/theme';

var Button = React.createClass({

  _renderInnerText: function() {
    return (
      <Text style={styles.textButton}>
        {this.props.children}
      </Text>
    );
  },

  render: function() {
    if (this.props.isDisabled === true) {
      return (
        <View style={[styles.button, this.props.style,
            this.props.disabledStyle || styles.opacity]}>
          {this._renderInnerText()}
        </View>
      );
    } else {
      const touchableProps = {
        onPress: this.props.onPress,
        onPressIn: this.props.onPressIn,
        onPressOut: this.props.onPressOut,
      };
      return (
        <TouchableOpacity {...touchableProps}
          style={[styles.button, this.props.style]}>
          {this._renderInnerText()}
        </TouchableOpacity>
      );
    }
  }
});

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: theme.primary,
    borderRadius: 100,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
  },
  textButton: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff'
  },
  opacity: {
    opacity: 0.6
  }
});

export default Button;
