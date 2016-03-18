'use strict';

import _ from 'lodash';
import React, {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/common/Button';
import theme from '../../style/theme';
import Modal from 'react-native-modalbox';

import * as CompetitionActions from '../../actions/competition';

const TextActionView = React.createClass({
  getInitialState() {
    return {
      text: ''
    }
  },
  onChangeText(text) {
    this.setState({text: text});
  },
  onCancel(){
    this.setState({text: ''});
    this.props.dispatch(CompetitionActions.closeTextActionView());
  },
  onSendText() {
    this.props.dispatch(CompetitionActions.postText(this.state.text));
    this.setState({text: ''});
    this.props.dispatch(CompetitionActions.closeTextActionView());
  },
  render() {
    return (
      <Modal
        isOpen={this.props.isTextActionViewOpen}
        swipeToClose={false}
        backdropPressToClose={false}>
        <View style={[styles.container, styles.modalBackgroundStyle]}>
          <View style={[styles.innerContainer]}>

            <View style={styles.title}><Text style={styles.titleText} >Hi, how's your Whappu going?</Text></View>
            <TextInput
              autoFocus={true}
              style={[styles.inputField, styles['inputField_'+Platform.OS]]}
              onChangeText={this.onChangeText}
              value={this.state.text} />


            <View style={styles.bottomButtons}>
              <Button
                onPress={this.onCancel}
                style={styles.cancelButton}>
                Cancel
              </Button>

              <Button
                onPress={this.onSendText}
                style={styles.modalButton}
                isDisabled={!this.state.text}>
                Send!
              </Button>
            </View>


             <View style={styles.bottomInfo}>
              <Text style={styles.bottomInfoText}>Each message gives points to your Kilta and boosts the Wappu spirit!</Text>
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
    paddingTop:50,
  },
  innerContainer: {
    padding:10,
  },
  title:{
    padding: 10,
  },
  titleText:{
    fontSize: 20,
    color: theme.primary,
    fontWeight: 'bold',
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
  },
  bottomButtons:{
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    alignItems: 'stretch',
  },
  modalButton: {
    flex: 1,
    marginLeft: 5,
  },
  cancelButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#BBB',
  },
  modalBackgroundStyle: {
    backgroundColor: '#fff'
  },
  inputField: {
    height: 40,
    fontSize: 18,
    margin: 10,
  },
  inputField_android:{

  },
  inputField_ios: {
    padding:5,
    backgroundColor: 'rgba(20,20,20,0.05)',
  },
  bottomInfo:{
    marginTop:50,
    padding:10,
  },
  bottomInfoText:{
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    fontSize:11,
    color:'#aaa'
  }
});

const select = store => {
  return {
    isTextActionViewOpen: store.competition.get('isTextActionViewOpen')
  };
};

export default connect(select)(TextActionView);
