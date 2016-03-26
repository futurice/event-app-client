'use strict';

import React, {
  View,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
  PropTypes
} from 'react-native';

var Button = React.createClass({
  propTypes: Object.assign({},
    {
      textStyle: Text.propTypes.style,
      disabledStyle: Text.propTypes.style,
      children: PropTypes.string.isRequired,
      isDisabled: PropTypes.bool,
      onPress: PropTypes.func,
      onPressIn: PropTypes.func,
      onPressOut: PropTypes.func
    },
  ),

  _renderInnerText: function() {
    return (
      <Text style={[styles.textButton, this.props.textStyle]}>
        {this.props.children.toUpperCase()}
      </Text>
    );
  },

  render: function() {
    if (this.props.isDisabled === true) {
      return (
        <View style={[styles.button, this.props.style, (this.props.disabledStyle || styles.opacity)]}>
          <Text style={{textAlign:'center'}}>{this._renderInnerText()}</Text>
        </View>
      );
    } else {
      const touchableProps = {
        onPress: this.props.onPress,
        onPressIn: this.props.onPressIn,
        onPressOut: this.props.onPressOut,
      };
      return (
        <View style={[styles.button, this.props.style]}>
        <TouchableNativeFeedback {...touchableProps}
          delayPressIn={0}
          background={TouchableNativeFeedback.SelectableBackground()}
        >
          <View style={{flex:1, justifyContent:'center', height:40}}>
            {this._renderInnerText()}
          </View>
        </TouchableNativeFeedback>
        </View>
      );
    }
  }
});

const styles = StyleSheet.create({
  button: {
    flex:1,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#50E3C2',
    borderRadius: 2,
    paddingLeft: 0,
    paddingRight: 0
  },
  textButton: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff'
  },
  opacity: {
    opacity: 0.6
  }
});

export default Button;
