import React from 'react';
import { AppRegistry, UIManager } from 'react-native';
import RootView from './app/containers/RootView';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
AppRegistry.registerComponent('futufinlandia', () => RootView);
