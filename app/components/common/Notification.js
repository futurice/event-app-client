import React, {
  Component,
  PropTypes,
  Text,
  Easing,
  Animated,
  Dimensions,
  StyleSheet,
  View
} from 'react-native';

import theme from '../../style/theme';
const Screen = Dimensions.get('window');

class Notification extends Component {
  static propTypes = {
    children: PropTypes.node,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    visible: true,
  };

  constructor(props) {
    super(props);

    this.state = {
        translate: new Animated.ValueXY(),
        height: 0
    };
  }

  componentDidMount() {
    if (this.props.visible) {
      this.fadeIn();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && !this.props.visible) {
      this.fadeIn();
    } else {
      if (!nextProps.visible && this.props.visible) {
        this.fadeOut();
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    // TODO: Compare the messages with each other
    /* if (this.props.message !== nextProps.message) {
      return true;
    }*/

    if (this.props.visible !== nextProps.visible) {
      return true;
    }

    return false;
  }

  static fadeTime = 500;
  static minOpacity = 0.0;
  static maxOpacity = 0.9;

  static styles = {
    container: {
      position: 'absolute',
      top: -100,
      width: Screen.width,
      left: 0,
      right: 0,
      backgroundColor: theme.primary,
      alignItems: 'center',
      paddingTop: 18,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 18,
      borderBottomColor: theme.primaryDark,
      borderBottomWidth: 0
    },
    message: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  };

  fadeIn() {
      console.log("fadein height:" + this.state.height);
    Animated.timing(this.state.translate, {
        duration: 300,
        easing: Easing.linear,
        toValue: {x:0, y:0}
    }).start();
  }

  fadeOut() {

    Animated.timing(this.state.translate, {
        duration: 300,
        easing: Easing.linear,
        toValue: {x:0, y:-this.state.height}
    }).start();
  }

  getViewSize(e) {
      console.log("height:" + e.nativeEvent.layout.height);

      if(this.state.height == 0) {
        this.state.translate.setValue({x:0, y: - e.nativeEvent.layout.height});
      }
      this.state.height = e.nativeEvent.layout.height;
  }

  render() {
    const message = this.props.children;
    console.log("render height:" + this.state.height);
    return (
        <View style={{position:'absolute', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0)', width: Screen.width, height: 400}}  pointerEvents={'box-none'}>
      <Animated.View onLayout={this.getViewSize.bind(this)} style={[Notification.styles.container,{top: (this.state.height === 0) ? -100 : 0}, {transform:this.state.translate.getTranslateTransform()}]}>
        <Text style={Notification.styles.message}>{message}</Text>
      </Animated.View>
      </View>
    );
  }
}

export default Notification;
