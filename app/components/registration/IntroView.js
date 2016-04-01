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
          <ScrollView style={{flex:1, width: null, height: null}}>
            <View style={[styles.container, styles.contentContainer]}>
              <Text style={styles.header}>
                How to Whappu
              </Text>

              <View style={[styles.row, {paddingTop: 30}]}>
                <View style={styles.rowIconContainer}>
                  <Icon name='android-chat' style={[styles.rowIcon, {color: theme.light}]} />
                </View>

                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowTitle}>
                    1. Earn points
                  </Text>
                  <Text style={styles.rowText}>
                    Guild with most Whappu points wins a juicy prize!
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.rowIconContainer}>
                  <Icon name='android-bar' style={[styles.rowIcon, {color: theme.light}]} />
                </View>

                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowTitle}>
                    2. Enjoy sima
                  </Text>
                  <Text style={styles.rowText}>
                    Because otherwise you might get thirsty.
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.rowIconContainer}>
                  <Icon name='trophy' style={[styles.rowIcon, {color: theme.light}]} />
                </View>

                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowTitle}>
                    3. Winner takes it all
                  </Text>
                  <Text style={styles.rowText}>
                    Competition ends at 12:00AM on 1st of May.
                  </Text>

                  <Text style={[styles.rowText, styles.rowSecondaryText]}>
                    Winner will be
                    announced later on the day.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

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
    paddingBottom: 30
  },
  innerContainer: {
    flex: 1,
    paddingTop: IOS ? 15 : 15,
  },
  header: {
    fontWeight: 'bold',
    color: theme.secondary,
    paddingTop: 30,
    paddingLeft: 30,
    fontSize: 28
  },
  imageContainer: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
  },
  row: {
    padding: 20,
    paddingBottom: 25,
    flex: 1,
    flexDirection:'row'
  },
  rowNumberContainer: {
    paddingLeft: 10,
    paddingTop:6,
    borderWidth:2,
    borderColor:theme.secondary,
    borderRadius:25,
    width:50,
    height:50,
    paddingRight: 10,
    top: 2
  },
  rowNumberText: {
    fontSize: 28,
    color: theme.secondary,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold'
  },
  rowIconContainer: {
    width: 50,
    height:50,
    backgroundColor:theme.secondary,
    borderRadius:25,
    marginRight:5,
    marginLeft:10,
    justifyContent:'center'
  },
  rowIcon: {
    textAlign:'center',
    color: theme.white,
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 24,
    top: 3
  },
  rowTextContainer: {
    flex: 1,
    top: 2,
    marginLeft: 20,
  },
  rowTitle:{
    color:theme.secondary,
    fontWeight:'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  rowText: {
    color: '#555',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 16,
    fontWeight: 'normal'
  },
  rowSecondaryText: {
    paddingTop: 8
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
