'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  ScrollView
} from 'react-native';
import theme from '../../style/theme';
import Toolbar from './RegistrationToolbar';
import Button from '../../components/common/Button';
const Icon = require('react-native-vector-icons/Ionicons');

const IOS = Platform.OS === 'ios';

const IntroView = React.createClass({
  render() {
    return (
      <View style={[styles.container, styles.modalBackgroundStyle]}>
        <Toolbar icon='' iconClick={() => null} title='Introduction' />

        <Image
          style={styles.imageContainer}
          source={{uri: 'https://storage.googleapis.com/wappuapp/assets/intro-background.jpg'}}
        >
          <ScrollView style={{flex:1, width: null, height: null}}>
            <View style={styles.container}>

              <View style={styles.row}>
                <View style={styles.rowIconContainer}>
                  <Icon name='android-chat' style={[styles.rowIcon, {color: theme.secondary}]} />
                </View>

                <View style={styles.rowNumberContainer}>
                  <Text style={styles.rowNumberText}>1.</Text>
                </View>

                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowText}>
                    Be active in Whappu Buzz
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.rowIconContainer}>
                  <Icon name='beer' style={[styles.rowIcon, {color: theme.primary}]} />
                </View>

                <View style={styles.rowNumberContainer}>
                  <Text style={styles.rowNumberText}>2.</Text>
                </View>

                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowText}>
                    Enjoy sima
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.rowIconContainer}>
                  <Icon name='trophy' style={[styles.rowIcon, {color: '#FFCC03'}]} />
                </View>

                <View style={styles.rowNumberContainer}>
                  <Text style={styles.rowNumberText}>3.</Text>
                </View>

                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowText}>
                    Guild with most Whappu points wins a juicy prize
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </Image>

        <View style={styles.bottomButtons}>
          <Button
            onPress={this.props.onDismiss}
            style={styles.modalButton}
          >
            Got it
          </Button>
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50
  },
  innerContainer: {
    flex: 1,
    paddingTop: IOS ? 15 : 15,
  },
  imageContainer: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
  },
  row: {
    paddingTop: 60,
    padding: 20,
    flex: 1,
    flexDirection:'row',
    height: 100
  },
  rowNumberContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    top: 2
  },
  rowNumberText: {
    fontSize: 28,
    color: theme.white,
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold'
  },
  rowIconContainer: {
    width: 60
  },
  rowIcon: {
    paddingLeft: 10,
    color: theme.white,
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 44,
    top: 3
  },
  rowTextContainer: {
    flex: 1,
    top: 6
  },
  rowText: {
    color: theme.white,
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 16,
    fontWeight: 'bold'
  },
  bottomButtons:{
    flex:1,
    flexDirection:'row',
    margin:0,
    marginBottom:0,
    marginLeft:0,
    marginRight:0,
    height:50,
    alignItems:'stretch',
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
  },
  modalButton: {
    borderRadius:0,
    flex:1,
    marginLeft:0,
  }
});

export default IntroView;
