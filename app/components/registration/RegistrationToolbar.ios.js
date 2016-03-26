'use strict';

import React from 'react-native';
var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PropTypes
} = React;
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: theme.secondary,
    height: 60,
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: theme.light
  },
  title:{
    paddingRight:15,
    color: theme.light,
    fontWeight: 'bold'
  }
});

var EventDetailToolbar = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    iconClick: PropTypes.func.isRequired
  },
  _onActionSelected: function(position) {
  },

  render() {
    return (
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={this.props.iconClick}>
          <Icon style={styles.icon} name={this.props.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>{this.props.title}</Text>
        <View />
      </View>

    );
  }
});

module.exports = EventDetailToolbar;
