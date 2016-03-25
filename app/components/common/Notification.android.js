import React, {
  Component,
  PropTypes,
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

  constructor(props) {
    super(props);
  }

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
      console.log(this.props.children)

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
