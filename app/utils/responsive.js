// Helpers for styles
import  { Dimensions, Platform } from 'react-native';
const { height, width } = Dimensions.get('window');


export const IS_IOS = Platform.OS === 'ios';
export const SCREEN_SMALL = width <= 320;
