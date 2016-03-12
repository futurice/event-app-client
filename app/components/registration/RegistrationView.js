'use strict';

import _ from 'lodash';
import React, {
  View,
  Modal,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/common/Button';
import TeamSelector from '../../components/registration/TeamSelector';
import * as RegistrationActions from '../../actions/registration';
import * as TeamActions from '../../actions/team';

const RegistrationView = React.createClass({
  onRegister() {
    this.props.dispatch(RegistrationActions.putUser());
  },
  onChangeName(name) {
    this.props.dispatch(RegistrationActions.updateName(name));
  },
  onSelectTeam(id) {
    this.props.dispatch(TeamActions.selectTeam(id));
  },
  onShowChooseTeam() {
    this.props.dispatch(TeamActions.showChooseTeam());
  },
  render() {
    const currentTeam = _.find(this.props.teams.toJS(), ['id', this.props.selectedTeam]);
    const currentTeamName = currentTeam ? currentTeam.name : 'Not selected';
    return (
      <Modal
        animated={true}
        transparent={false}
        visible={this.props.isRegistrationViewOpen}>
        <View style={[styles.container, styles.modalBackgroundStyle]}>
          <View style={[styles.innerContainer]}>
            <Text>Hi there! Who are you?</Text>
            <TextInput
              style={styles.nameField}
              onChangeText={this.onChangeName}
              value={this.props.name} />
            <TeamSelector
              selectedTeam={currentTeamName}
              teams={this.props.teams}
              isChooseTeamViewOpen={this.props.isChooseTeamViewOpen}
              onShowChooseTeam={this.onShowChooseTeam}
              onSelectTeam={this.onSelectTeam} />
            <Button
              onPress={this.onRegister}
              style={styles.modalButton}
              isDisabled={!this.props.isRegistrationInfoValid}>
              That's-a-me!
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
  modalBackgroundStyle: {
    backgroundColor: '#fff'
  },
  nameField: {
    height: 40,
    margin: 10,
    backgroundColor: 'rgba(20,20,20,0.1)',
    padding: 5
  }
});

const select = store => {
  return {
    isRegistrationViewOpen: store.registration.get('isRegistrationViewOpen'),
    name: store.registration.get('name'),
    selectedTeam: store.team.get('selectedTeam'),
    teams: store.team.get('teams'),
    isChooseTeamViewOpen: store.team.get('isChooseTeamViewOpen'),
    isRegistrationInfoValid: !!store.registration.get('name') && !!store.team.get('selectedTeam')
  };
};

export default connect(select)(RegistrationView);
