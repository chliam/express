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
import Nav from './../shared/Nav';
import Consent from './consent';

let {width, height} = Dimensions.get('window');

export default class register extends Component{
    constructor(props){
        super(props);
        this.state = {
            telephone:'',
            varcode:'',
            password:'',
            confirmpassword:'',
            agree:false,
            loading:false,
            countdown:0,
            servervarcode:''
        };
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    componentDidMount() {
    }

    register(){
        let{telephone,varcode,password,confirmpassword,servervarcode} = this.state;
        let{forgetPassword} = this.props;
        var telReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
        var pwdReg = /^(?![^a-zA-Z]+$)(?!\D+$)/; 
        if(!telReg.test(telephone)) { 
            this.refs.toast.show(' 请输入有效的手机号码！ ',3000); 
        }
        else if(varcode.length==0) { 
            this.refs.toast.show('请输入验证码！',3000); 
        } 
        else if(varcode!=servervarcode) { 
            this.refs.toast.show('验证码错误！',3000); 
        } 
        else if(!pwdReg.test(password)) { 
            this.refs.toast.show('密码必须是字母和数字组合，且不能低于6位！',3000); 
        } 
        else if(password.length<6) { 
            this.refs.toast.show('密码必须是字母和数字组合，且不能低于6位！',3000); 
        } 
        else if(password!=confirmpassword) { 
            this.refs.toast.show('两次输入的密码不一致！',3000); 
        } 
        else {
            this.setState({loading:true});
            MomEnv.callApi(forgetPassword?'api/WebApi/ForgetPassword':'api/WebApi/Register', 
              {"telephone":telephone,"password":password,"varcode":varcode},
              (responseData)=>{
                  this.setState({loading:false});
                  if(responseData){
                      if(responseData.status=="success"){  
                          MomEnv.saveProfile({"telephone":telephone,"password":password});
                          this.props.navigator.replace({id:'main'})
                      }else{
                          this.refs.toast.show(responseData.message,3000); 
                      }
                  }else{
                      this.refs.toast.show('网络异常！',3000); 
                  }
              });            
        } 
    }

    varcode(){
        let{telephone} = this.state;
        let{forgetPassword} = this.props;
        var telReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
        if(!telReg.test(telephone)) { 
            this.refs.toast.show(' 请输入有效的手机号码！ ',3000); 
        }
        else {
            this.setState({countdown:60});
            this.setCountdownTimeout();
            MomEnv.callApi('api/WebApi/GetVerificationCode', 
              {"telephone": telephone,"usetype":forgetPassword?2:1},
              (responseData)=>{
                  if(responseData){
                      if(responseData.status=="success"){
                          this.setState({varcode:responseData.result,servervarcode:responseData.result});
                      }else{
                          this.setState({countdown:0});
                          this.refs.toast.show(responseData.message,3000); 
                      }
                  }else{
                      this.setState({countdown:0});
                      this.refs.toast.show('网络异常！',3000); 
                  }
              });            
        } 
    }

    setCountdownTimeout() {
        this.timer = setTimeout(() => {
            let {countdown} = this.state;
            if(countdown>0){
                this.setState({countdown:countdown-1});
                this.setCountdownTimeout();
            } 
        }, 1000);
    }

    render() {
        let{telephone,varcode,password,confirmpassword,agree,loading,countdown} = this.state;
        let{navigator,forgetPassword} = this.props;
        return (
          <Container>
            <Nav title={forgetPassword?'忘记密码':'用户注册'}/>
            <Advertisement/>
            <View style={{flex:2,alignSelf:'stretch',alignItems:'center',justifyContent:'center'}}>
                <View style={{alignSelf:'stretch',flex:1}}>
                </View>
                <View style={{alignSelf:'stretch',height:200,backgroundColor:'#fff'}}>
                   <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:14,marginLeft:10,width:80}}>{'手机号码'}</Text>
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
                      <Text style={{fontSize:14,marginLeft:10,width:80}}>{'短信验证码'}</Text>
                      <TextInput 
                      style={{flex:1,fontSize:16,padding: 0}} 
                      underlineColorAndroid="transparent" 
                      placeholder='请输入短信验证码' 
                      placeholderTextColor='#ddd' 
                      value={varcode}
                      onChangeText={(text) => {this.setState({varcode:text})}}    
                      />
                      {
                          countdown>0?
                          (<View style={{backgroundColor:'#ccc',width:90,padding:5,marginRight:5,borderRadius:3,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontSize:12 }}>{'重新获取('+countdown+')'}</Text>
                           </View>)
                          :
                          (<TouchableOpacity onPress={this.varcode.bind(this)}>
                             <View style={{backgroundColor:MomEnv.MAIN_COLOR,width:90,padding:5,marginRight:5,borderRadius:3,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontSize:12 }}>{'获取验证码'}</Text>
                             </View>
                          </TouchableOpacity>)
                      }                     
                   </View>
                   <View style={{alignSelf:'stretch',height:1,backgroundColor:'#f2f2f2'}}>
                   </View>
                   <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:14,marginLeft:10,width:80}}>{forgetPassword?'新密码':'密码'}</Text>
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
                   <View style={{alignSelf:'stretch',height:1,backgroundColor:'#f2f2f2'}}>
                   </View>
                   <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:14,marginLeft:10,width:80}}>{forgetPassword?'新密码确认':'密码确认'}</Text>
                      <TextInput 
                      style={{flex:1,fontSize:16,padding: 0}} 
                      underlineColorAndroid="transparent" 
                      placeholder='请再次输入密码' 
                      placeholderTextColor='#ddd' 
                      secureTextEntry={true} 
                      value={confirmpassword}
                      onChangeText={(text) => {this.setState({confirmpassword:text})}}    
                      />
                   </View>
                </View>
                <View style={{flexDirection: 'row',height:60,alignSelf:'stretch',alignItems:'center',justifyContent:'flex-start'}}>
                        <TouchableOpacity onPress={()=>{this.setState({agree:!agree})}}>
                             <View style={{width:18,height:18,marginLeft:10,marginRight:10,borderRadius:3,borderWidth:1,alignItems:'center',justifyContent:'center',
                                 ...agree?{borderColor:MomEnv.MAIN_COLOR}:{borderColor:'#ccc'}}}>
                                  <Text style={{fontSize:12,color:MomEnv.MAIN_COLOR}}>{agree?'√ ':''}</Text>
                             </View>
                         </TouchableOpacity>
                         <TouchableOpacity onPress={()=>{this.setState({agree:!agree})}}>
                             <Text style={{fontSize:14 }}>{'同意 '}</Text>
                         </TouchableOpacity>
                         <TouchableOpacity onPress={()=>{
                           this.props.navigator.push({
                             component: Consent,
                             passProps: {title:'用户协议'}
                           });
                         }}>
                             <Text style={{fontSize:14,textDecorationLine:'underline' }}>{'智能快递柜系统用户协议'}</Text>
                         </TouchableOpacity>
                </View>
                <View style={{alignSelf:'stretch',flex:4,alignItems:'center',justifyContent:'center'}}>
                    {
                        agree
                        ?
                        (<TouchableOpacity onPress={this.register.bind(this)}>
                             <View style={{backgroundColor:MomEnv.MAIN_COLOR,height:40,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontSize:16 }}>{forgetPassword?'重置密码':'注 册'}</Text>
                             </View>
                          </TouchableOpacity>)
                        :
                        (<View style={{backgroundColor:'#ccc',height:40,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'#fff',fontSize:16 }}>{forgetPassword?'重置密码':'注 册'}</Text>
                        </View>)
                    }
                    
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