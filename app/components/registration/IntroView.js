'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  Animated,
  Easing
} from 'react-native';
import theme from '../../style/theme';
import Toolbar from './RegistrationToolbar';
import Button from '../../components/common/Button';
const Icon = require('react-native-vector-icons/Ionicons');
const MDIcon = require('react-native-vector-icons/MaterialIcons');
const {height, width} = Dimensions.get('window');
const IOS = Platform.OS === 'ios';

const IntroView = React.createClass({

  getInitialState() {
    return {
      heroPosition: new Animated.Value(-300)
    }
  },

  animateHero() {
    Animated.spring(
      this.state.heroPosition,
      { toValue: 0, friction: 5 }
      ).start();
  },

  render() {
    setTimeout(() => {
      this.animateHero();
    }, 900);

    return (
      <View style={[styles.container, styles.modalBackgroundStyle]}>
          {/* <Toolbar icon='' iconClick={() => null} title='Introduction' /> */ }
          <ScrollView style={{flex:1, width: null, height: null}}>
            <View style={[styles.container, styles.contentContainer]}>

              <Animated.View style={[
                {flex: 1, alignItems: 'center', marginTop: IOS ? 50 : 30 },
                { transform: [{ translateY: this.state.heroPosition }] }
              ]}>

                <View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 200, height: 200, borderRadius: 100}} />
                <MDIcon name="sms" style={{backgroundColor: 'transparent', color:theme.accentLight, fontSize: 50, position:'absolute', top:10, left: width / 2 - 70}}/>
                <MDIcon name="sms" style={{transform: [{scaleX: -1}], backgroundColor: 'transparent', color:theme.accentLight, fontSize: 70, position:'absolute', top:55, left: width / 2 + 10}}/>
                <MDIcon name="photo-camera" style={{backgroundColor: 'transparent', color:theme.accentLight, fontSize: 90, position:'absolute', top:105, left: width / 2 - 80}}/>
              </Animated.View>

              <View style={styles.rowTextContainer}>
                  <Text style={styles.rowTitle}>
                   FUTUPARTY 2016
                  </Text>
                  <Text style={styles.rowText}>
                    Event Timing: October 7th 2016, 18:00-01:30
                  </Text>

                  <Text style={styles.rowText}>
                    Venue: Heureka, Kuninkaalantie 7, Vantaa!
                  </Text>
              </View>

            <View style={styles.bottomButtons}>
              <Button
                onPress={this.props.onDismiss}
                style={styles.modalButton}
              >
                Start by creating a profile
              </Button>
            </View>

            </View>
          </ScrollView>


      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30
  },
  modalBackgroundStyle: {
    backgroundColor: theme.secondary
  },
  innerContainer: {
    flex: 1,
    paddingTop: IOS ? 15 : 15,
  },
  header: {
    fontWeight: 'bold',
    color: theme.secondary,
    marginTop: 40,
    marginBottom: 20,
    marginLeft: IOS ? 25 : 15,
    fontSize: 28
  },
  row: {
    padding: 20,
    paddingLeft:15,
    paddingBottom: 25,
    flex: 1,
    flexDirection: 'row'
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
    fontSize: 24
  },
  rowTextContainer: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
    marginTop: 40
  },
  rowTitle:{
    color: theme.light,
    fontWeight: '900',
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 10,
  },
  rowText: {
    color: 'rgba(255,255,255,.75)',
    fontSize: 16,
    marginTop:15,
    fontWeight: 'normal',
    textAlign: 'center'
  },
  rowSecondaryText: {
    marginTop: 8
  },
  bottomButtons:{
    marginTop: 40,
    margin:30,
    height:50,
    position:'relative',
  },
  modalButton: {
    flex:1,
    marginLeft:0
  }
});

export default IntroView;
