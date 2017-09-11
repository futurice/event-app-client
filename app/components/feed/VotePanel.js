import React, { Component } from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';

import PlatformTouchable from '../common/PlatformTouchable';
import Text from '../Text';
import theme from '../../style/theme';
import ICONS from '../../constants/Icons';

const IOS = Platform.OS === 'ios';

class VotePanel extends Component {
  constructor(props) {
    super(props);

    this.getVotes = this.getVotes.bind(this);
    this.voteThisItem = this.voteThisItem.bind(this);
  }

  getVotes() {
    const { voteCount } = this.props.item;
    const votes = parseInt(voteCount, 10);
    return votes > 0 ? votes : '0';
  }

  voteThisItem(vote) {

    const { id } = this.props.item;

    if (this.props.isRegistrationInfoValid === false) {
      this.props.openRegistrationView();
    } else {
      this.props.voteFeedItem(id, vote);
    }
  }

  renderVoteButton(positive) {
    const { userVote } = this.props.item;

    // const value = positive ? 1 : -1;
    // const iconName = positive ? 'keyboard-arrow-up' : 'keyboard-arrow-down';
    // const alreadyVotedThis = userVote === value;

    const value = userVote && userVote > 0 ? false : true;
    const alreadyVotedThis = !!userVote;

    return (
      <View style={styles.itemVoteButtonWrap}>
        <PlatformTouchable
          style={styles.itemVoteButton}
          onPress={() => this.voteThisItem(value)}>
            <View style={styles.itemVoteButton}>
              <Image
                source={alreadyVotedThis ? ICONS.LIKE_ON : ICONS.LIKE_OFF}
                style={styles.voteImage}
              />
              <Text style={styles.itemVoteValue}>{this.getVotes()}</Text>
            </View>
        </PlatformTouchable>
      </View>
    );
  }

  render() {

    return (
      <View style={styles.itemVoteWrapper}>
        {this.renderVoteButton(true)}
      </View>
    );
  }
};


const styles = StyleSheet.create({
  itemVoteWrapper: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingLeft: 0,
    marginLeft: 8,
    minWidth: 45,
    minHeight: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemVoteButtonWrap: {
    flex: 1,
    minWidth: 28,
    height: 28,
    top: 1,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemVoteButton: {
    flex: 1,
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 0,
  },
  itemVoteValue: {
    minWidth: 15,
    textAlign: 'left',
    fontSize: 17,
    top: IOS ? 2 : 0,
    paddingVertical: 3,
    marginLeft: 3,
    color: theme.pink
  },
  voteImage: {
    height: 22,
    width: 22,
  }
});


export default VotePanel;
