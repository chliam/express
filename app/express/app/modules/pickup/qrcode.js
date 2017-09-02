import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Navigator,
  BackAndroid,
  Platform,
  TouchableOpacity
} from 'react-native';


import MomEnv from './../config/Environment';
import Container from './../shared/Container';
import QRCode from 'react-native-qrcode';

export default class qrcode extends Component{
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
                <View style={{flex:1,alignSelf:'stretch',backgroundColor:MomEnv.MAIN_COLOR}}>
                   <View style={{flexDirection:'row',alignSelf:'stretch',height:40,alignItems:'center',justifyContent:'space-between' }}>
                       <TouchableOpacity onPress={()=>{this.props.navigator.pop()}} style={{padding:5}}>
                                      <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:10,height:16,marginLeft:5,marginRight:5,tintColor:'#fff'}} />
                       </TouchableOpacity>               
                       <Text style={{color:'#fff',fontSize:14 }}>{'二维码取件'}</Text>
                       <View style={{width:30}}></View>
                   </View>
                   <View style={{alignSelf:'stretch',flex:3,margin:10,alignItems:'center',justifyContent:'space-between',backgroundColor:'#fff',borderRadius:5}}>
                      <View style={{alignSelf:'stretch',height:48,alignItems:'center',justifyContent:'center',backgroundColor:'#fbfbfb',borderTopLeftRadius:5,borderTopRightRadius:5}}>
                         <Text>{'请将此二维码对准箱体扫描设备,此二维码切勿泄露!'}</Text>
                      </View>
                      <QRCode
                         value={this.props.scid}
                         size={200}
                         bgColor='#000'
                         fgColor='#fff'/>
                      <View style={{height:48,alignSelf:'stretch'}}></View>
                   </View>   
                   <View style={{flex:1,alignSelf:'stretch'}}></View>
              </View>
          </Container>
        );
    }
}