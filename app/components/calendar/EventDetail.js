'use strict';

import React from 'react-native';
var {
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  ListView,
  Text,
  Dimensions,
  TouchableHighlight,
  InteractionManager,
  View,
  WebView,
} = React;
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../style/theme';

const styles = StyleSheet.create({
  detailEvent: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  detailEventImg: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  detailEventName: {
    backgroundColor: theme.light,
    textAlign: 'left',
    color: theme.primary,
    fontWeight: 'bold',
    fontSize: 25,
  },
  detailEventDescription: {
    textAlign: 'left',
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
  }
});

const EventDetail = React.createClass({
  onPressBack () {
    this.props.navigator.pop();
  },

  render: function() {
    const model = this.props.route.model;

    return <View style={styles.detailEvent}>
      <ScrollView>
        <TouchableHighlight  underlayColor={theme.light}>
          <Image source={{ uri: model.coverImage }} style={styles.detailEventImg} />
        </TouchableHighlight>

        <View style={styles.content}>
          <Text style={styles.detailEventName}>{model.name}</Text>
          <Text style={styles.detailEventDescription}>{model.description}</Text>
        </View>
      </ScrollView>
    </View>;
  }

});

export default EventDetail;
