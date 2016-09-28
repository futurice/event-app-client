import React from 'react';
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

let exportModule;
if (Platform.OS === 'ios') {
  exportModule = TouchableOpacity;
} else {
  exportModule = TouchableNativeFeedback;
}


export default exportModule;
