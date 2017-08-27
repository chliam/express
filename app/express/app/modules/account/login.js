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
  Image
} from 'react-native';


import MomEnv from './../config/Environment';
import Container from './../shared/Container';

export default class login extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    componentWillUnmount() {
    }

    componentDidMount() {
    }

    render() {
        return (
          <Container>
            <View style={{alignSelf:'stretch',height:52,alignItems:'center',justifyContent:'center' }}>
                <Text style={{color:'#fff',fontSize:18 }}>{'登录'}</Text>
            </View>
            <Image style={{flex:1,alignSelf:'stretch'}} resizeMode="stretch" source={require('./../../../assets/ad4.png')}/>
            <View style={{flex:2,alignSelf:'stretch',backgroundColor:'#fff'}}>
                
            </View>
                   
          </Container>
        );
    }
}