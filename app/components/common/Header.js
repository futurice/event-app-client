'use strict';

import React, { Component } from 'react';
import { ToolbarAndroid, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../style/theme';
import Tabs from '../../constants/Tabs';

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: theme.yellow,
    elevation: 1,
    height: 56,
  }
});

const getActions = (tab, sortType) => {
  return [];
};

class EventDetailToolbar extends Component {
  render() {
    const toolbarStyles = [styles.toolbar];

    const {
      backgroundColor,
      titleColor,
      currentTab,
      selectedSortType,
      route,
    } = this.props;

    const { showBack } = route || {};

    if (backgroundColor) {
      toolbarStyles.push({ backgroundColor, elevation: 3 })
    }
    return (
      <Icon.ToolbarAndroid
        actions={getActions(currentTab, selectedSortType)}
        logo={require('../../../assets/futurice-logo.png')}
        title={''}
        iconColor={theme.white}
        titleColor={titleColor || theme.white}
        style={toolbarStyles}
      />
    );
  }
}

export default EventDetailToolbar;
