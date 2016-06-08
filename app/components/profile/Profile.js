'use strict';

// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Image,
  Linking,
  Platform,
  Dimensions,
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
    backgroundColor:'#FFF'
  },
  listItem__hero:{
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop:25,
    paddingBottom:25,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: theme.secondary,
    elevation: 3
  },
  listItemButton:{
    flex:1,
  },
  listItemIcon: {
    fontSize: 22,
    color: theme.primary,
    alignItems: 'center',
    width: 50,
  },
  listItemHeroIcon:{
    borderColor: theme.stable,
    borderWidth: 4,
    borderRadius: 40,
    width:80,
    height: 80,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    overflow:'hidden'
  },
  profilePicBgLayer:{
    flex:1,
    position: 'absolute',
    left: 0,
    right: 0,
    opacity: 0.1,
    bottom: 0,
    top: 0,
    backgroundColor: theme.primary,
  },
  profilePicBg: {
    position: 'absolute',
    opacity: 0.2,
    width: Dimensions.get('window').width,
    left:0,
    top:0,
    bottom:0,
    right: 0,
  },
  profilePic: {
    width:72,
    height: 72,
    borderRadius: 36
  },
  listItemIcon__hero:{
    top: 0,
    width:40,
    fontSize: 40,
    color: theme.light,
  },
  listItemIconRight:{
    position: 'absolute',
    right: 0,
    color: '#aaa',
    top: 27,
  },
  listItemText:{
    color:'#000',
    fontSize:16,
  },
  listItemText__highlight: {
    color:theme.primary,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginBottom: 2
  },
  listItemText__downgrade: {
    color:'#aaa'
  },
  listItemText__small: {
    fontSize:13,
    color: '#aaa',
    backgroundColor: 'transparent'
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
    links: PropTypes.object.isRequired
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
    const currentTeam = _.find(this.props.teams.toJS(), ['id', this.props.selectedTeam]) || {name:''};

    return (
      <TouchableHighlight style={styles.listItemButton} underlayColor={theme.primary} onPress={this.openRegistration}>
        <View style={[styles.listItem, styles.listItem__hero]}>
          {item.picture !== '' &&
            <Image style={styles.profilePicBg} source={{ uri: item.picture }} />
          }
          <View style={styles.listItemHeroIcon}>
          { item.picture ?
            <Image style={styles.profilePic} source={{ uri: item.picture }} /> :
            <Icon style={[styles.listItemIcon, styles.listItemIcon__hero]} name={item.icon} />
          }
          </View>
          <View style={{flexDirection:'column',flex:1, alignItems:'center'}}>
            {
              item.title ?
              <Text style={[styles.listItemText, styles.listItemText__highlight]}>
                {item.title}
              </Text> :
              <Text style={[styles.listItemText, styles.listItemText__downgrade]}>
                Unnamed Futuapp user
              </Text>
            }
            <Text style={[styles.listItemText, styles.listItemText__small]}>
              {currentTeam.name}
            </Text>
          </View>
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
    const listData = [{
      title:this.props.name,
      icon:'person-outline',
      link:'',
      picture: this.props.picture
      }].concat(this.props.links.toJS())

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
      teams: store.team.get('teams'),
      name: store.registration.get('name'),
      picture: store.registration.get('picture'),
      links: store.profile.get('links'),
    }
};

export default connect(select)(Profile);
