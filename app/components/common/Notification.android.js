import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
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
      this._show(this.props)
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.visible && !this.props.visible && nextProps.children !== '') {
      this._show(nextProps);
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

  _show(props) {
    const { children } = props;
    setTimeout(() => {
      ToastAndroid.showWithGravity(children || '✔', ToastAndroid.LONG, ToastAndroid.CENTER);
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
