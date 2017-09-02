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
  TouchableOpacity
} from 'react-native';


import MomEnv from './../config/Environment';
import Container from './../shared/Container';
import Advertisement from './../shared/Advertisement';

export default class waiting extends Component{
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
             <View style={{flexDirection:'row',alignSelf:'stretch',height:40,alignItems:'center',justifyContent:'space-between' }}>
                     <TouchableOpacity onPress={()=>{this.props.navigator.pop()}} style={{padding:5}}>
                                    <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:10,height:16,marginLeft:5,marginRight:5,tintColor:'#444'}} />
                     </TouchableOpacity>               
                     <Text style={{color:'#444',fontSize:14 }}>{this.props.title}</Text>
                     <View style={{width:30}}></View>
              </View>
              <Advertisement/>
              <View style={{flex:2,alignItems:'center',padding:20,backgroundColor:'#fff'}}> 
                  <Text>{'敬请期待...'}</Text>
              </View>              
          </Container>
        );
    }
}