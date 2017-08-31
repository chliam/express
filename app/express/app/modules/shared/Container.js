'use strict';
import React, { Component } from 'react';
import {
    Image,
    View,
    Dimensions,
    StatusBar,
    Platform,
    } from 'react-native';

const {width, height} = Dimensions.get('window');

//<Image
//   resizeMode="cover"
//   source={require('./../../../assets/bg_new.png')}
//   style={[{width: width, height: height}, this.props.style]}>
//             {this.props.children}
//</Image>

export default class Container extends Component{
  render(){
    return (
      <View style={[{width:width, height: height,backgroundColor:'#efefef'}, this.props.style]}>
           {this.props.children}
      </View>
    );
  }
}
