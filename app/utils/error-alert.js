import {
  Alert
} from 'react-native';
import {RESET_ERROR_MESSAGE} from '../actions/errors';

export default function errorAlert(dispatch, message) {
  Alert.alert(
    'Error',
    message,
    [{
      text: 'OK',
      onPress: () => dispatch({type: RESET_ERROR_MESSAGE})
    }]
  );
}
