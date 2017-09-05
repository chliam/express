'use strict';
import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    Dimensions,
    StatusBar,
    Platform,
    TouchableOpacity
    } from 'react-native';

import MomEnv from './../config/Environment';
const {width, height} = Dimensions.get('window');

export default class nav extends Component{
    render(){
        return (         
          <View style={[{flexDirection:'row',alignSelf:'stretch',height:40,alignItems:'center',justifyContent:'space-between'},this.props.style]}>
                {
                    this.props.hideback
                    ?
                    (<View style={{width:30}}></View>)
                    :
                    (<TouchableOpacity onPress={()=>{MomEnv.getNavigator().pop()}} style={{padding:10}}>
                         <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:10,height:16,marginLeft:5,marginRight:5,tintColor:MomEnv.NAVBAR_TITLE_COLOR}} />
                     </TouchableOpacity>)
                }             
                <Text style={{color:MomEnv.NAVBAR_TITLE_COLOR,fontSize:14}}>{this.props.title}</Text>
                <View style={{width:30}}></View>
          </View>
    );
  }
}