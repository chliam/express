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
  TouchableOpacity,
  Dimensions
} from 'react-native';

import MomEnv,{moment} from './../config/Environment';
import Container from './../shared/Container';
import Advertisement from './../shared/Advertisement';
import QRScanner from './../pickup/qrscanner';
import Toast,{DURATION} from 'react-native-easy-toast';
import Loading from './../shared/Loading';
import Nav from './../shared/Nav';
import ModalDropdown from 'react-native-modal-dropdown';
let {width, height} = Dimensions.get('window');

export default class query extends Component{
    constructor(props){
        super(props);
        this.state = {
            expressid:this.props.expressid||'',
            loading:false,
            logistics:null,
            companys:[{id:'',name:'--请选择快递公司--'}],
            companyindex:0
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        this._loadCompanys();
    }

    _loadCompanys(){
        this.setState({loading:true});
        MomEnv.callApi('api/WebApi/GetCompanys', 
          {"telephone": ""},
          (responseData)=>{
              this.setState({loading:false});
              if(responseData){
                  if(responseData.status=="success"){
                      if(responseData.result.companys){
                          responseData.result.companys.splice(0,0,{id:'',name:'--请选择快递公司--'})
                          this.setState({companys:responseData.result.companys});
                      }         
                  }
              }
          });         
    }

    _search(expressid){
        let {companys,companyindex} = this.state;
        if(expressid.length==0) { 
            this.refs.toast.show('请输入或扫描快递单号！',3000); 
        } 
        else {
            let company = companys[companyindex];
            MomEnv.getProfile().then((profile) => {
                this.setState({loading:true});
                MomEnv.callApi('api/WebApi/FindOneExpress', 
                  {"telephone": profile.telephone,"expressid":expressid,"companyid":company.id},
                  (responseData)=>{
                      this.setState({loading:false});
                      if(responseData){
                          if(responseData.status=="success"){
                              if(responseData.result.logistics){
                                  this.setState({logistics:responseData.result});
                              }else{
                                  this.refs.toast.show(' 抱歉，未找到单据！ ',3000); 
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

    _onGetBarcode(expressid){
        this.setState({expressid:expressid});
        this._search(expressid);
    }

    render() {
        let {expressid,loading,logistics,companys,company} = this.state;
        let companynames = [];
        if(companys){
            companys.map((item)=>{
                companynames.push(item.name);
            });
        }
        let htmls = [];
        if(logistics){
            if(logistics.logistics){
                let items = [];
                items.push(
                    <View key={1} style={{flexDirection:'row',alignSelf:'stretch',height:40,alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#f2f2f2'}}>
                           <Text style={{fontWeight:'bold'}}>{'快递单号'}</Text>
                           <Text>{logistics.logistics.id}</Text>
                    </View>);
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
 
              htmls.push(<View key={-1} style={{alignSelf:'stretch',margin:10,borderRadius:5,backgroundColor:'#fff',padding:10}}>{items}</View>);
            }            
        }

        return (
          <Container>
              <Advertisement title={'查件'}/>
              <View style={{flex:2,alignSelf:'stretch',alignItems:'center',justifyContent:'flex-start'}}>
                  <View style={{alignSelf:'stretch',height:44,backgroundColor:'#fff'}}>
                   <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'flex-start'}}>                      
                      <TextInput 
                      style={{flex:1,fontSize:16,marginLeft:10,padding: 0}} 
                      underlineColorAndroid="transparent" 
                      placeholder='输入或扫描单号' 
                      placeholderTextColor='#ddd' 
                      value={expressid}
                      onChangeText={(text) => {this.setState({expressid:text.replace(/\s/g, '')})}} 
                      />                      
                      <TouchableOpacity onPress={()=>{
                            this.props.navigator.push({
                            component: QRScanner,
                            passProps: {onGetBarcode:this._onGetBarcode.bind(this),navigator:this.props.navigator}
                        });
                      }}>
                            <Image resizeMode="cover" source={require('./../../../assets/scan.png')} style={{width:24,height:24,marginLeft:10,marginRight:10,tintColor:MomEnv.MAIN_COLOR}} />
                     </TouchableOpacity>                                         
                   </View>
                   <View style={{alignSelf:'stretch',height:1,backgroundColor:'#f2f2f2'}} />
                 </View>
                  <View style={{alignSelf:'stretch',height:44,backgroundColor:'#fff'}}>
                   <View style={{flexDirection: 'row',flex:1,alignItems:'center',justifyContent:'flex-start'}}>                      
                      <ModalDropdown 
                                ref = {'drop'}
                                style={{flex:1}} 
                                textStyle={{fontSize:16,marginLeft:10}}                         
                                dropdownStyle={{height:36*companynames.length,width:width-40,marginLeft:5,marginTop:5}}                                
                                onSelect={(idx, value) => {this.setState({companyindex:idx})}}
                                defaultValue={'--请选择快递公司--'}
                                options={companynames}/>
                      <TouchableOpacity onPress={this._search.bind(this,expressid)}>
                            <Image resizeMode="cover" source={require('./../../../assets/search.png')} style={{width:24,height:24,marginLeft:10,marginRight:10,tintColor:(MomEnv.MAIN_COLOR+'ee')}} />
                      </TouchableOpacity>                                       
                   </View>
                   <View style={{alignSelf:'stretch',height:1,backgroundColor:'#f2f2f2'}} />
                 </View>
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