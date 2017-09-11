'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { find } from 'lodash';

import theme from '../../style/theme';
import Text from '../Text';
import PlatformTouchable from '../common/PlatformTouchable';
import Content from './Content';
import PhotoView from 'react-native-photo-view';

import { SCREEN_SMALL } from '../../utils/responsive';
const { width, height } = Dimensions.get('window');

const isIOS = Platform.OS === 'ios';

const dateBust = new Date().getTime();
const floors = [
  { name: '1st', image: `https://futurice.github.io/futubileet-site/venue/venue2017-floor-1.png?=${dateBust}` },
  { name: '2nd', image: `https://futurice.github.io/futubileet-site/venue/venue2017-floor-2.png?=${dateBust}` }
];

const navHeight = 100;
const introHeight = 180;

class FloorsTab extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedFloor: '1st' };
    this.selectFloor = this.selectFloor.bind(this);
    this.renderFloor = this.renderFloor.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  selectFloor(floor) {
    this.setState({ selectedFloor: floor });
  }

  renderFloor(floor) {
    const isSelectedFloor = this.state.selectedFloor === floor.name;

    return (
      <PlatformTouchable
        onPress={() => this.selectFloor(floor.name)}
      >
        <Text style={[styles.floorTitle, isSelectedFloor ? styles.activeFloorTitle : null ]}>
          {floor.name}
        </Text>
      </PlatformTouchable>
    );
  }

  renderFloors() {
    return (
      <View style={styles.floors}>
        {floors.map(this.renderFloor)}
      </View>
    );
  }

  renderContent() {
    const { selectedFloor } = this.state;

    const floor = find(floors, (fl) => fl.name === selectedFloor);
    const openFloorImage = floor.image;

    return <PhotoView
      source={{uri: openFloorImage}}
      minimumZoomScale={0.5}
      maximumZoomScale={4}
      resizeMode={'contain'}
      style={{ flex: 1, width, height: height - navHeight - introHeight }}
    />

  }


  render() {
    const { closeTab, color } = this.props.route;

    return (
      <View style={styles.content}>
        <View style={styles.intro}>
          <PlatformTouchable
            onPress={() => closeTab()}
          >
            <Text style={[styles.title, styles[color]]}>Floors</Text>
          </PlatformTouchable>
          <Content>
            {this.renderFloors()}
          </Content>
        </View>
        <Content style={styles.zoomContainer }>
          {this.renderContent()}
        </Content>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  intro: {
    padding: 30,
    paddingTop: 60,
    paddingBottom: 0,
    height: introHeight,
    backgroundColor: 'transparent',
  },
  floors: {
    flex: 1,
    flexDirection: 'row'
  },
  title: {
    fontSize: SCREEN_SMALL ? 38 : 46,
    marginBottom: 20,
    textDecorationLine: 'underline',
    color: theme.white,
  },
  floorTitle: {
    fontSize: SCREEN_SMALL ? 38 : 46,
    marginBottom: 0,
    color: 'rgba(255, 255, 255, .5)',
    marginRight: 30,
  },
  activeFloorTitle: {
    color: theme.accent,
  },
  yellow: {
    color: theme.accent,
  },
  white: {
    color: theme.white,
  },
  pink: {
    color: theme.pink
  },
  zoomContainer: {
    flex: 1,
    marginHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default FloorsTab;
