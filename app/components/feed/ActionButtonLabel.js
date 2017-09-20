
import React from 'react';
import { Animated, View, Platform, StyleSheet } from 'react-native';
import Text from '../Text';
import theme from '../../style/theme';
const IOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  label:{
    flexDirection: 'row',
    position: 'absolute',
    padding: 6,
    paddingLeft: IOS ? 11 : 6,
    paddingRight: IOS ? 11 : 6,
    top: 16,
    height: IOS ? 26 : 27,
    backgroundColor: '#FFF',
    elevation:2,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0
    },
    borderRadius: IOS ? 30 : 3,
    right: 60
  },
  labelText:{
    fontSize: 11,
    lineHeight: 15,
    color: theme.secondary,
    backgroundColor: 'transparent'
  },
  additionalLabelText:{
    color: theme.pink,
    marginLeft: 5,
    fontSize: 11,
    lineHeight: 15,
    backgroundColor: 'transparent'
  }
});

const ActionButtonLabel = React.createClass({
  render() {
    const combinedStyle = [styles.label];
    const { extraStyle, children, additionalLabel } = this.props;

    if (extraStyle) {
      combinedStyle.push(extraStyle);
    }

    return (
      <Animated.View style={combinedStyle}>
        <Text style={styles.labelText}>{children}</Text>
        <Text style={styles.additionalLabelText}>{additionalLabel}p</Text>
      </Animated.View>

    );
  }
});

export default ActionButtonLabel;
