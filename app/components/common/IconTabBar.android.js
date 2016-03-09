'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Animated,
} = React;

var Icon = require('react-native-vector-icons/Ionicons');


var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:0,
  },

  tabs: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0,
    elevation:2,
  },
});

var DefaultTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    underlineColor : React.PropTypes.string,
    backgroundColor : React.PropTypes.string,
    activeTextColor : React.PropTypes.string,
    inactiveTextColor : React.PropTypes.string,
    rippleColor : React.PropTypes.string,
  },

  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;
    var activeTextColor = this.props.activeTextColor || "navy";
    var inactiveTextColor = this.props.inactiveTextColor || "black";
    var rippleColor = this.props.rippleColor || "black";
    return (
      <TouchableNativeFeedback key={name} onPress={() => this.props.goToPage(page)} 
        background={TouchableNativeFeedback.Ripple(rippleColor, false)}
        delayPressIn={0}
      >
        <View style={[styles.tab]} >
          <Icon name={name} size={22} style={{color: isTabActive ? activeTextColor : inactiveTextColor}}> </Icon>
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

    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0,  containerWidth / numberOfTabs]
    });

    return (
      <View style={[styles.tabs, {backgroundColor : this.props.backgroundColor || null}, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        <Animated.View style={[tabUnderlineStyle, {left: left} ]} />
      </View>
    );
  },
});

module.exports = DefaultTabBar;