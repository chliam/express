import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Navigator,
  BackAndroid,
  Platform,
  TouchableOpacity,
  Dimensions,
  WebView
} from 'react-native';

import MomEnv from './../config/Environment';
import Container from './../shared/Container';
import Advertisement from './../shared/Advertisement';
import Nav from './../shared/Nav';

let {width, height} = Dimensions.get('window');

export default class cscenter extends Component{
    constructor(props){
        super(props);
        this.state = {
            type:1
        };
    }

    render() {
        let {type} = this.state;
        let uri = MomEnv.BASE_URL + (type==1 ? 'Call.html' : 'Online.html') ;
        return (
          <Container>              
              <Advertisement title={this.props.title}/>
              <View style={{flex:2,alignSelf:'stretch'}}>
                  <WebView
                    ref='webview'
                    automaticallyAdjustContentInsets={true}
                    style={{flex:1,alignSelf:'stretch'}}
                    source={{uri: uri}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scalesPageToFit={true}
                  />
                  <View style={{alignSelf:'stretch',height:64,backgroundColor:MomEnv.NAVBAR_BG_COLOR,flexDirection: 'row',alignItems:'center',justifyContent:'space-around',paddingBottom:20}}>
                       <TouchableOpacity onPress={()=>{this.setState({type:1})}}>
                         <Text style={{color:type==1?MomEnv.MAIN_COLOR:'#666'}}>{'拨打电话'}</Text>
                       </TouchableOpacity>
                       <TouchableOpacity onPress={()=>{this.setState({type:2})}}>
                         <Text style={{color:type==2?MomEnv.MAIN_COLOR:'#666'}}>{'在线客服'}</Text>
                       </TouchableOpacity>
                  </View>
              </View>              
          </Container>
        );
    }
}