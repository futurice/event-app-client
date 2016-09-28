// Icon and Text Tab bar
// https://www.google.com/design/spec/components/bottom-navigation.html
'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Animated,
  Image
} from 'react-native';

import _ from 'lodash';
import ICONS from '../../constants/Icons';
const Icon = require('react-native-vector-icons/MaterialIcons');
const HEART_ICON = require('../../../assets/icons/heart.png')

var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:0
  },
  tabs: {
    elevation:3,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0,
  },
  textLabel: {
    fontSize: 11,
    textAlign:'center',
    position:'absolute',
    left:0,
    right:0,
    bottom: 7,
  }
});


var AndroidTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    backgroundColor : React.PropTypes.string,
    activeTextColor : React.PropTypes.string,
    inactiveTextColor : React.PropTypes.string,
  },



  renderImage(iconId, isTabActive, activeTextColor, inactiveTextColor) {
    const icon = ICONS[iconId] ? ICONS[iconId] : HEART_ICON;

    return (
      <Image
        style={{
          width: 24,
          height: 24,
          tintColor: isTabActive ? activeTextColor : inactiveTextColor
        }}
        source={icon}
      />
    );

  },

  renderIcon(numberOfTabs, isTabActive, activeTextColor, inactiveTextColor, outPutArray, item) {
    const AnimatedIcon = Animated.createAnimatedComponent(Icon);
    const textScale = this.props.scrollValue.interpolate({  inputRange: _.range(numberOfTabs), outputRange: outPutArray});
    const iconTop = textScale.interpolate({ inputRange: [0, 1], outputRange: [0, -6] });

    return (
      <View>
      <AnimatedIcon
        name={item.icon}
        size={23}
        style={{
          // top: isTabActive ? iconTop : 0,
          color: isTabActive ? activeTextColor : inactiveTextColor
        }}
      />

      {this.renderText(item.title, isTabActive, textScale, activeTextColor) }
      </View>
    )
  },

  renderText(title, isTabActive, textScale, activeTextColor) {
    if (title && isTabActive) {
      return (
        <Animated.Text style={[
          styles.textLabel,
          {
            color: activeTextColor,
            opacity: isTabActive ? textScale : 0,
            transform: [{
              scale: isTabActive ? textScale : 0
            }]
          }
          ]}>
          {item.title}
          </Animated.Text>
        )
    }


  },


  renderTabOption(item, page) {
    const isTabActive = this.props.activeTab === page;
    const activeTextColor = this.props.activeTextColor || 'navy';
    const inactiveTextColor = this.props.inactiveTextColor || 'black';

    // const AnimatedIcon = Animated.createAnimatedComponent(Icon);

    const numberOfTabs = this.props.tabs.length;
    const outPutArray = _.times(numberOfTabs, () => 0);
    outPutArray[page] = 1; // -> eg. [0,1,0,0,0]

    // const textScale = this.props.scrollValue.interpolate({  inputRange: _.range(numberOfTabs), outputRange: outPutArray});
    // const iconTop = textScale.interpolate({ inputRange: [0, 1], outputRange: [0, -6] });


    return (
    <TouchableNativeFeedback
      key={item.title}
      onPress={() => this.props.goToPage(page)}
      background={TouchableNativeFeedback.SelectableBackground()}
      delayPressIn={0}
    >
      <View style={styles.tab} >
        {
          item.image ?
          this.renderImage(item.image, isTabActive, activeTextColor, inactiveTextColor) :
          this.renderIcon(numberOfTabs, isTabActive, activeTextColor, inactiveTextColor, outPutArray, item)
        }


        {/*
        <AnimatedIcon
        name={item.icon}
        size={22}
        style={{
          // top: isTabActive ? iconTop : 0,
          color: isTabActive ? activeTextColor : inactiveTextColor
        }}/>

        {item.title && isTabActive &&
          <Animated.Text style={[
            styles.textLabel,
            {
              color: activeTextColor,
              opacity: isTabActive ? textScale : 0,
              transform: [{
                scale: isTabActive ? textScale : 0
              }]
            }
          ]}>
          {item.title}
          </Animated.Text>
        }
        */}
      </View>
    </TouchableNativeFeedback>
    );
  },

  render() {

    var containerWidth = this.props.containerWidth;
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 3,
      backgroundColor: this.props.underlineColor || "navy",
      bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0,  containerWidth / numberOfTabs]
    });

    // Elastic width underline
    // Between tabs underline width is wider
    const BORDER_ELASTICITY = 1.35;
    const widthValues = _.range((numberOfTabs * 2 - 1));
    const width = this.props.scrollValue.interpolate({
      inputRange:  _.map(widthValues, i => i * 0.5), // [0, 0.5, 1, 1.5, 2...]
      outputRange: _.map(widthValues, (item, i) => i % 2 === 0 ?
        containerWidth / numberOfTabs :
        containerWidth / numberOfTabs * BORDER_ELASTICITY
      )
    });

    return (
      <View>
        <View style={[styles.tabs, {backgroundColor : this.props.backgroundColor || null}, this.props.style]}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
          <Animated.View style={[tabUnderlineStyle, {left: left, width: width} ]} />
        </View>
      </View>
      );
  },
});

module.exports = AndroidTabBar;
