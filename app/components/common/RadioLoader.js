import React, {
  ActivityIndicatorIOS,
  Platform,
  StyleSheet
} from 'react-native';
import ProgressBar from 'ProgressBarAndroid';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60
  },
  loadMessage: {
    textAlign:'center',
    color:'#999'
  }
});

const Loader = props => {
  if (Platform.OS === 'android') {
    return <ProgressBar styleAttr='Large' color={theme.accent}/>
  }

  return <ActivityIndicatorIOS
    color={theme.accent}
    animating={true}
    style={styles.activityIndicator}
    size='large' />;
};

export default Loader;
