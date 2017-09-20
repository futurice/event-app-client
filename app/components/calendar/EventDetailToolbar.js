

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
    backgroundColor: theme.secondary,
    position:'absolute',
    left:0,
    top:0,
    right:0,
    elevation:3,
    height: 56,
  }
});

var EventDetailToolbar = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired
  },

  goBack() {
    this.props.navigator.pop();
  },

  render() {
    const { showLogo, backgroundColor, title } = this.props;
    const toolbarStyles = [styles.toolbar];

    if (backgroundColor) {
      toolbarStyles.push({ backgroundColor: backgroundColor })
    }

    return (
      <Icon.ToolbarAndroid
        logo={showLogo ? require('../../../assets/futurice-logo.png') : null}
        onIconClicked={this.goBack}
        navIconName={'arrow-back'}
        titleColor={theme.white}
        iconColor={theme.white}
        style={toolbarStyles}
        title={!showLogo ? title : ''}
      />
    );
  }
});

module.exports = EventDetailToolbar;
