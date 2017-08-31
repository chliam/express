import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Navigator,
  BackAndroid,
  Platform,
  ToastAndroid
} from 'react-native';


import MomEnv from './../config/Environment';
import Container from './../shared/Container';
import Advertisement from './../shared/Advertisement';

export default class home extends Component{
    constructor(props){
        super(props);
        this.state = {
            scid:''
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {
    }

    render() {
        let {scid} = this.state;
        return (
          <Container>
              <Advertisement/>
              <View style={{flex:2,alignSelf:'stretch',alignItems:'center',justifyContent:'flex-start'}}>
                  <View style={{alignSelf:'stretch',height:52,backgroundColor:'#fff'}}>
                   <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'flex-start'}}>                      
                      <TextInput 
                      style={{flex:1,fontSize:16,marginLeft:10}} 
                      underlineColorAndroid="transparent" 
                      placeholder='输入或扫描单号' 
                      placeholderTextColor='#ddd' 
                      keyboardType='phone-pad' 
                      value={scid}
                      onChangeText={(text) => {this.setState({scid:text.replace(/\s/g, '')})}} 
                      />
                      <Image resizeMode="cover" source={require('./../../../assets/scan.png')} style={{width:24,height:24,marginLeft:10,marginRight:10,tintColor:MomEnv.MAIN_COLOR}} />
                   </View>
                   <View style={{alignSelf:'stretch',height:1,backgroundColor:'#f2f2f2'}}>
                   </View>
                 </View>
                 <View style={{alignSelf:'stretch',flex:1,alignItems:'center',justifyContent:'center'}}>
                     <View style={{flex:1}}></View>
                     <View style={{flexDirection:'row',alignSelf:'stretch',alignItems:'center',justifyContent:'space-around'}}>
                        <View style={{alignItems:'center',justifyContent:'center',width:80,height:80,backgroundColor:'#fff',borderRadius:5}}>
                           <Image resizeMode="cover" source={require('./../../../assets/search.png')} style={{width:24,height:24,marginBottom:5,tintColor:MomEnv.MAIN_COLOR}} />
                           <Text style={{fontSize:14,color:'#666'}}>{'查件'}</Text>
                        </View>
                        <View style={{alignItems:'center',justifyContent:'center',width:80,height:80,backgroundColor:'#fff',borderRadius:5}}>
                           <Image resizeMode="cover" source={require('./../../../assets/tabPickup.png')} style={{width:24,height:24,marginBottom:5,tintColor:MomEnv.MAIN_COLOR}} />
                           <Text style={{fontSize:14,color:'#666'}}>{'取件'}</Text>
                        </View>
                        <View style={{alignItems:'center',justifyContent:'center',width:80,height:80,backgroundColor:'#fff',borderRadius:5}}>
                           <Image resizeMode="cover" source={require('./../../../assets/sendbox.png')} style={{width:24,height:24,marginBottom:5,tintColor:MomEnv.MAIN_COLOR}} />
                           <Text style={{fontSize:14,color:'#666'}}>{'寄件'}</Text>
                        </View>
                     </View>
                     <View style={{flex:3}}></View>
                 </View>
              </View>
              <View style={{height:60}}></View>
          </Container>
        );
    }
}