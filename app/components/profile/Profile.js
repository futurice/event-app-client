'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Linking,
  Platform,
  PropTypes
} = React;
import { connect } from 'react-redux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
  listItem__hero:{
    paddingTop:25,
    paddingBottom:25,
  },
  listItemButton:{
    flex:1,
  },
  listItemIcon: {
    fontSize: Platform.OS === 'ios' ? 22 :  24,
    color: theme.primary,
    alignItems: 'center',
    width: 50,
  },
  listItemIcon__hero:{
    top: 0
  },
  listItemIconRight:{
    position: 'absolute',
    right: 0,
    color: '#aaa',
    top: 28,
  },
  listItemText:{
    color:'#000',
    fontSize:18,
  },
  listItemText__highlight: {
    color:theme.primary
  },
  listItemText__downgrade: {
    color:'#aaa'
  },
  listItemText__small: {
    fontSize:12,
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
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    links: PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    }
  },

  componentDidMount() {
    this.props.dispatch(ProfileActions.fetchLinks());
  },

  openRegistration() {
    this.props.dispatch(RegistrationActions.openRegistrationView());
  },

  renderLinkItem(item) {
    return (
      <TouchableHighlight style={styles.listItemButton} underlayColor={theme.primary}
        onPress={() => Linking.openURL(item.link)}>
        <View style={styles.listItem}>
          <Icon style={styles.listItemIcon} name={item.icon} />
          <Text style={styles.listItemText}>{item.title}</Text>
          <View style={styles.listItemBottomLine} />
        </View>
      </TouchableHighlight>
    );
  },

  renderModalItem(item) {
    const currentTeam = _.find(this.props.teams, ['id', this.props.selectedTeam]) || {name:''};

    return (
      <TouchableHighlight style={styles.listItemButton} underlayColor={theme.primary}
        onPress={this.openRegistration}>
        <View style={[styles.listItem, styles.listItem__hero]}>
          <Icon style={[styles.listItemIcon, styles.listItemIcon__hero]} name={item.icon} />
          <View style={{flexDirection:'column',flex:1}}>
            {
              item.title ?
              <Text style={[styles.listItemText, styles.listItemText__highlight]}>
                {item.title}
              </Text> :
              <Text style={[styles.listItemText, styles.listItemText__downgrade]}>
                Unnamed Whappu user
              </Text>
            }
            <Text style={[styles.listItemText, styles.listItemText__small]}>
              {currentTeam.name}
            </Text>
          </View>
          <Icon style={[styles.listItemIcon, styles.listItemIconRight]} name={item.rightIcon} />
          <View style={styles.listItemBottomLine} />
        </View>
      </TouchableHighlight>
    );
  },

  renderItem(item) {
    if (item.link) {
      return this.renderLinkItem(item);
    }
    return this.renderModalItem(item);
  },

  render() {
    const listData = [{title:this.props.name,
      icon:'person-outline', link:'', rightIcon:'create'}].concat(this.props.links)

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
      selectedTeam: store.registration.get('selectedTeam'),
      teams: store.team.get('teams').toJS(),
      name: store.registration.get('name'),
      links: store.profile.get('links').toJS(),
    }
};

export default connect(select)(Profile);
