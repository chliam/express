import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Navigator,
  BackAndroid,
  Platform,
  TouchableOpacity
} from 'react-native';


import MomEnv from './../config/Environment';
import Container from './../shared/Container';
import Advertisement from './../shared/Advertisement';
import QRScanner from './../pickup/qrscanner';
import Waiting from './../shared/Waiting';

export default class query extends Component{
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

    _search(){
       
    }

    render() {
        let {scid} = this.state;
        return (
          <Container>
              <View style={{flexDirection:'row',alignSelf:'stretch',height:40,alignItems:'center',justifyContent:'space-between' }}>
                     <TouchableOpacity onPress={()=>{this.props.navigator.pop()}} style={{padding:5}}>
                                    <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:10,height:16,marginLeft:5,marginRight:5,tintColor:'#444'}} />
                     </TouchableOpacity>               
                     <Text style={{color:'#444',fontSize:14 }}>{'查件'}</Text>
                     <View style={{width:30}}></View>
              </View>
              <Advertisement/>
              <View style={{flex:2,alignSelf:'stretch',alignItems:'center',justifyContent:'flex-start'}}>
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
                      <TouchableOpacity onPress={this._search.bind(this)}>
                            <Image resizeMode="cover" source={require('./../../../assets/search.png')} style={{width:20,height:20,marginLeft:10,marginRight:10,tintColor:(MomEnv.MAIN_COLOR+'ee')}} />
                      </TouchableOpacity>
                      <View style={{width:1,height:16,backgroundColor:'#f2f2f2',marginLeft:5,marginRight:5}} />
                      <TouchableOpacity onPress={()=>{
                            this.props.navigator.push({
                            component: QRScanner,
                            passProps: {scid:'KD00001'}
                        });
                      }}>
                            <Image resizeMode="cover" source={require('./../../../assets/scan.png')} style={{width:24,height:24,marginLeft:10,marginRight:10,tintColor:MomEnv.MAIN_COLOR}} />
                     </TouchableOpacity>                                         
                   </View>
                   <View style={{alignSelf:'stretch',height:1,backgroundColor:'#f2f2f2'}} />
                 </View>
                 <ScrollView style={{alignSelf:'stretch',flex:1}}>
                     <View style={{alignSelf:'stretch',margin:10,borderRadius:5,backgroundColor:'#fff',padding:10}}>
                        <View style={{flexDirection:'row',alignSelf:'stretch',height:40,alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#f2f2f2'}}>
                           <Text style={{fontWeight:'bold'}}>{'快递单号'}</Text>
                           <Text>{'KD00001'}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignSelf:'stretch',height:40,alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#f2f2f2'}}>
                           <Text style={{fontWeight:'bold'}}>{'快递公司'}</Text>
                           <Text>{'圆通物流'}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignSelf:'stretch',marginTop:10,alignItems:'center',justifyContent:'space-between'}}>
                           <Text style={{fontWeight:'bold'}}>{'物流详情'}</Text>
                           <Text></Text>
                        </View>
                        <View style={{flexDirection:'row',alignSelf:'stretch',marginTop:6,alignItems:'center'}}>
                           <Text style={{width:120,fontSize:13}}>{'2017-09-01 12:30'}</Text>
                           <Text style={{fontSize:13}}>{'发件'}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignSelf:'stretch',marginTop:6,alignItems:'center'}}>
                           <Text style={{width:120,fontSize:13}}>{'2017-09-01 12:30'}</Text>
                           <Text style={{flex:1,fontSize:13}}>{'快件离开北京站，下一张南京站再下一站上海张'}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignSelf:'stretch',marginTop:6,alignItems:'center'}}>
                           <Text style={{width:120,fontSize:13}}>{'2017-09-01 12:30'}</Text>
                           <Text style={{fontSize:13}}>{'发件'}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignSelf:'stretch',marginTop:6,alignItems:'center'}}>
                           <Text style={{width:120,fontSize:13}}>{'2017-09-01 12:30'}</Text>
                           <Text style={{fontSize:13}}>{'发件'}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignSelf:'stretch',marginTop:6,alignItems:'center'}}>
                           <Text style={{width:120,fontSize:13}}>{'2017-09-01 12:30'}</Text>
                           <Text style={{flex:1,fontSize:13}}>{'快件离开北京站，下一张南京站再下一站上海张'}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignSelf:'stretch',marginTop:6,alignItems:'center'}}>
                           <Text style={{width:120,fontSize:13}}>{'2017-09-01 12:30'}</Text>
                           <Text style={{fontSize:13}}>{'发件'}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignSelf:'stretch',marginTop:6,alignItems:'center'}}>
                           <Text style={{width:120,fontSize:13}}>{'2017-09-01 12:30'}</Text>
                           <Text style={{flex:1,fontSize:13}}>{'快件离开北京站，下一张南京站再下一站上海张'}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignSelf:'stretch',marginTop:6,alignItems:'center'}}>
                           <Text style={{width:120,fontSize:13}}>{'2017-09-01 12:30'}</Text>
                           <Text style={{fontSize:13}}>{'发件'}</Text>
                        </View>
                     </View>
                 </ScrollView>
              </View>
              <View style={{height:20}}></View>
          </Container>
        );
    }
}