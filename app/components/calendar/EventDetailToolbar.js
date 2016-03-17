'use strict';

import React from 'react-native';
var {
  ToolbarAndroid,
  StyleSheet,
} = React;
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../style/theme';


const toolbarActions = [
  {title: 'Share',id:'share'}
];

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: theme.primary,
    height: 56,
  }
});

var EventDetailToolbar = React.createClass({
  _goBack(){
    this.props.navigator.pop();
  },

  _onActionSelected: function(position) {
    //TODO switch toolbarActions[position]
  },

  render() {
    return(
    <Icon.ToolbarAndroid
    //actions={toolbarActions} TODO - SHARE
    //onActionSelected={this._onActionSelected}
    onIconClicked={this._goBack}
    navIconName={'android-arrow-back'}
    titleColor={theme.light}
    iconColor={theme.light}
    style={styles.toolbar}
    title={this.props.title}
    />
    );
  }
});

module.exports = EventDetailToolbar;
