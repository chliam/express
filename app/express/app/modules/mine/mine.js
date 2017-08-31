import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  BackAndroid,
  Platform,
  ToastAndroid
} from 'react-native';


import MomEnv from './../config/Environment';
import Container from './../shared/Container';

export default class mine extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {
    }

    render() {
        return (
          <Container>
              <View style={{flex:1,backgroundColor:MomEnv.MAIN_COLOR,alignItems:'center',justifyContent:'center'}}>
                  <View style={{width:90,height:90,borderRadius:45,backgroundColor:'#fff',overflow :'hidden',alignItems:'center',justifyContent:'center'}}>
                     <Image resizeMode="cover" source={require('./../../../assets/userhead.png')} style={{width:60,height:60}} />
                  </View>               
              </View>
              <View style={{flex:2}}>                  
              </View>
              <View style={{height:60}}></View>
          </Container>
        );
    }
}