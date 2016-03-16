'use strict';

import React, {
  Animated,
  Easing,
  View,
  Modal,
  Text,
  TextInput,
  Dimensions,
  StyleSheet
} from 'react-native';
import theme from '../../style/theme';

const LeaderboardEntry = React.createClass({

  getInitialState: function() {
    return {
      growBar: new Animated.Value(0)
    }
  },
  render() {

    const percentageToTopscore = (this.props.team.get('score') / this.props.topscore)  || 0;
    const barWrapWidth = (Dimensions.get('window').width - 40); // 40px total padding left+right
    const barWidth = barWrapWidth * percentageToTopscore;

    Animated.spring(
      this.state.growBar,
      {
       toValue: barWidth,
       friction: 10,
       duration:700
     },
     ).start()

    return (
      <View style={styles.entry}>
        <View style={styles.entryTitle}>
          <Text style={styles.entryTitleName}>
            {this.props.position}. {this.props.team.get('name')}
          </Text>
          <Text style={styles.entryTitleScore}>
            {this.props.team.get('score')}
          </Text>
        </View>
        <View style={styles.barWrap}>
          <Animated.View style={[
            styles.bar,
            {width: this.state.growBar.interpolate({ inputRange: [0, 1], outputRange: [0,1] }) }
          ]} />
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  entry: {
    marginBottom: 0,
    padding:20
  },
  entryTitle:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'stretch',
  },
  entryTitleName:{
    fontWeight:'bold',
  },
  entryTitleScore:{
    color:theme.secondary,
    textAlign:'right',
  },
  barWrap:{
    backgroundColor:'#ddd',
    height:8,
    borderRadius:6,
    margin:3,
    marginLeft:0,
    marginRight:0,
  },
  bar:{
    height:8,
    backgroundColor:theme.secondary,
    position:'absolute',
    borderRadius:6,
    left:0,
    top:0,
    bottom:0,
    width:0,
  }
});

export default LeaderboardEntry;
