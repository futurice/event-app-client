import { Platform } from 'react-native';
import {
  Analytics,
  Hits as GAHits
} from 'react-native-google-analytics';
import DeviceInfo from 'react-native-device-info';
import {version as VERSION_NUMBER} from '../../package.json';

const GA_TRACKING_ID = 'UA-41493366-6';
const APP_NAME = 'Wappuapp';
const CLIENT_ID = DeviceInfo.getUniqueID();
const INSTALLER_ID = 'futu.tammerforce.wappuapp.' + Platform.OS;

var ga = new Analytics(GA_TRACKING_ID, CLIENT_ID, 1, DeviceInfo.getUserAgent());

function viewOpened(viewName) {
  var screenView = new GAHits.ScreenView(APP_NAME, viewName, VERSION_NUMBER, INSTALLER_ID);
  ga.send(screenView);
}

export default {
  viewOpened
}
