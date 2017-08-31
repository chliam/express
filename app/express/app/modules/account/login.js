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

export default class login extends Component{
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
        return (
          <Container>
            <View style={{alignSelf:'stretch',height:48,alignItems:'center',justifyContent:'center' }}>
                <Text style={{color:'#333',fontSize:20,fontWeight: 'bold' }}>{'登录'}</Text>
            </View>
            <Advertisement/>
            <View style={{flex:2,alignSelf:'stretch',alignItems:'center',justifyContent:'center'}}>
                <View style={{alignSelf:'stretch',flex:1}}>
                </View>
                <View style={{alignSelf:'stretch',height:120,backgroundColor:'#fff'}}>
                   <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'flex-start'}}>
                      <Image resizeMode="cover" source={require('./../../../assets/head.png')} style={{width:18,height:18,marginLeft:10,marginRight:10,tintColor:'#ccc'}} />
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
                      <Image resizeMode="cover" source={require('./../../../assets/lock.png')} style={{width:18,height:18,marginLeft:10,marginRight:10,tintColor:'#ccc'}} />
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
                              <Text style={{color:'#fff',fontSize:18 }}>{'登 录'}</Text>
                          </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row',height:60,width:0.8*width,alignItems:'center',justifyContent:'space-between'}}>
                         <TouchableOpacity onPress={()=>{this.props.navigator.push({id:'register',forgetPassword:false})}}>
                           <Text style={{fontSize:16,textDecorationLine:'underline'}}>{'我要注册'}</Text>
                         </TouchableOpacity>
                         <TouchableOpacity onPress={()=>{this.props.navigator.push({id:'register',forgetPassword:true})}}>
                           <Text style={{fontSize:16,textDecorationLine:'underline'}}>{'忘记密码'}</Text>
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