import React, { Component, PropTypes } from 'react';
import {
  View,
  ToastAndroid,
} from 'react-native';

class Notification extends Component {
  static propTypes = {
    children: PropTypes.node,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    visible: true,
  };

  componentDidMount() {
    if (this.props.visible) {
      this._show()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && !this.props.visible && nextProps.children !== '') {
      this._show();
    } else {
      if (!nextProps.visible && this.props.visible) {
        this._hide();
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      return true;
    }
    return false;
  }

  _show() {
    setTimeout(() => {
     // TODO If RN updated
     // ToastAndroid.showWithGravity(this.props.children, ToastAndroid.LONG, ToastAndroid.TOP)
      ToastAndroid.show(this.props.children, ToastAndroid.LONG)
    }, 300)
  }

  _hide() {
    // hidden
  }

  render() {
    return (
      <View />
    );
  }
}

export default Notification;
