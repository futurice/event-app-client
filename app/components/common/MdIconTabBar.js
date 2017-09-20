// Icon and Text Tab bar
// https://www.google.com/design/spec/components/bottom-navigation.html
'use strict';

import React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import ICONS from '../../constants/Icons';
import theme from '../../style/theme';
// import TouchableNativeFeedback from './PlatformTouchable';

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0,
  },
  tabs: {
    elevation: 4,
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0,
    borderTopWidth: 0,
  },
  textLabel: {
    fontSize: 11,
    fontWeight: '100',
    textAlign:'center',
    marginTop: 2,
    left:0,
    right:0,
    bottom: 0
  }
});


var MdIconTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    backgroundColor : React.PropTypes.string,
    activeTextColor : React.PropTypes.string,
    inactiveTextColor : React.PropTypes.string,
  },

  getInitialState() {
    return {
      buttonAnimations: this.props.tabs.map(() => new Animated.Value(1))
    };
  },

  componentWillReceiveProps(nextProps) {
    const { buttonAnimations } = this.state;
    if (nextProps.activeTab !== this.props.activeTab) {
      buttonAnimations.map(b => b.setValue(0));
      Animated.timing(buttonAnimations[nextProps.activeTab], { duration: 330, easing: Easing.ease, toValue: 1}).start();
    }
  },

  renderImage(iconId, isTabActive, activeTextColor, inactiveTextColor) {
    const icon = ICONS[iconId];

    return (
      <Image
        style={{
          width: 28,
          height: 28,
          tintColor: isTabActive ? activeTextColor : inactiveTextColor
        }}
        source={icon}
      />
    );

  },

  renderTabOption(item, page) {
    const isTabActive = this.props.activeTab === page;
    const activeTextColor = this.props.activeTextColor || 'black';
    const inactiveTextColor = this.props.inactiveTextColor || 'black';

    return (
    <TouchableNativeFeedback
      key={item.image}
      onPress={() => this.props.goToPage(page)}
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      // background={TouchableNativeFeedback.SelectableBackground()}
      delayPressIn={1}

    >
      <View style={[styles.tab, { paddingLeft: isTabActive ? 0 : 0, paddingRight: isTabActive ? 0 : 0 }]}>
        {this.renderImage(item.image, isTabActive, activeTextColor, inactiveTextColor)}

        {/*item.titlex && isTabActive &&
          <Animated.Text style={[
            styles.textLabel,
            {
              color: activeTextColor,
              opacity: isTabActive ? buttonAnimation : 1,
              transform: [{
                scale: isTabActive ? buttonAnimation : 0
              }]
            }
          ]}>
          {item.title}
          </Animated.Text>
        */}

      </View>
    </TouchableNativeFeedback>
    );
  },

  render() {
    const { tabs, backgroundColor, style } = this.props;

    return (
      <View>
        <View style={[styles.tabs, { backgroundColor: backgroundColor || null }, style]}>
          {tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
      </View>
      );
  },
});

module.exports = MdIconTabBar;
