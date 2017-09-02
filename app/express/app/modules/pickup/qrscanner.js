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
  TouchableOpacity,
  Toast
} from 'react-native';


import MomEnv from './../config/Environment';
import Container from './../shared/Container';
import {QRScannerView} from 'ac-qrcode';

export default class qrscanner extends Component{
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
          <QRScannerView
                onScanResultReceived={this.barcodeReceived.bind(this)}
                renderTopBarView={() => this._renderTitleBar()}
                renderBottomMenuView={() => this._renderMenu()}
           />
        );
    }
   
     _renderTitleBar(){
        return(
               <View style={{flexDirection:'row',alignSelf:'stretch',height:40,alignItems:'center',justifyContent:'space-between' }}>
                       <TouchableOpacity onPress={()=>{this.props.navigator.pop()}} style={{padding:5}}>
                                      <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:10,height:16,marginLeft:5,marginRight:5,tintColor:'#fff'}} />
                       </TouchableOpacity>               
                       <Text style={{color:'#fff',fontSize:14 }}>{'二维码/条码'}</Text>
                       <View style={{width:30}}></View>
                </View>
        );
    }

    _renderMenu() {
        return (<View></View> )
    }

    barcodeReceived(e) {
        //Toast.show('Type: ' + e.type + '\nData: ' + e.data);
        console.warn('Type: ' + e.type + '\nData: ' + e.data)
    }
}