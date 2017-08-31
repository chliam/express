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

export default class mine extends Component{
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
                <View style={{flex:2}}>
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
                      <View style={{alignSelf:'stretch',height:1,backgroundColor:'#f6f6f6'}}>
                      </View>
                   </View>
                   <View style={{alignSelf:'stretch',height:52,backgroundColor:'#f6f6f6',flexDirection: 'row',alignItems:'center'}}>
                     <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'flex-start'}}>                      
                         <View style={{flex:1,alignItems:'center',justifyContent:'center',borderColor:MomEnv.MAIN_COLOR,borderBottomWidth:1}}>
                              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                   <Text style={{color:MomEnv.MAIN_COLOR,fontSize:16}}>{'待取包裹'}</Text>
                              </View>                           
                         </View>
                         <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                              <Text style={{color:'#aaa',fontSize:16}}>{'取件历史'}</Text>
                         </View>
                      </View>
                   </View>                
              </View>
              <View style={{height:60}}></View>
          </Container>
        );
    }
}