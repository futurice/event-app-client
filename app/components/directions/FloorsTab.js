import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { find } from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getSelectedFloor, setFloor } from '../../concepts/floor';

import theme from '../../style/theme';
import Text from '../Text';
import Content from './Content';
import PhotoView from 'react-native-photo-view';
import ImageZoom from 'react-native-image-zoom';

import { SCREEN_SMALL } from '../../utils/responsive';
const { width, height } = Dimensions.get('window');
const IOS = Platform.OS === 'ios';

const date = new Date().getTime();
const floors = [
  { name: '1st', image: `https://futurice.github.io/futubileet-site/venue/venue2017-floor-1.png?=${date}` },
  { name: '2nd', image: `https://futurice.github.io/futubileet-site/venue/venue2017-floor-2.png?=${date}` }
];

const navHeight = 100;
const introHeight = 180;

class FloorsTab extends Component {
  constructor(props) {
    super(props);

    this.renderFloor = this.renderFloor.bind(this);
    this.renderFloors = this.renderFloors.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  renderFloor(floor) {
    const isSelectedFloor = this.props.selectedFloor === floor.name;

    return (
      <TouchableOpacity
        onPress={() => this.props.setFloor(floor.name)}
      >
        <Text style={[styles.floorTitle, isSelectedFloor ? styles.activeFloorTitle : null ]}>
          {floor.name}
        </Text>
      </TouchableOpacity>
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
    const { selectedFloor } = this.props;

    const floor = find(floors, (fl) => fl.name === selectedFloor);
    const openFloorImage = floor.image;

    return IOS
    ? <PhotoView
      source={{uri: openFloorImage}}
      minimumZoomScale={0.5}
      maximumZoomScale={4}
      resizeMode={'contain'}
      style={{ flex: 1, width, height: height - navHeight - introHeight }}
    />
    : <ImageZoom
      source={{
        uri: openFloorImage,
        headers: {
          "Referer" : 'http://...'
        }
      }}
      resizeMode={'contain'}
      style={{ flex: 1, width, height: height - navHeight - introHeight }}
      />

  }


  render() {
    const { closeTab, color } = this.props.route;

    return (
      <View style={styles.content}>
        <View style={styles.intro}>
          <TouchableOpacity
            onPress={() => closeTab()}
          >
            <Text style={[styles.title, styles[color]]}>Floors</Text>
          </TouchableOpacity>
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
    paddingTop: IOS ? 60 : 40,
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


const mapDispatchToProps = {
  setFloor
};

const select = createStructuredSelector({
  selectedFloor: getSelectedFloor
})

export default connect(select, mapDispatchToProps)(FloorsTab);
