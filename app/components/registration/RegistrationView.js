'use strict';

import _ from 'lodash';
import React, {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/common/Button';
import Modal from 'react-native-modalbox';
import Team from "./Team";
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
        isOpen={this.props.isRegistrationViewOpen}
        swipeToClose={false}
        backdropPressToClose={false}>
        <View style={[styles.container, styles.modalBackgroundStyle]}>
          <View style={[styles.innerContainer]}>
            <Text style={styles.header}>Hi there! What's your name?</Text>
            <TextInput
              style={styles.nameField}
              onChangeText={this.onChangeName}
              value={this.props.name} />
            <Text style={styles.header}>...and your kilta?</Text>
            {this.props.teams.map(team =>
              <Team
                key={team.get('id')}
                name={team.get('name')}
                onPress={this.onSelectTeam.bind(null, team.get('id'))} />
            )}
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
  },
  header: {
    fontSize: 20,
    marginBottom: 10
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
