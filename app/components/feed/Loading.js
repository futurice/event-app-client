import React, {
  ActivityIndicatorIOS,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ProgressBar from 'ProgressBarAndroid';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.stable
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60
  },
  loadMessage: {
    marginTop: 5,
    textAlign: 'center',
    color: 'rgba(0,0,0,.3)'
  }
});

const Loading = props => {
  return (
    <View style={styles.container}>
      {(Platform.OS === 'android') ?
        <ProgressBar styleAttr='Inverse' color={theme.secondary}/>
      :
        <ActivityIndicatorIOS
          color={theme.secondary}
          animating={true}
          style={styles.activityIndicator}
          size='large' />
      }
      <Text style={ styles.loadMessage}>Loading...</Text>
    </View>
  );
};

export default Loading;
