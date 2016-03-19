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
          <Image
            source={{ uri: this.props.logo }}
            style={[styles.teamLogo, {borderColor: selected ? theme.primary : '#f2f2f2'}]} />
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
    borderBottomColor:'#eee',
    borderBottomWidth:1,

  },
  teamLogo:{
    borderRadius:20,
    width:40,
    height:40,
    marginRight:15,
    borderWidth:3,
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
