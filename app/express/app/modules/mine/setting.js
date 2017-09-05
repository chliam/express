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
import Changepassword from './changepassword';
import Switch from './../shared/Switch';
import JPushModule from 'jpush-react-native';

let {width, height} = Dimensions.get('window');

export default class setting extends Component{
    constructor(props){
        super(props);
        this.state = {
            enablenotify:true
        };
    }

    componentDidMount() {
        MomEnv.getEnablenotifye().then((enable) => {
            if(enable == false || enable == "false"){
                this.setState({enablenotify:false});   
            }             
        });
    }

    gotoChangePassword(title){
        this.props.navigator.push({
            component: Changepassword,
            passProps: {title:title}
        });
    }

    gotoWaiting(title){
        this.props.navigator.push({
            component: Waiting,
            passProps: {title:title}
        });
    }

    render() {
        let {enablenotify} = this.state;
        return (
          <Container>
              <Advertisement title={this.props.title}/>
              <View style={{flex:2}}> 
                   <TouchableOpacity onPress={this.gotoChangePassword.bind(this,'修改密码')}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:44,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10}}>
                         <Text>{'修改密码'}</Text>
                         <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                      </View>
                  </TouchableOpacity> 
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:44,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:0}}>
                      <Text>{'消息通知'}</Text>
                      <Switch inactiveButtonColor={'#ccc'}
                      inactiveBackgroundColor={'#cccccc99'} 
                      inactiveButtonPressedColor={'#ccc'}  
                      switchHeight = {24}
                      switchWidth = {48}
                      buttonRadius ={12}
                      activeButtonColor={MomEnv.MAIN_COLOR} 
                      activeBackgroundColor ={MomEnv.MAIN_COLOR+'99'}
                      activeButtonPressedColor = {MomEnv.MAIN_COLOR}
                      active={enablenotify}
                      onChangeState={(state)=>{
                          this.setState({enablenotify:state});
                          MomEnv.saveEnablenotifye(state);
                          if(state){
                              JPushModule.resumePush();
                          }else{
                              JPushModule.stopPush();
                          }
                      }}/>
                  </View>
                  <View style={{flex:1,alignItems:'center',marginTop:40}}>                    
                          <TouchableOpacity onPress={()=>{
                              MomEnv.saveProfile(null);
                              JPushModule.setTags(['0000'], (map) => {});
                              this.props.navigator.replace({id:'login'});
                            }}>
                              <View style={{backgroundColor:MomEnv.MAIN_COLOR,height:40,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                                 <Text style={{color:'#fff',fontSize:16 }}>{'退出登录'}</Text>
                              </View>
                          </TouchableOpacity>
                  </View>
              </View>              
          </Container>
        );
    }
}