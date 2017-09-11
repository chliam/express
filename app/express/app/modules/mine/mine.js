import React, { Component } from 'react';
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
import Message from './message';

export default class mine extends Component{
    constructor(props){
        super(props);
        this.state = {
            msgCount: MomEnv.getNotificationCount(1)
        };

        this._notify = this._notify.bind(this);
    }

    componentWillUnmount() {
        MomEnv.unregPush({
            name: "mine"
        });
    }

    componentDidMount() {
        MomEnv.regPush({
            name: "mine",
            notify: this._notify,
            resetCount: this._notify,
            category: -1
        });
    }

    _notify (badgeCount, category) {
        if (category == 1) {
            this.setState({msgCount: badgeCount});
        }
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

    gotoMessage(){
        this.props.navigator.push({
            component: Message,
            passProps: {title:'我的消息'}
        });
    }

    render() {
        let {msgCount} = this.state;
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
                  <TouchableOpacity onPress={this.gotoMessage.bind(this)}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:44,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10}}>
                         <Text style={{flex:1}}>{'我的消息'}</Text>
                         {
                             msgCount>0
                             ?
                             (<View style={{width:14,height:14,borderRadius:7,marginRight:10,backgroundColor:'#f00',justifyContent:'center',alignItems:'center'}}>
                                 <Text style={{fontSize:10,color:'#fff'}}>{msgCount}</Text>
                             </View>)
                             :
                             (null)
                         }
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