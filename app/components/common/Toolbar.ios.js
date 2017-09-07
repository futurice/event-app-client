'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  PropTypes
} from 'react-native';
import Text from '../Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: theme.yellow,
    height: 60,
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: theme.transparent,
    position: 'absolute',
    bottom: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    zIndex: 2,
  },
  rightButton: {
    minWidth: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    left: null,
    right: 5,
    bottom: 8,
  },
  icon: {
    fontSize: 24,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 5,
    color: theme.blue1
  },
  rightIcon: {
    padding: 0,
    paddingRight: 0,
    color: theme.blue2
  },
  text: {
    fontSize: 14,
    paddingLeft: 5,
    paddingRight: 10,
    color: theme.blue2,
    fontWeight: 'bold'
  },
  titleWrap: {
    flex: 1,
    alignItems: 'center'
  },
  title:{
    textAlign: 'center',
    paddingRight:15,
    color: theme.blue1,
    fontWeight: 'bold'
  }
});

class Toolbar extends Component {
  propTypes: {
    title: PropTypes.string.isRequired,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    leftIconClick: PropTypes.func,
    rightIconClick: PropTypes.func,
  }

  render() {

    const {
      leftIcon,
      rightIcon,
      rightText,
      leftIconClick,
      rightIconClick,
      title
    } = this.props;

    const leftTouchableProps = {};
    if (leftIconClick) {
      leftTouchableProps.onPress = leftIconClick;
    }

    const rightTouchableProps = {};
    if (rightIconClick) {
      rightTouchableProps.onPress = rightIconClick;
    }

    return (
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.button} {...leftTouchableProps}>
          {
            leftIcon
            ? <Icon style={[styles.icon, { fontSize: 22 }]} name={leftIcon} />
            : <View />
          }

        </TouchableOpacity>

        <View style={styles.titleWrap}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <TouchableOpacity style={[styles.button, styles.rightButton]} {...rightTouchableProps}>
          {
            !!rightIcon && <Icon style={[styles.icon, styles.rightIcon]} name={rightIcon} />
          }

          {
            !!rightText && <Text style={styles.text}>{rightText}</Text>
          }

        </TouchableOpacity>
      </View>

    );
  }
}

module.exports = Toolbar;
