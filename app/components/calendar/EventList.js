/**
 * Sviit Favorite View
 *
 */
'use strict';

var React = require('react-native');
var {
  Image,
  ScrollView,
  StyleSheet,
  ListView,
  Dimensions,
  Text,
  Navigator,
  TouchableHighlight,
  ActivityIndicatorIOS,
  View,
} = React;
import EventPost from './EventPost'
const ProgressBar = require('ProgressBarAndroid');
const theme = require('../../style/theme');
const _ = require('lodash');
const Icon = require('react-native-vector-icons/Ionicons'); 

var EventList = React.createClass({

  getInitialState: function() { 
    return { 
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }), 
      loaded: false
    }; 
  },

  componentDidMount: function() { 
    this.fetchData();
  },

  fetchData: function() {

    // Dummy content
    const res = _.map([1,2,3,4,5], (i) => {
      return {
        image:i%2?
          'https://scontent-ams3-1.xx.fbcdn.net/hphotos-xfa1/t31.0-0/p180x540/11130512_10204972692809378_7795959737249481696_o.jpg' :
          'https://scontent-ams3-1.xx.fbcdn.net/hphotos-xat1/t31.0-8/p843x403/11076791_10204019295584836_1442106314972484813_o.jpg',
        title:'Wapputapahtuma '+i,
        description:i + '. Tapahtuman kuvaus',
        link:'http://www.ttyy.fi/wappu/kalenteri',
        likeCount: Math.floor(Math.random() * 500)
      }
    })


    this.setState({ 
      dataSource: this.state.dataSource.cloneWithRows(res), 
      loaded: true,
    });
    /*
    var url = 'http://our-great-wappu-api'
    fetch(url)
      .then((response) => response.json()) 
      .then((res) => {

        //set res to dataSource 

        this.setState({ 
          dataSource: this.state.dataSource.cloneWithRows(res), 
          loaded: true,
        });

      })
      .catch((error) => { this.setState({ 
          error: true,
          loaded: true,
        })
      })
      .done();
    */
  },

  renderLoadingView: function() { 
    return ( 
      <View style={styles.container}>
          
        <ProgressBar styleAttr="Inverse" />

        <ActivityIndicatorIOS 
         color={theme.primary}
         animating={true} 
         style={{ alignItems: 'center', justifyContent: 'center', height: 80}} 
         size="large" />

        <Text>Ladataan tapahtumia...</Text>
        </View> 
    ); 
  },

  renderErrorView: function() { 
    return ( 
      <View style={styles.container}>
        <Text>Tapahtumia ei saatu haettua</Text>
      </View> 
    ); 
  },

  render: function() {
    if (!this.state.loaded) { return this.renderLoadingView(); }
    if (this.state.error) { return this.renderErrorView(); }

    return (
      <ListView dataSource={this.state.dataSource} renderRow={this.renderEventPost} style={styles.listView} /> 
    );
  },

  showSingleEvent(post){
    const {navigator} = this.props
    navigator.push({ 
      component:EventPost,
      name:post.title,
      actions: ['share'],
      post
    });
  },

  renderEventPost: function(post) {

    return (
      <TouchableHighlight onPress={this.showSingleEvent.bind(this, post)} underlayColor={'transparent'}>
        <View style={styles.gridListItem}>
          <View style={styles.gridListItemImgWrap}>

            <Image
            source={{uri: post.image }}
            style={styles.gridListItemImg} />
            <View style={[styles.gridListItemImgColorLayer]} ></View>
          </View>
          <View style={styles.gridListItemContent}>
            <Text style={styles.gridListItemTitle} >{post.title}</Text>
            <Text style={styles.gridListItemLikes}>
              <Icon name="android-favorite-outline" size={15} /> {post.likeCount}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    ); 
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary
  },
  listView: {
    flex:1,
  },
  gridListItem: {
    width:Dimensions.get('window').width,
    height:200,
    flex:1
  },
  gridListItemImgWrap:{
    height:200,
    width:Dimensions.get('window').width,
    position:'absolute'
  },
  gridListItemImgColorLayer:{
    backgroundColor:theme.primary,
    opacity:0.5,
    elevation:1,
    position:'absolute',
    left:0,top:0,bottom:0,right:0,
  },
  gridListItemImg:{
    width: Dimensions.get('window').width, 
    height: 200,
  },
  gridListItemContent:{
    elevation:2,
    flex:1,
    justifyContent:'center',
    padding:20,
  },
  gridListItemTitle:{
    fontSize:26,
    fontWeight:'bold',
    textAlign:'center',
    color:theme.light,
  },
  gridListItemLikes:{
    color:theme.light,
    opacity:0.9,
    position:'absolute',
    right:20,
    top:20,
    fontSize:15,
  }
  
});

module.exports = EventList;
