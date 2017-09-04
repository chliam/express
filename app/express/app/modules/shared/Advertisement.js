'use strict';
import React, { Component } from 'react';
import {
    Image,
    View,
    Dimensions,
    StatusBar,
    Platform,
    } from 'react-native';

import MomEnv from './../config/Environment';

const {width, height} = Dimensions.get('window');

//<Image style={[{flex:1,width:width},this.props.style]} resizeMode="stretch" source={require('./../../../assets/ad24.png')}/>

export default class Advertisement extends Component{
    render(){
        return (         
          <View style={[{flex:1,width:width,backgroundColor:MomEnv.NAVBAR_BG_COLOR,alignItems:'center',justifyContent:'center'},this.props.style]}>
            <Image style={{width:width-20,flex:1}} resizeMode="contain" source={require('./../../../assets/title.png')}/>
          </View>
    );
  }
}