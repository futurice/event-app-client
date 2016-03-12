'use strict';

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

const RegistrationView = React.createClass({
  onRegister() {
    this.props.dispatch(RegistrationActions.createUser());
  },
  onChangeName(name) {
    this.props.dispatch(RegistrationActions.updateName(name));
  },
  onSelectTeam(id) {
    this.props.dispatch(TeamActions.selectTeam(team));
  },
  render() {
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
              selectedTeam={this.props.selectedTeam}
              teams={this.props.teams}
              onSelectTeam={this.onSelectTeam} />
            <Button
              onPress={this.onRegister}
              style={styles.modalButton}>
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
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderColor: 'gray',
    borderWidth: 1
  }
});

const select = store => {
  return {
    isRegistrationViewOpen: store.registration.get('isRegistrationViewOpen'),
    name: store.registration.get('name'),
    selectedTeam: store.team.get('selectedTeam'),
    teams: store.team.get('teams')
  };
};

export default connect(select)(RegistrationView);
