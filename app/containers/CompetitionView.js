'use strict';

import React, {
    Component,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { ImagePickerManager } from 'NativeModules';
import Button from '../components/common/Button';
import ActionTypes from '../constants/ActionTypes';
import ImageCaptureOptions from '../constants/ImageCaptureOptions';
import * as CompetitionActions from '../actions/competition';

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
                </View>
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
    imgPreview: {
        flex: 0.5,
        resizeMode: 'contain'
    }
});

const select = store => {
    return {
    }
};

export default connect(select)(CompetitionView);
