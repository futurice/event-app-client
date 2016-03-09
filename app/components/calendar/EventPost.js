/**
 * Futuricians
 */
'use strict';

var React = require('react-native');
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
const Icon = require('react-native-vector-icons/Ionicons');
const theme = require('../../style/theme');

var EventPost = React.createClass({

  getInitialState: function() { 
    return { 
      post:null,
    };  
  },

  componentDidMount () {
    const {post} = this.props.route;
  },


  componentWillReceiveProps (props) {
    const {post} = this.props.route;
  },


  onPressBack () {
    const {navigator} = this.props
    navigator.pop()
  },

  render: function() {

    const {route} = this.props;
    const post =  route.post;

    return ( 
      <View style={styles.detailEvent}>
      <ScrollView>
        <TouchableHighlight  underlayColor={theme.light}>
          <Image source={{uri: post.image }} style={styles.detailEventImg} />
        </TouchableHighlight>

        <View style={styles.content}>
          <Text style={styles.detailEventName} >{post.title}</Text>
          <Text style={styles.detailEventDescription} >{post.description}</Text>
        </View>

        </ScrollView>
      </View> 
      ); 
  }

});

var styles = StyleSheet.create({
  detailEvent:{
    flex:1,
    backgroundColor:'#FFF'
  },  
  detailEventImg:{
    width: Dimensions.get('window').width,
    height:200,
  },
  content:{
    padding:20,
    flex:1,
  },
  detailEventName:{
    backgroundColor:'#fff',
    textAlign:'left',
    color:theme.primary,
    fontWeight:'bold',
    fontSize:25,    
  },  
  detailEventDescription:{
    textAlign:'left',
    color: '#aaa',
    fontWeight:'bold',
    fontSize:15,
    marginTop:10,
  },

});

module.exports = EventPost;
