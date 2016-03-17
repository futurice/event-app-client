'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import { ImagePickerManager } from 'NativeModules';

import analytics from '../services/analytics';
import Notification from '../components/common/Notification';
import Button from '../components/common/Button';
import TextActionView from '../components/actions/TextActionView';
import LeaderboardEntry from '../components/competition/LeaderboardEntry';
import RegistrationView from '../components/registration/RegistrationView';
import ActionTypes from '../constants/ActionTypes';
import ImageCaptureOptions from '../constants/ImageCaptureOptions';
import * as CompetitionActions from '../actions/competition';
import * as RegistrationActions from '../actions/registration';

const VIEW_NAME = 'CompetitionView';


const CompetitionView = React.createClass({
  componentDidMount() {
    analytics.viewOpened(VIEW_NAME);
  },

  chooseImage() {
    ImagePickerManager.showImagePicker(ImageCaptureOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const image = 'data:image/jpeg;base64,' + response.data;
        this.props.dispatch(CompetitionActions.postImage(image));
      }
    });
  },

  sendText() {
    this.props.dispatch(CompetitionActions.openTextActionView());
  },

  sendBasicAction(type) {
    this.props.dispatch(CompetitionActions.postAction(type));
  },

  onPressAction(type) {
    switch (type) {
      case 'IMAGE':
        return this.chooseImage();
      case 'TEXT':
        return this.sendText();
      default:
        return this.sendBasicAction(type);
    }
  },

  render() {
    let topscore = 0
    this.props.teams.map((team) => {
        topscore = team.get('score') > topscore ? team.get('score') : topscore;
    });


    return (
      <View style={styles.container}>
        <View style={styles.leaderboard}>
          {this.props.teams.map((team, index) =>
            <LeaderboardEntry key={team.get('id')} topscore={topscore} team={team} position={index + 1} />
          )}
        </View>
        <View style={styles.actions}>
          {this.props.actionTypes.map(actionType =>
            <Button
              key={actionType.get('id')}
              style={styles.btn}
              onPress={this.onPressAction.bind(null, actionType.get('code'))}>
              {actionType.get('name')}
            </Button>
          )}
        </View>
        <TextActionView />
        
        <Notification visible={this.props.isNotificationVisible}>{this.props.notificationText}</Notification>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  btn: {
    margin: 5
  },
  leaderboard: {
    flex: 0.5
  },
  actions: {
    flex: 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10
  }
});

const select = store => {
  return {
    isRegistrationViewOpen: store.registration.get('isRegistrationViewOpen'),
    name: store.registration.get('name'),
    teams: store.team.get('teams'),
    isNotificationVisible: store.competition.get('isNotificationVisible'),
    notificationText: store.competition.get('notificationText'),
    actionTypes: store.competition.get('actionTypes')
  };
};

export default connect(select)(CompetitionView);
