'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  Image,
  PropTypes,
  TouchableOpacity
} from 'react-native';

import theme from '../../style/theme';

const Team = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    teamid: PropTypes.number.isRequired,
    selected: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired
  },
  render() {
    const selected = this.props.teamid === this.props.selected;
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.props.onPress}>
          {!this.props.logo ?
          <Image
            source={{ uri: this.props.logo }}
            style={[styles.teamLogo, {borderColor: selected ? theme.primary : theme.lightblue}]} /> :
          <View style={[styles.teamLogo, styles.teamLogoText, {borderColor: selected ? theme.primary : theme.lightblue}]} >
            <Text style={styles.teamLogoLetter}>{this.props.name.charAt(0).toUpperCase()}</Text>
          </View>
          }

          <Text style={[styles.text, {color: selected ? theme.primary : '#666'}]}>
            {this.props.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  item: {
    padding:15,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:0,
    borderBottomColor:theme.lightblue,
    borderBottomWidth:1,

  },
  teamLogo:{
    borderRadius:20,
    width:40,
    height:40,
    marginRight:15,
    borderWidth:3,
  },
  teamLogoText: {
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: theme.lightblue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  teamLogoLetter: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  text: {

  },
  button: {
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  }
});

export default Team;
