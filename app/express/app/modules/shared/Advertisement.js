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


export default class Advertisement extends Component{
    render(){
        return (
          <Image style={[{flex:1,width:width},this.props.style]} resizeMode="stretch" source={require('./../../../assets/ad9.png')}/>
    );
}
}