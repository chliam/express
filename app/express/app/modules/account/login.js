﻿import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput
} from 'react-native';


import MomEnv from './../config/Environment';
import Container from './../shared/Container';
import Advertisement from './../shared/Advertisement';
import Toast,{DURATION} from 'react-native-easy-toast';
import Loading from './../shared/Loading';
import Consent from './consent';
import JPushModule from 'jpush-react-native';

let {width, height} = Dimensions.get('window');

export default class login extends Component{
    constructor(props){
        super(props);
        this.state = {
            telephone:'',
            password:'',
            agree:true,
            loading:false
        };
    }

    componentWillUnmount() {
    }

    componentDidMount() {   
        MomEnv.getProfile().then((profile) => {
            if(profile && profile.telephone && profile.telephone.length>0){
                JPushModule.setTags([profile.telephone], (map) => {});
                MomEnv.getEnablenotifye().then((enable) => {
                    if(enable == false || enable == "false"){
                        JPushModule.stopPush(); 
                    }             
                });
                this.props.navigator.replace({id:'main'});
            }     
        });
    }

    login(){
        //this.props.navigator.replace({id:'main'})
        //MomEnv.saveProfile({"telephone": "13506042224","password":"a123456"});
        
        let{telephone,password} = this.state;
        var telReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
        var pwdReg = /^(?![^a-zA-Z]+$)(?!\D+$)/; 
        if(!telReg.test(telephone)) { 
            this.refs.toast.show(' 请输入有效的手机号码！ ',3000); 
        }
        else if(password.length<1) { 
            this.refs.toast.show('请输入密码！',3000); 
        } 
        else {
            this.setState({loading:true});
            let profile = {"telephone": telephone,"password":password};
            MomEnv.callApi('api/WebApi/Login', 
              profile,
              (responseData)=>{
                  this.setState({loading:false});
                  if(responseData){
                      if(responseData.status=="success"){
                          MomEnv.saveProfile(profile);
                          JPushModule.setTags([telephone], (map) => {});
                          MomEnv.getEnablenotifye().then((enable) => {
                              if(enable == false || enable == "false"){
                                  JPushModule.stopPush(); 
                              }             
                          });
                          this.props.navigator.replace({id:'main'});
                      }else{
                          this.refs.toast.show(responseData.message,3000); 
                      }
                  }else{
                      this.refs.toast.show('网络异常！',3000); 
                  }
           });            
        } 
    }

    render() {
        let{telephone,password,agree,loading} = this.state;
        return (
          <Container>
            <Advertisement title='用户登录' hideback={true}/>
            <View style={{flex:2,alignSelf:'stretch',alignItems:'center',justifyContent:'center'}}>
                <View style={{alignSelf:'stretch',flex:1}}>
                </View>
                <View style={{alignSelf:'stretch',height:100,backgroundColor:'#fff'}}>
                   <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'center'}}>
                      <Image resizeMode="cover" source={require('./../../../assets/head.png')} style={{width:16,height:16,marginLeft:10,marginRight:10,tintColor:'#ccc'}} />
                      <TextInput 
                      style={{flex:1,fontSize:16,padding: 0}} 
                      underlineColorAndroid="transparent" 
                      placeholder='请输入手机号' 
                      placeholderTextColor='#ddd' 
                      keyboardType='phone-pad' 
                      value={telephone}
                      onChangeText={(text) => {this.setState({telephone:text.replace(/\s/g, '')})}} 
                      />
                   </View>
                   <View style={{alignSelf:'stretch',height:1,backgroundColor:'#f2f2f2'}}>
                   </View>
                   <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'center'}}>
                      <Image resizeMode="cover" source={require('./../../../assets/lock.png')} style={{width:16,height:16,marginLeft:10,marginRight:10,tintColor:'#ccc'}} />
                      <TextInput 
                      style={{flex:1,fontSize:16,padding: 0}} 
                      underlineColorAndroid="transparent" 
                      placeholder='请输入密码' 
                      placeholderTextColor='#ddd' 
                      secureTextEntry={true} 
                      value={password}
                      onChangeText={(text) => {this.setState({password:text})}}    
                      />
                   </View>
                </View>
                <View style={{alignSelf:'stretch',flex:4,alignItems:'center',justifyContent:'center'}}>
                    {
                        agree
                        ?
                        (<TouchableOpacity onPress={this.login.bind(this)}>
                            <View style={{backgroundColor:MomEnv.MAIN_COLOR,height:40,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>                         
                             <Text style={{color:'#fff',fontSize:16 }}>{'登 录'}</Text>
                            </View>
                          </TouchableOpacity>)
                        :
                         (<View style={{backgroundColor:'#ccc',height:40,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>                         
                            <Text style={{color:'#fff',fontSize:16 }}>{'登 录'}</Text>
                          </View>)
                    }
               
                    <View style={{flexDirection: 'row',height:60,width:0.8*width,alignItems:'center',justifyContent:'space-between'}}>
                         <TouchableOpacity onPress={()=>{this.props.navigator.push({id:'register',forgetPassword:false})}}>
                           <Text style={{fontSize:14,textDecorationLine:'underline'}}>{'我要注册'}</Text>
                         </TouchableOpacity>
                         <TouchableOpacity onPress={()=>{this.props.navigator.push({id:'register',forgetPassword:true})}}>
                           <Text style={{fontSize:14,textDecorationLine:'underline'}}>{'忘记密码'}</Text>
                         </TouchableOpacity>
                    </View>
                </View>
                 <View style={{alignSelf:'stretch',flex:2}}>
                </View>
            </View>
            <Loading loading={loading} />
            <Toast ref="toast"
                fadeInDuration={600}
                fadeOutDuration={600}
                opacity={0.8}
            />
          </Container>
        );
    }
}