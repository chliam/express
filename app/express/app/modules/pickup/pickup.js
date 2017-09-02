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
import Advertisement from './../shared/Advertisement';
import QRCode from './qrcode';
import QRScanner from './qrscanner';

export default class pickup extends Component{
    constructor(props){
        super(props);
        this.state = {
            scid:''
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {
    }

    render() {
        let {scid} = this.state;
        return (
          <Container>
                <Advertisement/>
                <View style={{flex:2}}>
                   <View style={{alignSelf:'stretch',height:44,backgroundColor:'#fff'}}>
                     <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'flex-start'}}>                      
                         <TextInput 
                         style={{flex:1,fontSize:16,marginLeft:10,padding: 0}} 
                         underlineColorAndroid="transparent" 
                         placeholder='输入或扫描单号' 
                         placeholderTextColor='#ddd' 
                         keyboardType='phone-pad' 
                         value={scid}
                         onChangeText={(text) => {this.setState({scid:text.replace(/\s/g, '')})}} 
                         />
                         <TouchableOpacity onPress={()=>{
                            this.props.navigator.push({
                               component: QRScanner,
                               passProps: {scid:'KD00001'}
                            });
                         }}>
                            <Image resizeMode="cover" source={require('./../../../assets/scan.png')} style={{width:24,height:24,marginLeft:10,marginRight:10,tintColor:MomEnv.MAIN_COLOR}} />
                         </TouchableOpacity>
                      </View>
                      <View style={{alignSelf:'stretch',height:1,backgroundColor:'#f6f6f6'}}>
                      </View>
                   </View>
                   <View style={{alignSelf:'stretch',height:44,flexDirection: 'row',alignItems:'center',backgroundColor:'#f3f3f3'}}>
                     <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'flex-start'}}>                      
                         <View style={{flex:1,alignItems:'center',justifyContent:'center',borderColor:MomEnv.MAIN_COLOR,borderBottomWidth:1}}>
                              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                   <Text style={{color:MomEnv.MAIN_COLOR,fontSize:16}}>{'待取包裹'}</Text>
                              </View>                           
                         </View>
                         <View style={{width:1,backgroundColor:'#ccc',height:16}}></View>
                         <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                   <Text style={{color:'#aaa',fontSize:16}}>{'取件历史'}</Text>
                              </View>                           
                         </View>
                      </View>
                   </View>  
                   <View style={{flex:1,alignSelf:'stretch'}}>
                        <ScrollView>
                            <TouchableOpacity onPress={()=>{
                              this.props.navigator.push({
                                component: QRCode,
                                passProps: {scid:'KD00001'}
                              });
                            }}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:48,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10,backgroundColor:'#fff'}}>
                                   <View style={{flex:1,marginRight:10}}>
                                       <Text>{'KD2000001'}</Text>
                                       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                          <Text style={{fontSize:12,color:'#999'}}>{'中通快递 GZ006号柜'}</Text>
                                          <Text style={{fontSize:12,color:'#999'}}>{'2017-06-12 12:20'}</Text>
                                       </View>                                     
                                   </View>
                                   <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                                </View>
                            </TouchableOpacity> 
                            <TouchableOpacity onPress={()=>{}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:48,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10,backgroundColor:'#fff'}}>
                                   <View style={{flex:1,marginRight:10}}>
                                       <Text>{'KD2000001'}</Text>
                                       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                          <Text style={{fontSize:12,color:'#999'}}>{'中通快递 GZ006号柜'}</Text>
                                          <Text style={{fontSize:12,color:'#999'}}>{'2017-06-12 12:20'}</Text>
                                       </View>                                     
                                   </View>
                                   <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                                </View>
                            </TouchableOpacity> 
                            <TouchableOpacity onPress={()=>{}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:48,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10,backgroundColor:'#fff'}}>
                                   <View style={{flex:1,marginRight:10}}>
                                       <Text>{'KD2000001'}</Text>
                                       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                          <Text style={{fontSize:12,color:'#999'}}>{'中通快递 GZ006号柜'}</Text>
                                          <Text style={{fontSize:12,color:'#999'}}>{'2017-06-12 12:20'}</Text>
                                       </View>                                     
                                   </View>
                                   <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                                </View>
                            </TouchableOpacity> 
                            <TouchableOpacity onPress={()=>{}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:48,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10,backgroundColor:'#fff'}}>
                                   <View style={{flex:1,marginRight:10}}>
                                       <Text>{'KD2000001'}</Text>
                                       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                          <Text style={{fontSize:12,color:'#999'}}>{'中通快递 GZ006号柜'}</Text>
                                          <Text style={{fontSize:12,color:'#999'}}>{'2017-06-12 12:20'}</Text>
                                       </View>                                     
                                   </View>
                                   <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                                </View>
                            </TouchableOpacity> 
                            <TouchableOpacity onPress={()=>{}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:48,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10,backgroundColor:'#fff'}}>
                                   <View style={{flex:1,marginRight:10}}>
                                       <Text>{'KD2000001'}</Text>
                                       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                          <Text style={{fontSize:12,color:'#999'}}>{'中通快递 GZ006号柜'}</Text>
                                          <Text style={{fontSize:12,color:'#999'}}>{'2017-06-12 12:20'}</Text>
                                       </View>                                     
                                   </View>
                                   <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                                </View>
                            </TouchableOpacity> 
                                <TouchableOpacity onPress={()=>{}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:48,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10,backgroundColor:'#fff'}}>
                                   <View style={{flex:1,marginRight:10}}>
                                       <Text>{'KD2000001'}</Text>
                                       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                          <Text style={{fontSize:12,color:'#999'}}>{'中通快递 GZ006号柜'}</Text>
                                          <Text style={{fontSize:12,color:'#999'}}>{'2017-06-12 12:20'}</Text>
                                       </View>                                     
                                   </View>
                                   <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                                </View>
                            </TouchableOpacity> 
                                <TouchableOpacity onPress={()=>{}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:48,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10,backgroundColor:'#fff'}}>
                                   <View style={{flex:1,marginRight:10}}>
                                       <Text>{'KD2000001'}</Text>
                                       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                          <Text style={{fontSize:12,color:'#999'}}>{'中通快递 GZ006号柜'}</Text>
                                          <Text style={{fontSize:12,color:'#999'}}>{'2017-06-12 12:20'}</Text>
                                       </View>                                     
                                   </View>
                                   <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                                </View>
                            </TouchableOpacity> 
                                <TouchableOpacity onPress={()=>{}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:48,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10,backgroundColor:'#fff'}}>
                                   <View style={{flex:1,marginRight:10}}>
                                       <Text>{'KD2000001'}</Text>
                                       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                          <Text style={{fontSize:12,color:'#999'}}>{'中通快递 GZ006号柜'}</Text>
                                          <Text style={{fontSize:12,color:'#999'}}>{'2017-06-12 12:20'}</Text>
                                       </View>                                     
                                   </View>
                                   <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                                </View>
                            </TouchableOpacity> 
                       </ScrollView>
                   </View>
              </View>
              <View style={{height:48}}></View>
          </Container>
        );
    }
}