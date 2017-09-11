'use strict';

import React, { PropTypes } from 'react';
import {
  View,
  Image,
  Platform,
  Dimensions,
  StyleSheet,
  LayoutAnimation
} from 'react-native';
import Text from '../Text';
import Immutable from 'immutable';
import theme from '../../style/theme';

import TimerMixin from 'react-timer-mixin';
const IOS = Platform.OS === 'ios';

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
  componentDidMount() {
    // Increase min width if the team has some points, so that if winner has
    // e.g. 40000, the team with 30 points does not have too short bar
    // const minWidth = this.props.team.get('score') > 10 ? 46 : (IOS ? 30 : 27);

    // this.setTimeout(() => {
    //   LayoutAnimation.spring();
    //   const percentageToTopscore = (this.props.team.get('score') / this.props.topscore) || 0;
    //   const barWrapWidth = Dimensions.get('window').width -  120;// other content width
    //   let barWidth = barWrapWidth * percentageToTopscore;
    //   barWidth = Math.max(barWidth, minWidth); // minWidth for teams with low points
    //   this.setState({ width: barWidth });
    // }, 1000);
  },

  render() {
    const { position, last, logo, team } = this.props;
    const orderSuffix = this.getOrderSuffix(position);

    return (
      <View style={[styles.entry, last ? { marginBottom: 48 } : null]}>

        <View style={styles.entryLogo}>
          <Image
            source={{ uri: logo }}
            style={styles.entryLogoImg} />
        </View>

        <View style={styles.entryContent}>
          <View style={styles.entryTitle}>
            <Text style={styles.entryTitleName}>
              {team.get('name')}
            </Text>

            <View style={styles.entryTitlePosition}>
              <Text style={styles.entryTitlePositionText}>
                {position}{orderSuffix}
              </Text>
            </View>
          </View>

          <View style={styles.entryTitleScore}>
            <Text style={[styles.entryTitleScoreText]}>
              {team.get('score')}
            </Text>
          </View>
        </View>
        {!last && <View style={styles.entryBottomLine} />}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  entry: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: theme.transparent,
    flexDirection:'row',
    alignItems:'center'
  },
  entryBottomLine:{
    position:'absolute',
    left: 30,
    right: 30,
    bottom:0,
    height:1,
    backgroundColor: theme.white,
  },
  entryLogo:{
    marginLeft: 28,
    paddingRight: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: theme.secondary,
  },
  entryLogoImg:{
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  entryContent: {
    flex:1,
    justifyContent:'space-between',
    flexDirection:'column',
    paddingRight: 30,
    paddingLeft: 10,
    top: 6,
  },
  entryTitle: {
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
  },
  entryTitlePosition:{
    flex:1,
  },
  entryTitlePositionText: {
    fontWeight:'normal',
    color: theme.pink,
    fontSize:18,
    flex:1,
    textAlign:'right'
  },
  entryTitleName:{
    fontSize:18,
    fontWeight:'normal',
    color: theme.white,
  },
  entryTitleScore:{
    backgroundColor:'transparent',
  },
  entryTitleScoreText:{
    fontSize: 36,
    color: theme.accent,
  },
});

export default LeaderboardEntry;
