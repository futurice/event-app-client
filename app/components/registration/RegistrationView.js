'use strict';

import _ from 'lodash';
import React, {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Picker,
} from 'react-native';
import { connect } from 'react-redux';
import theme from '../../style/theme';
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

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Hi there! What's your name?</Text>
              <TextInput
              style={[styles.inputField, styles['inputField_'+Platform.OS]]}
              onChangeText={this.onChangeName}
              value={this.props.name} />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Choose your Kilta</Text>
              {this.props.teams.map(team =>
                <Team
                  key={team.get('id')}
                  name={team.get('name')}
                  onPress={this.onSelectTeam.bind(null, team.get('id'))} />
              )}
            </View>

            <View style={styles.inputGroup}>
              <Button
                onPress={this.onRegister}
                style={styles.modalButton}
                isDisabled={!this.props.isRegistrationInfoValid}>
                Save
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex:1,
    paddingTop:20,
  },
  modalButton: {
    marginTop: 10,
  },
  modalBackgroundStyle: {
    backgroundColor: '#fff'
  },
  inputGroup:{
    padding:20,
  },
  inputLabel:{
    fontSize:14,
    fontWeight:'bold',
    color:theme.primary,
    padding:5,
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
  },
  inputField: {
    height: 40,
    fontSize:18,
  },
  inputField_android:{

  },
  inputField_ios: {
    padding:5,
    backgroundColor: 'rgba(20,20,20,0.05)',
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
