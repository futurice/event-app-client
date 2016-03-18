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


import RegistrationView from '../registration/RegistrationView';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import theme from '../../style/theme';
import * as ProfileActions from '../../actions/profile';
import * as RegistrationActions from '../../actions/registration';

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
    fontSize:Platform.OS==='ios' ? 22 : 24,
    color:theme.primary,
    width:50,
  },
  listItemIconRight:{
    position:'absolute',
    right:0,
    color:'#aaa',
    top:20,
  },
  listItemText:{
    color:'#000',
    fontSize:18,
  },
  listItemTextHighlight: {
    color:theme.primary
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

  openRegistration(){
    this.props.dispatch(RegistrationActions.openRegistrationView());
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

  renderModalItem(item){
    return(
      <TouchableHighlight style={styles.listItemButton} underlayColor={theme.primary} onPress={this.openRegistration}>
        <View style={styles.listItem}>
          <Icon style={styles.listItemIcon} name={item.icon} />
          <Text style={[styles.listItemText, styles.listItemTextHighlight]}>{item.title}</Text>
          <View style={styles.listItemBottomLine} />
          <Icon style={[styles.listItemIcon, styles.listItemIconRight]} name={item.rightIcon} />
        </View>
      </TouchableHighlight>
    );
  },

  renderItem(item) {
    if(item.link){
      return this.renderLinkItem(item);
    }
    return this.renderModalItem(item);
  },

  render() {
    const listData = [{title:this.props.name, icon:'person-outline', link:'', rightIcon:'create'}].concat(this.props.links)

    return (
      <View style={styles.container}>
        <ListView style={[styles.scrollView]}
          dataSource={this.state.dataSource.cloneWithRows(listData)}
          renderRow={this.renderItem}
        />
      </View>
      );

  }
});

const select = store => {
    return {
      name: store.registration.get('name'),
      links: store.profile.get('links').toJS(),
    }
};

export default connect(select)(Profile);
