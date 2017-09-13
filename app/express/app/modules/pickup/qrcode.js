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
  Alert
} from 'react-native';


import MomEnv from './../config/Environment';
import Container from './../shared/Container';
import QRCode from 'react-native-qrcode';
import Nav from './../shared/Nav';

export default class qrcode extends Component{
    constructor(props){
        super(props);
        this.state = {
            expressid:this.props.expressid||'',
            datetime:new Date()
        };
        this._queryOpenStatus = this._queryOpenStatus.bind(this);
    }

    componentWillMount() {
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.timer == null;
    }

    componentDidMount() {
        this.timer = setTimeout(this._queryOpenStatus,5000); 
    }

    _queryOpenStatus(){
        let {expressid,datetime} = this.state;
        MomEnv.callApi('api/WebApi/QueryScanOpenStatus', 
                 {"scantime": datetime,"expressid":expressid},
                 (responseData)=>{
                     this.setState({loading:false});
                     if(responseData){
                         if(responseData.status=="success"){
                             if(responseData.result.open){
                                 Alert.alert('提示','取件成功，请关闭箱门',[{text: '知道了', onPress: () => {
                                     if(this.props.onopen){
                                         this.props.onopen();
                                     }
                                     this.props.navigator.pop();
                                 }}]);
                             }else{
                                 if(this.timer){
                                     this.timer = setTimeout(this._queryOpenStatus,5000);
                                 }                                 
                             }                              
                         }else{
                             if(this.timer){
                                 this.timer = setTimeout(this._queryOpenStatus,5000);
                             }  
                         }
                     }else{
                         if(this.timer){
                             this.timer = setTimeout(this._queryOpenStatus,5000);
                         }  
                     }
                 });            
    }

    render() {
        return (
          <Container>
                <View style={{flex:1,alignSelf:'stretch',backgroundColor:MomEnv.NAVBAR_BG_COLOR}}>
                   <Nav title={'二维码取件'}/>
                   <View style={{alignSelf:'stretch',flex:3,margin:10,alignItems:'center',justifyContent:'space-between',backgroundColor:'#fff',borderRadius:5}}>
                      <View style={{alignSelf:'stretch',height:48,alignItems:'center',justifyContent:'center',backgroundColor:'#fbfbfb',borderTopLeftRadius:5,borderTopRightRadius:5}}>
                         <Text>{'请将此二维码对准箱体扫描设备,此二维码切勿泄露!'}</Text>
                      </View>
                      <QRCode
                         value={this.props.barcode}
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