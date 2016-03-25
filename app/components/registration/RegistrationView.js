'use strict';

import React, {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  PropTypes,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import theme from '../../style/theme';
import Button from '../../components/common/Button';
import Modal from 'react-native-modalbox';
import Team from './Team';
import * as RegistrationActions from '../../actions/registration';
import * as TeamActions from '../../actions/team';
import * as keyboard from '../../utils/keyboard';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IOS = Platform.OS === 'ios';

const RegistrationView = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    teams: PropTypes.instanceOf(Immutable.List).isRequired,
    selectedTeam: PropTypes.number.isRequired,
    isRegistrationViewOpen: PropTypes.bool.isRequired,
    isRegistrationInfoValid: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  onRegister() {
    this.props.dispatch(RegistrationActions.putUser());
  },
  onChangeName(name) {
    this.props.dispatch(RegistrationActions.updateName(name));
  },
  onSelectTeam(id) {
    this.props.dispatch(RegistrationActions.selectTeam(id));
  },
  onGenerateName() {
    this.props.dispatch(RegistrationActions.generateName());
  },
  onShowChooseTeam() {
    this.props.dispatch(TeamActions.showChooseTeam());
  },
  onCancel() {
    this.props.dispatch(RegistrationActions.closeRegistrationView());
  },
  render() {
    return (
      <Modal
        isOpen={this.props.isRegistrationViewOpen}
        swipeToClose={false}
        backdropPressToClose={false}>
        <View style={[styles.container, styles.modalBackgroundStyle]}>
          <ScrollView ref={view => this.containerScrollViewRef = view} style={{flex:1}}>
          <View style={[styles.innerContainer]}>
            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <Text style={styles.inputLabelText}>Choose your Guild</Text>
              </View>
              <View style={[styles.inputFieldWrap, {paddingTop:0,paddingBottom:0}]}>

              <ScrollView style={{flex:1,height:240}}>
              {this.props.teams.map((team,i) =>
                <Team
                  key={i}
                  name={team.get('name')}
                  teamid={team.get('id')}
                  logo={team.get('imagePath')}
                  selected={this.props.selectedTeam}
                  onPress={this.onSelectTeam.bind(null, team.get('id'))} />
              )}
              </ScrollView>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <Text style={styles.inputLabelText}>{`Hi there! What's your wappu name?`}</Text>
              </View>
              <View style={styles.inputFieldWrap}>
                <TextInput
                  ref={view => this.nameTextInputRef = view}
                  autoCorrect={false}
                  clearButtonMode={'while-editing'}
                  returnKeyType={'done'}
                  style={[styles.inputField, styles['inputField_' + Platform.OS]]}
                  onChangeText={this.onChangeName}
                  onFocus={() => {
                    keyboard.onInputFocus(this.containerScrollViewRef, this.nameTextInputRef);
                  }}
                  onBlur={() => {
                    keyboard.onInputBlur(this.containerScrollViewRef)
                  }}
                  value={this.props.name}
                  />
              </View>
              {
              this.props.selectedTeam ?
              <View>
                <TouchableOpacity onPress={this.onGenerateName}>
                  <View style={styles.textButton}>
                    <Icon name='loop' style={styles.textButtonIcon} />
                    <Text style={styles.textButtonText}>Generate wappu name</Text>
                  </View>
                </TouchableOpacity>
              </View>
              :
              <View />
              }
            </View>

            <View style={styles.bottomButtons}>
              <Button
                onPress={this.onCancel}
                style={styles.cancelButton}>
                Cancel
              </Button>

              <Button
                onPress={this.onRegister}
                style={styles.modalButton}
                isDisabled={!this.props.isRegistrationInfoValid}>
                Save
              </Button>
            </View>
          </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
});

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex:1,
    paddingTop:Platform.OS === 'ios' ? 20 : 0,
  },
  bottomButtons:{
    flex:1,
    flexDirection:'row',
    margin:10,
    alignItems:'stretch',
  },
  modalButton: {
    flex:1,
    marginLeft:5,
  },
  cancelButton: {
    flex:1,
    marginRight:5,
    backgroundColor:'#BBB',
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
    textAlign: IOS ? 'center' : 'left',
  },
  inputFieldWrap:{
    padding:15,
  },
  inputField: {
    height: 40,
    fontSize:18,
  },
  inputField_android: {

  },
  inputField_ios: {
    padding:5,
    backgroundColor: 'rgba(20,20,20,0.05)',
  },
  textButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: IOS ? 'center' : 'flex-start',
    padding: IOS ? 10 : 5,
    paddingLeft:20,
    paddingRight:20,
    marginBottom:15,
  },
  textButtonIcon: {
    color: theme.secondary,
    fontSize:18,
    paddingRight:5
  },
  textButtonText:{
    color: theme.secondary,
    fontWeight: 'bold',
    fontSize: 16,
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
    selectedTeam: store.registration.get('selectedTeam'),
    teams: store.team.get('teams'),
    isChooseTeamViewOpen: store.team.get('isChooseTeamViewOpen'),
    isRegistrationInfoValid: !!store.registration.get('name') &&
      !!store.registration.get('selectedTeam')
  };
};

export default connect(select)(RegistrationView);
