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

import MomEnv,{moment} from './../config/Environment';
import Container from './../shared/Container';
import Advertisement from './../shared/Advertisement';
import QRScanner from './../pickup/qrscanner';
import Toast,{DURATION} from 'react-native-easy-toast';
import Loading from './../shared/Loading';
import Nav from './../shared/Nav';

export default class expressdetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            express:this.props.express,
            loading:false,
            logistics:null
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        if(this.state.express){
            this._load(this.state.express.id);
        }
    }

    _load(expressid){
        if(expressid.length==0) { 
            this.refs.toast.show('请输入或扫描快递单号！',3000); 
        } 
        else {
            MomEnv.getProfile().then((profile) => {
                this.setState({loading:true});
                MomEnv.callApi('api/WebApi/GetExpressDetail', 
                  {"telephone": profile.telephone,"expressid":expressid},
                  (responseData)=>{
                      this.setState({loading:false});
                      if(responseData){
                          if(responseData.status=="success"){
                              if(responseData.result.logistics){
                                  this.setState({logistics:responseData.result});
                              }else{
                                  this.setState({logistics:null});
                              }
                              
                          }else{
                              this.refs.toast.show(responseData.message,3000); 
                          }
                      }else{
                          this.refs.toast.show('网络异常！',3000); 
                      }
                  });            
            });
        } 
    }


    render() {
        let {express,loading,logistics} = this.state;
        let htmls = [];
        let items = [];
        if(express){
            items.push(
                   <View key={0} style={{flexDirection:'row',alignSelf:'stretch',height:40,alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#f2f2f2'}}>
                          <Text style={{fontWeight:'bold'}}>{'取件时间'}</Text>
                          <Text>{moment(express.outtime).format('YYYY-MM-DD HH:mm')}</Text>
                   </View>);
            items.push(
                   <View key={1} style={{flexDirection:'row',alignSelf:'stretch',height:40,alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#f2f2f2'}}>
                           <Text style={{fontWeight:'bold'}}>{'快递单号'}</Text>
                           <Text>{express.id}</Text>
                   </View>);
        }
        if(logistics){
            if(logistics.logistics){             
                items.push(
                    <View key={2} style={{flexDirection:'row',alignSelf:'stretch',height:40,alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#f2f2f2'}}>
                           <Text style={{fontWeight:'bold'}}>{'快递公司'}</Text>
                           <Text>{logistics.company||''}</Text>
                    </View>);
                items.push(
                    <View key={3} style={{flexDirection:'row',alignSelf:'stretch',alignItems:'center',justifyContent:'space-between',marginTop:10,marginBottom:3}}>
                           <Text style={{fontWeight:'bold'}}>{'物流详情'}</Text>
                           <Text>{''}</Text>
                    </View>);
               if(logistics.logisticsdetails){
                   logistics.logisticsdetails.map((item,index)=>{
                       items.push(
                         <View key={index+4} style={{flexDirection:'row',alignSelf:'stretch',marginTop:4,marginBottom:2,alignItems:'center'}}>
                           <Text style={{width:120,fontSize:13}}>{moment(item.datetime).format('YYYY-MM-DD HH:mm')}</Text>
                           <Text style={{flex:1,fontSize:13}}>{item.detail}</Text>
                        </View>
                       );
                   });
               }            
            }            
        }
        htmls.push(<View key={-1} style={{alignSelf:'stretch',margin:10,borderRadius:5,backgroundColor:'#fff',padding:10}}>{items}</View>);

        return (
          <Container>
              <Advertisement title={'取件明细'}/>
              <View style={{flex:2,alignSelf:'stretch',alignItems:'center',justifyContent:'flex-start'}}>                  
                 <ScrollView style={{alignSelf:'stretch',flex:1}}>
                   {htmls}
                 </ScrollView>
              </View>
              <View style={{height:20}}></View>
              <Loading loading={loading} />
              <Toast ref="toast"
                fadeInDuration={600}
                fadeOutDuration={600}
                opacity={0.8}
              />
          </Container>
        );
    }
}