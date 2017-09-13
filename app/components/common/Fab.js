import React, { PropTypes } from 'react';
import {
  View,
  TouchableHighlight,
  Platform,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 67 : 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28
  },
  content: {
    bottom: 0,
    right: 0
  },
  disabledButton: {
    opacity: 0.6
  }
});

export default React.createClass({
  propTypes: {
    styles: View.propTypes.style,
    onPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    underlayColor: PropTypes.string
  },

  render() {
    const touchableProps = this.props.disabled ? {} : {
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      underlayColor: this.props.underlayColor
    };

    const buttonStyles = this.props.disabled ?
      [styles.button, this.props.styles, styles.disabledButton] :
      [styles.button, this.props.styles];

    return (
      <TouchableHighlight {...touchableProps} style={buttonStyles}>
        <View style={[styles.content]}>
          <View>
            {this.props.children}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});
