'use strict';

import React, { Animated, Easing, Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionButton from './ActionButton';
import ActionButtonLabel from './ActionButtonLabel';
import * as RegistrationActions from '../../actions/registration';

// in a happy world all this would be calculated on the fly but no
const BUTTON_COUNT = 6;
const DISTANCE = 60;
const BUTTON_WIDTH = 46;
const BIG_BUTTON_WIDTH = 56;
const BUTTON_DELAY = 40;

const OPEN = 'OPEN';
const CLOSED = 'CLOSED';

const BUTTON_POS = [];
for (let i = 0; i < BUTTON_COUNT; i++) {
  BUTTON_POS.push({
    x: 0,
    y: -DISTANCE * i - (BUTTON_WIDTH + BIG_BUTTON_WIDTH / 2) + 10
  });
}

const styles = StyleSheet.create({
  mainButton: {
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 0
    },
  },
  buttonEnclosure: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 67 : 20,
    right: 20,
    overflow:'visible',
    width: 200,
    height: 56,
    borderRadius: 28
  },
  actionButton: {
    bottom: 4,
    right: 5,
    width: 46,
    height: 46
  },
  actionButtonContent: {
    color: '#fff'
  }
});

const actions = {};
const getBoundAction = (type, fn) => {
  if (actions[type]) {
    return actions[type];
  }

  actions[type] = fn.bind(null, type);
  return actions[type];
};

const ActionButtons = React.createClass({
  getInitialState() {
    return {
      buttons: BUTTON_POS.map(() => new Animated.ValueXY()),
      plusButton: new Animated.Value(0),
      labels: BUTTON_POS.map(() => new Animated.Value(0)),
      actionButtonsOpen: false
    };
  },

  animateButtonsToState(nextState) {

    // state is manipulated here directly on purpose, so the animations works smoothly
    /*eslint-disable */
    this.state.actionButtonsOpen = nextState === OPEN;
    /*eslint-enable */
    BUTTON_POS.forEach((pos, i) => {

      // Animate action buttons, iOS handles delay better
      if(Platform.OS === 'ios'){
        Animated.sequence([
          Animated.delay(nextState === OPEN ? BUTTON_POS.length * BUTTON_DELAY - (i * BUTTON_DELAY) : 0),
          Animated.spring(this.state.buttons[i],
            { toValue: nextState === OPEN ? pos : { x: 0, y: 0 } })
        ]).start();
      } else {
         Animated.spring(this.state.buttons[i], { toValue: nextState === OPEN ? pos : { x: 0, y: 0 } }).start();
      }

      // Animate action button labels, 200ms later than buttons
      Animated.sequence([
        Animated.delay(nextState === OPEN ? 200 + BUTTON_POS.length * BUTTON_DELAY - (i * BUTTON_DELAY) : 0),
        Animated.timing(this.state.labels[i], {duration:200, toValue:  nextState === OPEN ? 1 : 0})
      ]).start();
    });
    Animated.spring(this.state.plusButton, { toValue: nextState === OPEN ? 1 : 0 }).start();
  },

  onToggleActionButtons() {
    if (this.props.isRegistrationInfoValid === false) {
      this.props.dispatch(RegistrationActions.openRegistrationView());
    } else {

      Animated.timing(this.props.overlay, {duration:300, easing:Easing.ease, toValue: this.state.actionButtonsOpen ? 0 : 1}).start();
      this.animateButtonsToState(this.state.actionButtonsOpen ? CLOSED : OPEN);
    }
  },

  getIconForAction(type) {
    const mapping = {
      TEXT: 'textsms',
      IMAGE: 'photo-camera',
      SIMA: 'local-drink',
      LECTURE: 'local-cafe',
      BUTTON_PUSH: 'touch-app',
      default: 'image'
    };
    return mapping[type] || mapping['default'];
  },

  getLabelForAction(type) {
    const mapping = {
      TEXT: 'Write a message',
      IMAGE: 'Take a photo',
      SIMA: 'Had a sima',
      LECTURE: 'At a lecture',
      BUTTON_PUSH: 'Push the button',
      default: 'image'
    };
    return mapping[type] || mapping['default'];
  },


  getCooldownTime(actionType) {
    const now = new Date().getTime();
    const diffInSecs = (this.props.cooldownTimes.get(actionType) - now) / 1000;
    const minutes = Math.floor(diffInSecs / 60);
    const seconds = Math.floor(diffInSecs % 60);

    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  },

  renderActionButtons() {
    return this.props.actionTypes.map((actionType, i) => {
      const actionTypeCode = actionType.get('code');
      const iconName = this.getIconForAction(actionTypeCode);
      const labelName = this.getLabelForAction(actionTypeCode);
      const isCoolingDown = this.props.disabledActionTypes.find(dat => dat === actionTypeCode);

      const iconOrCooldownTime = isCoolingDown ?
        <Text style={styles.actionButtonContent}>{this.getCooldownTime(actionTypeCode)}</Text> :
        <Icon name={iconName} size={22} style={styles.actionButtonContent}></Icon>;

      const actionButtonStyles = [
        styles.buttonEnclosure,
        { transform: this.state.buttons[i].getTranslateTransform() }
      ];

      return (
        <Animated.View key={`button-${i}`} style={actionButtonStyles}>
          <ActionButtonLabel extraStyle={{opacity:this.state.labels[i] }}>
            {labelName}
          </ActionButtonLabel>
          <ActionButton
            onPress={getBoundAction(actionTypeCode, this.props.onPressAction)}
            disabled={isCoolingDown}
            extraStyle={styles.actionButton}>
            {iconOrCooldownTime}
          </ActionButton>
        </Animated.View>
      );
    });
  },

  renderMenuButton() {
    const rotation = this.state.plusButton.interpolate({
      inputRange: [0, 1], outputRange: ['0deg', '225deg']
    });

    return (
      <ActionButton onPress={this.onToggleActionButtons} extraStyle={styles.mainButton}>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <Icon name={'add'} size={24} style={styles.actionButtonContent}></Icon>
        </Animated.View>
      </ActionButton>
    );
  },

  render() {
    const { isLoading, actionTypes, style } = this.props;

    if (isLoading || !actionTypes || actionTypes.size === 0) {
      return null;
    }

    return (
      <View style={style}>
        {this.renderActionButtons()}
        {this.renderMenuButton()}
      </View>
    );
  }
});

const select = store => {
  return {
    actionTypes: store.competition.get('actionTypes'),
    disabledActionTypes: store.competition.get('disabledActionTypes'),
    cooldownTimes: store.competition.get('cooldownTimes')
  };
};

export default connect(select)(ActionButtons);
