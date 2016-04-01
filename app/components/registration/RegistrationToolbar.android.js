'use strict';

import React from 'react-native';
var {
  ToolbarAndroid,
  StyleSheet,
  PropTypes
} = React;
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: theme.secondary,
    height: 56,
    elevation:2,
  }
});

var EventDetailToolbar = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    iconClick: PropTypes.func
  },
  _onActionSelected: function(position) {
  },

  render() {
    return (
      <Icon.ToolbarAndroid
      onIconClicked={this.props.iconClick}
      navIconName={this.props.icon}
      titleColor={theme.light}
      iconColor={theme.light}
      style={styles.toolbar}
      title={this.props.title}
      />
    );
  }
});

module.exports = EventDetailToolbar;
