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
let {width, height} = Dimensions.get('window');

export default class register extends Component{
    constructor(props){
        super(props);
        this.state = {
            telephone:'',
            password:'',
            agree:false
        };
    }

    componentWillUnmount() {
    }

    componentDidMount() {
    }

    render() {
        let{telephone,password,agree} = this.state;
        let{navigator,forgetPassword} = this.props;
        return (
          <Container>
            <View style={{alignSelf:'stretch',height:48,alignItems:'center',justifyContent:'center' }}>
                <Text style={{color:'#333',fontSize:20,fontWeight: 'bold' }}>{forgetPassword?'忘记密码':'用户注册'}</Text>
            </View>
             <Advertisement/>
            <View style={{flex:2,alignSelf:'stretch',alignItems:'center',justifyContent:'center'}}>
                <View style={{alignSelf:'stretch',flex:1}}>
                </View>
                <View style={{alignSelf:'stretch',height:200,backgroundColor:'#fff'}}>
                   <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                      <Text style={{fontSize:16,marginLeft:10,width:80}}>{'手机号码'}</Text>
                      <TextInput 
                      style={{flex:1,fontSize:18}} 
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
                   <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                      <Text style={{fontSize:16,marginLeft:10,width:80}}>{'短信验证码'}</Text>
                      <TextInput 
                      style={{flex:1,fontSize:18}} 
                      underlineColorAndroid="transparent" 
                      placeholder='请输入短信验证码' 
                      placeholderTextColor='#ddd' 
                      secureTextEntry={true} 
                      value={password}
                      onChangeText={(text) => {this.setState({password:text})}}    
                      />
                   </View>
                   <View style={{alignSelf:'stretch',height:1,backgroundColor:'#f2f2f2'}}>
                   </View>
                      <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                      <Text style={{fontSize:16,marginLeft:10,width:80}}>{forgetPassword?'新密码':'密码'}</Text>
                      <TextInput 
                      style={{flex:1,fontSize:18}} 
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
                      <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                      <Text style={{fontSize:16,marginLeft:10,width:80}}>{forgetPassword?'新密码确认':'密码确认'}</Text>
                      <TextInput 
                      style={{flex:1,fontSize:18}} 
                      underlineColorAndroid="transparent" 
                      placeholder='请再次输入密码' 
                      placeholderTextColor='#ddd' 
                      secureTextEntry={true} 
                      value={password}
                      onChangeText={(text) => {this.setState({password:text})}}    
                      />
                   </View>
                </View>
                <View style={{flexDirection: 'row',height:60,alignSelf:'stretch',alignItems:'center',justifyContent:'flex-start'}}>
                         <View style={{width:18,height:18,marginLeft:10,marginRight:10,borderRadius:3,borderWidth:1,alignItems:'center',justifyContent:'center',
                             ...agree?{borderColor:MomEnv.MAIN_COLOR}:{borderColor:'#ccc'}}}>
                              <Text style={{fontSize:12,color:MomEnv.MAIN_COLOR}}>{agree?'√ ':''}</Text>
                         </View>
                         <Text style={{fontSize:16 }}>{'同意 '}</Text>
                         <TouchableOpacity onPress={()=>{this.setState({agree:!agree})}}>
                             <Text style={{fontSize:16,textDecorationLine:'underline' }}>{'智能快递柜系统用户协议'}</Text>
                         </TouchableOpacity>
                         
                </View>
                <View style={{alignSelf:'stretch',flex:4,alignItems:'center',justifyContent:'center'}}>
                    <View style={{backgroundColor:MomEnv.MAIN_COLOR,height:60,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                          <TouchableOpacity onPress={()=>{this.props.navigator.replace({id:'main'})}}>
                              <Text style={{color:'#fff',fontSize:18 }}>{forgetPassword?'重置密码':'注 册'}</Text>
                          </TouchableOpacity>
                    </View>
                </View>
                 <View style={{alignSelf:'stretch',flex:1}}>
                </View>
            </View>                   
          </Container>
        );
    }
}