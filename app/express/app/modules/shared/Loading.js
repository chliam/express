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
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native';

let {width, height} = Dimensions.get('window');

export default class loading extends Component{
    constructor(props){
        super(props);
    }

    render() {
        if(this.props.loading){
              return (
                <View style={{position:'absolute',left:0,top:0,width:width,height:height,alignItems:'center',justifyContent:'center'}}>
                    <View style={{width:80,height:80,borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:'#00000066'}}>
                        <ActivityIndicator
                           animating={true}
                           style={{height:80,width:80}}
                           size="large"
                           color="#fff" 
                         />
                    </View>
                </View>
              );
           }else{
                  return(<View/>);
           }
    }
}