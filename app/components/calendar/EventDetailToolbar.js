'use strict';

import React from 'react-native';
var {
  ToolbarAndroid,
  StyleSheet,
  PropTypes
} = React;
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../style/theme';

// TODO re-enable
// const toolbarActions = [
//   {title: 'Share', id:'share'}
// ];

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'rgba(0,0,0,.1)',
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
    return (
      <Icon.ToolbarAndroid
      //actions={toolbarActions} TODO - SHARE
      //onActionSelected={this._onActionSelected}
      onIconClicked={this._goBack}
      navIconName={'android-arrow-back'}
      titleColor={theme.light}
      iconColor={theme.light}
      style={styles.toolbar}
      title={''}
      />
    );
  }
});

module.exports = EventDetailToolbar;
