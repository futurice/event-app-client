import {
  Alert
} from 'react-native';
import {RESET_ERROR_MESSAGE} from '../actions/errors';

export default function errorAlert(dispatch, header, message) {
  Alert.alert(
    header,
    message,
    [{
      text: 'OK',
      onPress: () => dispatch({type: RESET_ERROR_MESSAGE})
    }]
  );
}
