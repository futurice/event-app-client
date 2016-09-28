'use strict';

import React, { PropTypes } from 'react';
import {
  ToolbarAndroid,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../style/theme';

// TODO re-enable
// const toolbarActions = [
//   {title: 'Share', id:'share'}
// ];

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'rgba(255,82,64,.25)',
    position:'absolute',
    left:0,
    top:0,
    right:0,
    elevation:2,
    height: 56,
  }
});

var EventDetailToolbar = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired
  },

  _goBack() {
    this.props.navigator.pop();
  },

  _onActionSelected: function(position) {
    //TODO switch toolbarActions[position]
  },

  render() {
    const toolbarStyles = [styles.toolbar];

    if (this.props.backgroundColor) {
      toolbarStyles.push({backgroundColor: this.props.backgroundColor})
    }

    return (
      <Icon.ToolbarAndroid
      //actions={toolbarActions} TODO - SHARE
      //onActionSelected={this._onActionSelected}
        onIconClicked={this._goBack}
        navIconName={'arrow-back'}
        titleColor={theme.light}
        iconColor={theme.light}
        style={toolbarStyles}
        title={this.props.title}
      />
    );
  }
});

module.exports = EventDetailToolbar;
