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
import Nav from './Nav';

const {width, height} = Dimensions.get('window');

//<Image style={[{flex:1,width:width},this.props.style]} resizeMode="stretch" source={require('./../../../assets/ad24.png')}/>

export default class Advertisement extends Component{
    render(){
        return (           
          <View style={[{flex:1.1,width:width,backgroundColor:MomEnv.NAVBAR_BG_COLOR,alignItems:'center',justifyContent:'center'},this.props.style]}>
            <Image style={[{flex:1,width:width},this.props.style]} resizeMode="cover" source={require('./../../../assets/barner.png')}/>
            <View style={{position:'absolute',left:0,top:0,width:width,height:40}}>
                <Nav title={this.props.title} hideback={this.props.hideback}/>
            </View> 
          </View>
    );
  }
}