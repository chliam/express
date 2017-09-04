import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  StyleSheet,
  Text,
  View,
  Image,
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
import Query from './query';

export default class home extends Component{
    constructor(props){
        super(props);
        this.state = {
            expressid:''
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {
    }

    gotoQuery(expressid){
        this.props.navigator.push({
            component: Query,
            passProps: {expressid:expressid}
        });
    }

    gotoPickup(expressid){
        if(this.props.gotoPickup){
            this.props.gotoPickup(expressid);
        }
    }

    gotoWaiting(){
        this.props.navigator.push({
            component: Waiting,
            passProps: {title:'寄件'}
        });
    }

    _onGetBarcode(expressid){
        this.setState({expressid:expressid});
    }

    // <View style={{alignSelf:'stretch',height:44,backgroundColor:'#fff'}}>
    //  <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'flex-start'}}>                      
    //     <TextInput 
    //     style={{flex:1,fontSize:16,marginLeft:10,padding: 0}} 
    //     underlineColorAndroid="transparent" 
    //     placeholder='输入或扫描单号' 
    //     placeholderTextColor='#ddd' 
    //     value={expressid}
    //     onChangeText={(text) => {this.setState({expressid:text.replace(/\s/g, '')})}} 
    //     />
    //     <TouchableOpacity onPress={()=>{
    //           this.props.navigator.push({
    //         component: QRScanner,
    //         passProps: {onGetBarcode:this._onGetBarcode.bind(this),navigator:this.props.navigator}
    //     });
    //     }}>
    //           <Image resizeMode="cover" source={require('./../../../assets/scan.png')} style={{width:24,height:24,marginLeft:10,marginRight:10,tintColor:MomEnv.MAIN_COLOR}} />
    //     </TouchableOpacity>
    //  </View>
    //  <View style={{alignSelf:'stretch',height:1,backgroundColor:'#f2f2f2'}}>
    //  </View>
    //</View>

    render() {
        let {expressid} = this.state;
        return (
          <Container>
              <Advertisement/>
              <View style={{flex:2,alignSelf:'stretch',alignItems:'center',justifyContent:'flex-start'}}>
                 
                 <View style={{alignSelf:'stretch',flex:1,alignItems:'center',justifyContent:'center'}}>
                     <View style={{flex:1}}></View>
                     <View style={{flexDirection:'row',alignSelf:'stretch',alignItems:'center',justifyContent:'space-around'}}>                                               
                     <TouchableOpacity onPress={this.gotoQuery.bind(this,expressid)}>
                         <View style={{alignItems:'center',justifyContent:'center',width:80,height:80,backgroundColor:'#fff',borderRadius:5}}>
                           <Image resizeMode="cover" source={require('./../../../assets/search.png')} style={{width:24,height:24,marginBottom:5,tintColor:MomEnv.MAIN_COLOR}} />
                           <Text style={{fontSize:14,color:'#666'}}>{'查件'}</Text>
                        </View>
                     </TouchableOpacity>                         
                      <TouchableOpacity onPress={this.gotoPickup.bind(this,expressid)}>
                        <View style={{alignItems:'center',justifyContent:'center',width:80,height:80,backgroundColor:'#fff',borderRadius:5}}>
                           <Image resizeMode="cover" source={require('./../../../assets/tabPickup.png')} style={{width:24,height:24,marginBottom:5,tintColor:MomEnv.MAIN_COLOR}} />
                           <Text style={{fontSize:14,color:'#666'}}>{'取件'}</Text>
                        </View>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={this.gotoWaiting.bind(this)}>
                         <View style={{alignItems:'center',justifyContent:'center',width:80,height:80,backgroundColor:'#fff',borderRadius:5}}>
                           <Image resizeMode="cover" source={require('./../../../assets/sendbox.png')} style={{width:24,height:24,marginBottom:5,tintColor:MomEnv.MAIN_COLOR}} />
                           <Text style={{fontSize:14,color:'#666'}}>{'寄件'}</Text>
                        </View>
                     </TouchableOpacity>
                        
                     </View>
                     <View style={{flex:4}}></View>
                 </View>
              </View>
              <View style={{height:48}}></View>
          </Container>
        );
    }
}