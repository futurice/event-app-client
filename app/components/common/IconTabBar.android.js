// Icon and Text Tab bar
// https://www.google.com/design/spec/components/bottom-navigation.html
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  Image,
  View,
  Animated
} = React;

const Icon = require('react-native-vector-icons/MaterialIcons');

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
    elevation: 2,
  },
  textLabel: {
    fontSize: 12,
    top: 2,
  },
  navBarLogo: {
    width: 48,
    height: 48,
  },
  triangle:{
    position: 'absolute',
    top: 5,
    width: 56,
    height: 56,
  },
  triangleBottom: {
    position: 'absolute',
    top: 56,
    width: 56,
    height: 12,
    elevation: 2,
    backgroundColor: 'transparent'
  },
  triangleBottomImage: {
    top:-4,
    width:56,
    height:9,
    left:0
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
    rippleColor : React.PropTypes.string,
  },

  getInitialState() {
    return {
      buttonIconScale: this.props.tabs.map((i) => { return new Animated.Value(1); }),
      buttonText: this.props.tabs.map((i) => { return new Animated.Value(1); }),
    };
  },

  renderTabOption(name, page) {
    const isTabActive = this.props.activeTab === page;
    const activeTextColor = this.props.activeTextColor || 'navy';
    const inactiveTextColor = this.props.inactiveTextColor || 'black';
    const rippleColor = this.props.rippleColor || 'black';

    const AnimatedIcon = Animated.createAnimatedComponent(Icon);
    const iconScale = this.state.buttonIconScale[page];
    const textScale = this.state.buttonText[page];

    if (isTabActive) {
      Animated.timing(iconScale, { toValue: 1.15, duration:250 }).start();
      Animated.timing(textScale, { toValue: 1,  duration:200 }).start();
    } else if (name.logo) {
      Animated.timing(iconScale, { toValue: 1, duration:100 }).start();
    } else {
      iconScale.setValue(1);
      textScale.setValue(0);
    }

    if (name.logo) {
      return (
      <TouchableNativeFeedback
        key={name.title}
        onPress={() => this.props.goToPage(page)}
        background={TouchableNativeFeedback.Ripple(rippleColor, true)}
        delayPressIn={0}
      >
        <View style={[styles.tab, {paddingLeft:5, paddingRight:5}]} >
        <Image
          source={require('../../../assets/logo_triangle.png')}
          style={[styles.triangle, {left:this.props.containerWidth / this.props.tabs.length / 2 - 24}]} />
        <Animated.Image
            source={require('../../../assets/whappu_text.png')}
            style={[styles.navBarLogo,
              {
                top: iconScale.interpolate({inputRange: [1, 1.15], outputRange: [7,6]}),
                transform: [{
                scale: iconScale.interpolate({inputRange: [1, 1.15], outputRange: [1,1.2]})
              }]},
            ]} />
        </View>
      </TouchableNativeFeedback>
      )
    }

    return (
    <TouchableNativeFeedback
      key={name.title}
      onPress={() => this.props.goToPage(page)}
      background={TouchableNativeFeedback.Ripple(rippleColor, true)}
      delayPressIn={0}
    >
      <View style={styles.tab} >
        <AnimatedIcon
        name={name.icon}
        size={21}
        style={
          {transform: [{
            scale: isTabActive ? iconScale : 1
          }],
          color: isTabActive ? activeTextColor : inactiveTextColor
        }
        } />

        {isTabActive ?
          <Animated.Text style={[
            styles.textLabel,
            {
              color: activeTextColor,
              opacity:  textScale,
              transform: [{
                scale:  textScale
              }]
            }
          ]}>
          {name.title}
          </Animated.Text> :
          null
        }
      </View>
    </TouchableNativeFeedback>
    );
  },

  render() {
    var containerWidth = this.props.containerWidth;
    return (
      <View>
        <View style={[styles.triangleBottom,{left:containerWidth / 2 - 28}]}>
          <Image
            source={require('../../../assets/logo_triangle_bottom.png')}
            style={styles.triangleBottomImage} />
        </View>
        <View style={[styles.tabs, {backgroundColor : this.props.backgroundColor || null}, this.props.style]}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
      </View>
      );
  },
});

module.exports = AndroidTabBar;
