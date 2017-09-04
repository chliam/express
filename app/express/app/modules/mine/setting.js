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
  TouchableOpacity,
  Dimensions
} from 'react-native';

import MomEnv from './../config/Environment';
import Container from './../shared/Container';
import Advertisement from './../shared/Advertisement';
import Waiting from './../shared/Waiting';
import Nav from './../shared/Nav';
let {width, height} = Dimensions.get('window');

export default class setting extends Component{
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

    render() {
        return (
          <Container>
              <Nav title={this.props.title}/>
              <Advertisement/>
              <View style={{flex:2}}> 
                   <TouchableOpacity onPress={this.gotoWaiting.bind(this,'修改密码')}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:44,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10}}>
                         <Text>{'修改密码'}</Text>
                         <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                      </View>
                  </TouchableOpacity> 
                  <TouchableOpacity onPress={this.gotoWaiting.bind(this,'消息通知')}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:44,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10}}>
                         <Text>{'消息通知'}</Text>
                         <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                      </View>
                  </TouchableOpacity> 
                  <View style={{flex:1,alignItems:'center',marginTop:40}}>
                      <View style={{backgroundColor:MomEnv.MAIN_COLOR,height:40,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                          <TouchableOpacity onPress={()=>{this.props.navigator.replace({id:'login'})}}>
                              <Text style={{color:'#fff',fontSize:16 }}>{'退出登录'}</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>              
          </Container>
        );
    }
}