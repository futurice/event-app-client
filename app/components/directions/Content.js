import React, { Component } from 'react';
import { View, Animated } from 'react-native';

class ContentAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = { contentAnimation: new Animated.Value(0) };
  }

  componentDidMount() {
    setTimeout(() => {
      Animated.spring(this.state.contentAnimation, { toValue:1, duration: 550 }).start();
    }, 200);
  }

  render() {
    const { children } = this.props;
    const { contentAnimation } = this.state;

    const contentAnimationStyles = {
      opacity: contentAnimation,
      transform:[
        { translateX: contentAnimation.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) },
        // { scale: contentAnimation.interpolate({ inputRange: [0, 1], outputRange: [1.01, 1] }) }
      ]
    };

    return (
      <Animated.View style={contentAnimationStyles}>
        {children}
      </Animated.View>
    );
  }
};



export default ContentAnimation;
