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
    backgroundColor: theme.light
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 8
  }
});

const Loading = props => {
  return (
    <View style={styles.container}>
      {(Platform.OS === 'android') ?
        <ProgressBar styleAttr='Inverse' color={theme.primary}/>
      :
        <ActivityIndicatorIOS
          color={theme.primary}
          animating={true}
          style={styles.activityIndicator}
          size='large' />
      }
      <Text>Downloading the latest awesomeness...</Text>
    </View>
  );
};

export default Loading;
