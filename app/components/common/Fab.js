'use strict';

import React, {
  View,
  TouchableHighlight,
  Text,
  Platform,
  StyleSheet
} from 'react-native';


var FAB = React.createClass({


  _renderInnerText: function () {
    return (
      <View style={[this.props.styles, {bottom:0, right:0}]}>
          <View>{this.props.text}</View>
      </View>
    );
  },

  render: function () {

    const touchableProps = {
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
    };
    return (
      <TouchableHighlight {...touchableProps}
      style={[styles.button, this.props.styles]}>
      {this._renderInnerText()}
      </TouchableHighlight>
      );

  }
});

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position:'absolute',
    bottom: Platform.OS==='ios' ? 67 : 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28
  }
});

export default FAB;
