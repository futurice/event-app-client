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
import Button from '../components/common/Button';
import ActionTypes from '../constants/ActionTypes';
import ImageCaptureOptions from '../constants/ImageCaptureOptions';
import * as CompetitionActions from '../actions/competition';
import * as RegistrationActions from '../actions/registration';

const CompetitionView = React.createClass({
  onChooseImage() {
    ImagePickerManager.showImagePicker(ImageCaptureOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const image = 'data:image/jpeg;base64,' + response.data;
        this.props.dispatch(CompetitionActions.uploadImage(img));
      }
    });
  },

  onJustPress(type) {
    this.props.dispatch(CompetitionActions.postAction(type))
  },

  onRegister() {
    this.props.dispatch(RegistrationActions.openRegistrationView());
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.actions}>
          <Button style={styles.btn} onPress={this.onChooseImage.bind(null, ActionTypes.IMAGE)}>Lataa kuva</Button>
          <Button style={styles.btn} onPress={this.onJustPress.bind(null, ActionTypes.BEER)}>Join kaljan</Button>
          <Button style={styles.btn} onPress={this.onJustPress.bind(null, ActionTypes.CIDER)}>Join siiderin</Button>
          <Button style={styles.btn} onPress={this.onJustPress.bind(null, ActionTypes.LONKKU)}>Join lonkun</Button>
          <Button style={styles.btn} onPress={this.onJustPress.bind(null, ActionTypes.JALLU)}>JALLUNAPPI!!1</Button>
          <Button style={styles.btn} onPress={this.onJustPress.bind(null, ActionTypes.PUSH_THE_BUTTON)}>Paina nappia</Button>
          <Button style={styles.btn} onPress={this.onRegister}>Rekkaa</Button>
        </View>
        <Modal
          animated={true}
          transparent={false}
          visible={this.props.isRegistrationViewOpen}>
          <View style={[styles.container, styles.modalBackgroundStyle]}>
            <View style={[styles.innerContainer]}>
              <Text>Hi there! Who are you?</Text>
              <Button
                onPress={this.onCloseModal}
                style={styles.modalButton}>
                That's-a-me!
              </Button>
            </View>
          </View>
        </Modal>
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
  actions: {
    flex: 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10
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
  }
});

const select = store => {
  return {
    isRegistrationViewOpen: store.registration.get('isRegistrationViewOpen'),
    name: store.registration.get('name')
  };
};

export default connect(select)(CompetitionView);
