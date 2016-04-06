'use strict';

import React, {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  PropTypes,
  TouchableOpacity,
  ScrollView,
  BackAndroid
} from 'react-native';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import theme from '../../style/theme';
import Button from '../../components/common/Button';
import IntroView from './IntroView';
import Modal from 'react-native-modalbox';
import Team from './Team';
import Toolbar from './RegistrationToolbar';
import * as RegistrationActions from '../../actions/registration';
import * as TeamActions from '../../actions/team';
import * as keyboard from '../../utils/keyboard';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IOS = Platform.OS === 'ios';
const {height} = Dimensions.get('window');

const RegistrationView = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    teams: PropTypes.instanceOf(Immutable.List).isRequired,
    selectedTeam: PropTypes.number.isRequired,
    isRegistrationViewOpen: PropTypes.bool.isRequired,
    isRegistrationInfoValid: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.isRegistrationViewOpen) {
        this.onClose()
        return true;
      }
      return false;
    })
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
  onDismissIntroduction() {
    if (this.props.isRegistrationInfoValid) {
      this.onRegister();
    }
    this.props.dispatch(RegistrationActions.dismissIntroduction());
  },
  onClose() {
    if (this.props.isRegistrationInfoValid) {
      this.onRegister();
    }
    this.props.dispatch(RegistrationActions.closeRegistrationView());
  },
  render() {
    return (
      <Modal
        isOpen={this.props.isRegistrationViewOpen}
        swipeToClose={false}
        backdropPressToClose={false}>
        {
          this.props.selectedTeam || this.props.isIntroductionDismissed
            ? this._renderNameSelectContainer()
            : <IntroView onDismiss={this.onDismissIntroduction} />
        }
      </Modal>
    );
  },

  _renderNameSelectContainer() {
    return (
      <View style={[styles.container, styles.modalBackgroundStyle]}>

        <Toolbar icon={this.props.isRegistrationInfoValid ? 'android-done' : 'android-close'}
          iconClick={this.onClose}
          title='Fill your profile' />

        <ScrollView ref={view => this.containerScrollViewRef = view} style={{flex:1}}>
          <View style={[styles.innerContainer]}>
            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <Text style={styles.inputLabelText}>Choose your Guild</Text>
              </View>

              <View style={[styles.inputFieldWrap, {paddingTop:0,paddingBottom:0}]}>
                <ScrollView style={{flex:1, height: height > 595 ? 210 : null}}>
                  {this.props.teams.map((team,i) =>
                    <Team
                      key={team.get('id')}
                      name={team.get('name')}
                      teamid={team.get('id')}
                      logo={team.get('imagePath')}
                      selected={this.props.selectedTeam}
                      onPress={this.onSelectTeam.bind(this, team.get('id'))} />
                  )}
                </ScrollView>
              </View>
            </View>

            {this._renderNameSelect()}
          </View>
        </ScrollView>

        <View style={styles.bottomButtons}>
          <Button
            onPress={this.onRegister}
            style={styles.modalButton}
            isDisabled={!this.props.isRegistrationInfoValid}>
            Save
          </Button>
        </View>
      </View>
    );
  },

  _renderNameSelect() {
    return (
      <View style={[styles.inputGroup, {marginBottom:4}]}>
        <View style={styles.inputLabel}>
          <Text style={styles.inputLabelText}>{`Hi there! What's your wappu name?`}</Text>
        </View>
        <View style={styles.inputFieldWrap}>
          <TextInput
            ref={view => this.nameTextInputRef = view}
            autoCorrect={false}
            autoCapitalize={'words'}
            clearButtonMode={'while-editing'}
            returnKeyType={'done'}
            style={[styles.inputField, styles['inputField_' + Platform.OS]]}
            onChangeText={this.onChangeName}
            onFocus={() => {
              keyboard.onInputFocus(this.containerScrollViewRef, this.nameTextInputRef,300);
            }}
            onBlur={() => {
              keyboard.onInputBlur(this.containerScrollViewRef)
            }}
            value={this.props.name}
          />
        </View>

        <View>
          <TouchableOpacity onPress={this.onGenerateName}>
            <View style={styles.textButton}>
              <Icon name='loop' style={styles.textButtonIcon} />
              <Text style={styles.textButtonText}>Generate wappu name</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:50
  },
  innerContainer: {
    flex:1,
    paddingTop:Platform.OS === 'ios' ? 15 : 10,
  },
  bottomButtons:{
    flex:1,
    flexDirection:'row',
    margin:0,
    marginBottom:0,
    marginLeft:0,
    marginRight:0,
    height:50,
    alignItems:'stretch',
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
  },
  modalButton: {
    borderRadius:0,
    flex:1,
    marginLeft:0,
  },
  modalBackgroundStyle: {
    backgroundColor: '#eee'
  },
  inputGroup:{
    padding:0,
    backgroundColor:'#FFF',
    margin:10,
    marginTop:0,
    borderRadius:2,
    elevation:1,
    flex:1,
  },
  inputLabel:{
    padding:15,
    paddingTop:13,
    paddingBottom:13,
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
    fontSize:16,
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
    padding: IOS ? 5 : 5,
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
  },
  introductionContainer: {
    margin: 10,
    marginTop: 20
  },
  introductionSecondaryText: {
    marginTop: 10,
    color: '#555'
  }
});

const select = store => {
  return {
    isIntroductionDismissed: store.registration.get('isIntroductionDismissed'),
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
