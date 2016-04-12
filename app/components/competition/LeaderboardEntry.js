'use strict';

import React, {
  View,
  Text,
  Image,
  Platform,
  PropTypes,
  Dimensions,
  StyleSheet,
  LayoutAnimation
} from 'react-native';
import Immutable from 'immutable';
import theme from '../../style/theme';

import TimerMixin from 'react-timer-mixin';

const LeaderboardEntry = React.createClass({
  mixins: [TimerMixin],
  propTypes: {
    team: PropTypes.instanceOf(Immutable.Map).isRequired,
    topscore: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    logo: PropTypes.string.isRequired
  },
  getOrderSuffix(order) {
    const lastNum = order > 20 ? order % 10 : order;
    switch (lastNum) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  },
  componentWillMount() {
    LayoutAnimation.spring();
  },
  getInitialState() {
    return {
      width: 25
    }
  },
  componentDidMount() {
    // Increase min width if the team has some points, so that if winner has
    // e.g. 40000, the team with 30 points does not have too short bar
    const minWidth = this.props.team.get('score') > 10 ? 46 : 26;

    this.setTimeout(() => {
      LayoutAnimation.spring();
      const percentageToTopscore = (this.props.team.get('score') / this.props.topscore) || 0;
      const barWrapWidth = Dimensions.get('window').width - 110; // 110 other content width
      let barWidth = barWrapWidth * percentageToTopscore;
      barWidth = Math.max(barWidth, minWidth); // minWidth for teams with low points
      this.setState({ width: barWidth });
    }, 1000);
  },

  render() {

    const orderSuffix = this.getOrderSuffix(this.props.position);

    return (
      <View style={styles.entry}>

        <View style={styles.entryLogo}>
          <Image
          source={{ uri: this.props.logo }}
          style={styles.entryLogoImg} />
        </View>

        <View style={styles.entryContent}>
          <View style={styles.entryTitle}>
            <Text style={styles.entryTitleName}>
            {this.props.team.get('name')}
            </Text>

            <View style={styles.entryTitlePosition}>
              <Text style={styles.entryTitlePositionText}>
                {this.props.position}{orderSuffix}
              </Text>
            </View>

          </View>

          <View style={styles.barWrap}>

            <View style={[
              styles.bar,
              {width: this.state.width }
              ]} />

            <Text style={[styles.entryTitleScore, styles.entryTitleScoreOver]}>
            {this.props.team.get('score')}
            </Text>

          </View>
        </View>
        <View style={styles.entryBottomLine} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  entry: {
    paddingTop:Platform.OS === 'ios' ? 30 : 32,
    paddingBottom:Platform.OS === 'ios' ? 30 : 32,
    backgroundColor:'#FFF',
    flexDirection:'row',
    alignItems:'center'
  },
  entryBottomLine:{
    position:'absolute',
    left:20,
    right:20,
    bottom:0,
    height:1,
    backgroundColor:'#f2f2f2',
  },
  entryLogo:{
    paddingLeft:20,
    paddingRight:20,
  },
  entryLogoImg:{
    width:50,
    height:50,
    borderRadius:25,
  },
  entryContent: {
    flex:1,
    justifyContent:'space-between',
    flexDirection:'column',
    paddingRight:20,
  },
  entryTitle: {
    flex:1,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
  },
  entryTitlePosition:{
    flex:1,
  },
  entryTitlePositionText: {
    fontWeight:'normal',
    color:'#bbb',
    fontSize:16,
    flex:1,
    textAlign:'right'
  },
  entryTitleName:{
    fontSize:18,
    fontWeight:'normal',
  },
  entryTitleScore:{
    backgroundColor:'transparent',
    color:'#ccc',
    fontSize:18,
    textAlign:'right',
  },
  entryTitleScoreOver:{
    position:'absolute',
    left:6,
    top:Platform.OS === 'ios' ? 7 : 3,
    fontSize:14,
    fontWeight:'bold',
    color:'#fff',
    textShadowColor:'#873a6d',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 1
  },
  barWrap:{
    backgroundColor:'transparent',
    marginTop:3,
    marginBottom:5,
    overflow:'hidden',
    height:Platform.OS === 'ios' ? 30 : 26,
    flex:1,
  },
  bar:{
    height:Platform.OS === 'ios' ? 30 : 26,
    backgroundColor:theme.secondary,
    position:'absolute',
    borderRadius:3,
    left:0,
    top:0,
    bottom:0,
    width:0
  }
});

export default LeaderboardEntry;
