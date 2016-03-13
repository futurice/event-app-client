'use strict';

import _ from 'lodash';
import React, {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/common/Button';
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
            <TextInput
              style={styles.nameField}
              onChangeText={this.onChangeText}
              value={this.state.text} />
            <Button
              onPress={this.onSendText}
              style={styles.modalButton}
              isDisabled={!this.state.text.length}>
              Lähetä!
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
    marginBottom: 10,
    marginLeft: 10,
    borderColor: 'gray',
    borderWidth: 1
  }
});

const select = store => {
  return {
    isTextActionViewOpen: store.competition.get('isTextActionViewOpen')
  };
};

export default connect(select)(TextActionView);
