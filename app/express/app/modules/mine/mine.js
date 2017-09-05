﻿import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  BackAndroid,
  Platform,
  TouchableOpacity
} from 'react-native';


import MomEnv from './../config/Environment';
import Container from './../shared/Container';
import Waiting from './../shared/Waiting';
import Setting from './setting';
import Feedback from './feedback';
import UploadPics from './uploadpics';
import CsCenter from './cscenter';

export default class mine extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    gotoWaiting(title){
        this.props.navigator.push({
            component: Waiting,
            passProps: {title:title}
        });
    }

    gotoSetting(){
        this.props.navigator.push({
            component: Setting,
            passProps: {title:'设置'}
        });
    }

    gotoUploadPics(){
        this.props.navigator.push({
            component: UploadPics,
            passProps: {title:'身份认证'}
        });
    }

    gotoCsCenter(){
        this.props.navigator.push({
            component: CsCenter,
            passProps: {title:'客服中心'}
        });
    }

    gotoFeedback(){
        this.props.navigator.push({
            component: Feedback,
            passProps: {title:'意见反馈'}
        });
    }

    render() {
        return (
          <Container>
              <View style={{flex:1.1,backgroundColor:MomEnv.NAVBAR_BG_COLOR,alignItems:'center',justifyContent:'center'}}>
                  <View style={{width:90,height:90,borderRadius:45,backgroundColor:'#fff',overflow :'hidden',alignItems:'center',justifyContent:'center'}}>
                     <Image resizeMode="cover" source={require('./../../../assets/userhead.png')} style={{width:60,height:60}} />
                  </View>               
              </View>
              <View style={{flex:2}}> 
                  <TouchableOpacity onPress={this.gotoUploadPics.bind(this)}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:44,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10}}>
                         <Text>{'身份认证'}</Text>
                         <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                      </View>
                  </TouchableOpacity> 
                  <TouchableOpacity onPress={this.gotoCsCenter.bind(this)}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:44,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10}}>
                         <Text>{'客服中心'}</Text>
                         <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                      </View>
                  </TouchableOpacity> 
                  <TouchableOpacity onPress={this.gotoFeedback.bind(this)}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:44,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10}}>
                         <Text>{'意见反馈'}</Text>
                         <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                      </View>
                  </TouchableOpacity> 
                  <TouchableOpacity onPress={this.gotoSetting.bind(this)}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:44,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10}}>
                         <Text>{'设置'}</Text>
                         <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                      </View>
                  </TouchableOpacity> 
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:44,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10}}>
                         <Text>{'当前版本号'}</Text>
                         <Text>{'V1.0.0'}</Text>
                  </View>
              </View>
              <View style={{height:48}}></View>
          </Container>
        );
    }
}