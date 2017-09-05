import React, { Component } from 'react';
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

let {width, height} = Dimensions.get('window');

export default class changepassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            oldpassword:'',
            newpassword:'',
            confirmnewpassword:'',
            loading:false,
        };
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    componentDidMount() {
    }

    confirm(){
        let{oldpassword,newpassword,confirmnewpassword} = this.state;
        let{forgetPassword} = this.props;
        var telReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
        var pwdReg = /^(?![^a-zA-Z]+$)(?!\D+$)/; 
        if(oldpassword.length==0) { 
            this.refs.toast.show('请输入旧密码！',3000); 
        }
        else if(!pwdReg.test(newpassword)) { 
            this.refs.toast.show('新密码必须是字母和数字组合，且不能低于6位！',3000); 
        } 
        else if(newpassword.length<6) { 
            this.refs.toast.show('新密码必须是字母和数字组合，且不能低于6位！',3000); 
        } 
        else if(newpassword!=confirmnewpassword) { 
            this.refs.toast.show('两次输入的新密码不一致！',3000); 
        } 
        else {
            this.setState({loading:true});
            MomEnv.getProfile().then((profile) => {
                this.setState({loading:true});
                MomEnv.callApi('api/WebApi/UpdatePassword', 
                  {"telephone": profile.telephone,"oldpassword":oldpassword,"newpassword":newpassword},
                  (responseData)=>{
                      this.setState({loading:false});
                      if(responseData){
                          if(responseData.status=="success"){
                              this.refs.toast.show(' 密码修改成功！ ',3000); 
                              this.setState({oldpassword:"",newpassword:"",confirmnewpassword:""});
                          }else{
                              this.refs.toast.show(responseData.message,3000);                                
                          }
                      }else{
                          this.refs.toast.show('网络异常！',3000); 
                      }
                  });            
            });           
        } 
    }

    render() {
        let{oldpassword,newpassword,confirmnewpassword,loading,countdown} = this.state;
        let{navigator,forgetPassword} = this.props;
        return (
          <Container>
            <Advertisement title={'修改密码'}/>
            <View style={{flex:2,alignSelf:'stretch',alignItems:'center',justifyContent:'center'}}>
                <View style={{alignSelf:'stretch',flex:1}}>
                </View>
                <View style={{alignSelf:'stretch',height:132,backgroundColor:'#fff'}}>                  
                   <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:14,marginLeft:10,width:80}}>{'旧密码'}</Text>
                      <TextInput 
                      style={{flex:1,fontSize:16,padding: 0}} 
                      underlineColorAndroid="transparent" 
                      placeholder='请输入旧密码' 
                      placeholderTextColor='#ddd' 
                      secureTextEntry={true} 
                      value={oldpassword}
                      onChangeText={(text) => {this.setState({oldpassword:text})}}    
                      />                    
                   </View>
                   <View style={{alignSelf:'stretch',height:1,backgroundColor:'#f2f2f2'}}>
                   </View>
                   <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:14,marginLeft:10,width:80}}>{'新密码'}</Text>
                      <TextInput 
                      style={{flex:1,fontSize:16,padding: 0}} 
                      underlineColorAndroid="transparent" 
                      placeholder='请输入密码' 
                      placeholderTextColor='#ddd' 
                      secureTextEntry={true} 
                      value={newpassword}
                      onChangeText={(text) => {this.setState({newpassword:text})}}    
                      />
                   </View>
                   <View style={{alignSelf:'stretch',height:1,backgroundColor:'#f2f2f2'}}>
                   </View>
                   <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:14,marginLeft:10,width:80}}>{'新密码确认'}</Text>
                      <TextInput 
                      style={{flex:1,fontSize:16,padding: 0}} 
                      underlineColorAndroid="transparent" 
                      placeholder='请再次输入密码' 
                      placeholderTextColor='#ddd' 
                      secureTextEntry={true} 
                      value={confirmnewpassword}
                      onChangeText={(text) => {this.setState({confirmnewpassword:text})}}    
                      />
                   </View>
                </View>
                
                <View style={{alignSelf:'stretch',flex:4,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={this.confirm.bind(this)}>
                         <View style={{backgroundColor:MomEnv.MAIN_COLOR,height:40,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                             <Text style={{color:'#fff',fontSize:16 }}>{'提交'}</Text>
                         </View>
                    </TouchableOpacity>
                </View>
                 <View style={{alignSelf:'stretch',flex:1}}>
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