'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Linking,
  Platform,
} = React;
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import theme from '../../style/theme';
import * as ProfileActions from '../../actions/profile';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  scrollView:{
    flex: 1,
  },
  listItem: {
    flex:1,
    padding:20,
    flexDirection:'row',
    backgroundColor:'#FFF',
  },
  listItemButton:{
    flex:1,
  },
  listItemIcon:{
    fontSize:24,
    color:theme.primary,
    width:50,
  },
  listItemText:{
    color:'#000',
    fontSize:18,
  },
  listItemBottomLine:{
    position:'absolute',
    right:0,
    left:70,
    bottom:0,
    height:1,
    backgroundColor:'#eee'
  }
});

var Profile = React.createClass({

  getInitialState() {
    return {
        dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    }
  },

  componentDidMount() {
    this.props.dispatch(ProfileActions.fetchLinks());
  },

  renderLinkItem(item) {
    return(
      <TouchableHighlight style={styles.listItemButton} underlayColor={theme.primary} onPress={() => Linking.openURL( item.link )}>
        <View style={styles.listItem}>
          <Icon style={styles.listItemIcon} name={item.icon} />
          <Text style={styles.listItemText}>{item.title}</Text>
          <View style={styles.listItemBottomLine} />
        </View>
      </TouchableHighlight>
    );
  },

  render() {
    return (
      <View style={styles.container}>
        <ListView style={[styles.scrollView]}
          dataSource={this.state.dataSource.cloneWithRows(this.props.links)}
          renderRow={this.renderLinkItem}
        />
      </View>
      );

  }
});

const select = store => {
    return {
      links: store.profile.get('links').toJS(),
    }
};

export default connect(select)(Profile);
