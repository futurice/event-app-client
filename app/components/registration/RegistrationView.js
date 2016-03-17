'use strict';

import _ from 'lodash';
import React, {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import theme from '../../style/theme';
import Button from '../../components/common/Button';
import Modal from 'react-native-modalbox';
import Team from "./Team";
import Logos from "../../constants/Logos";
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
              <View style={styles.inputLabel}>
                <Text style={styles.inputLabelText}>Hi there! What's your name?</Text>
              </View>
              <View style={styles.inputFieldWrap}>
                <TextInput
                style={[styles.inputField, styles['inputField_'+Platform.OS]]}
                onChangeText={this.onChangeName}
                value={this.props.name} />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <Text style={styles.inputLabelText}>Choose your Kilta</Text>
              </View>
              <View style={[styles.inputFieldWrap, {paddingTop:0,paddingBottom:0}]}>

              <ScrollView style={{flex:1,height:240}}>
              {this.props.teams.map( (team,i) =>
                <Team
                  key={i}
                  name={team.get('name')}
                  teamid={team.get('id')}
                  logo={this.props.logos[team.get('name')]}
                  selected={this.props.selectedTeam}
                  onPress={this.onSelectTeam.bind(null, team.get('id'))} />
              )}
              </ScrollView>
              </View>
            </View>


              <Button
                onPress={this.onRegister}
                style={styles.modalButton}
                isDisabled={!this.props.isRegistrationInfoValid}>
                Save
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
  },
  innerContainer: {
    flex:1,
    paddingTop:Platform.OS === 'ios' ? 20 : 0,
  },
  modalButton: {
    margin: 15,
  },
  modalBackgroundStyle: {
    backgroundColor: '#eee'
  },
  inputGroup:{
    padding:0,
    backgroundColor:'#FFF',
    margin:10,
    marginBottom:0,
    borderRadius:2,
    elevation:1,
  },
  inputLabel:{
    padding:15,
    borderBottomWidth:1,
    borderColor:'#ddd',
  },
  inputLabelText:{
    fontSize:14,
    color:theme.primary,
    fontWeight:'bold',
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
  },
  inputFieldWrap:{
    padding:15,
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
    logos: Logos.killat,
    isRegistrationViewOpen: store.registration.get('isRegistrationViewOpen'),
    name: store.registration.get('name'),
    selectedTeam: store.team.get('selectedTeam'),
    teams: store.team.get('teams'),
    isChooseTeamViewOpen: store.team.get('isChooseTeamViewOpen'),
    isRegistrationInfoValid: !!store.registration.get('name') && !!store.team.get('selectedTeam')
  };
};

export default connect(select)(RegistrationView);
