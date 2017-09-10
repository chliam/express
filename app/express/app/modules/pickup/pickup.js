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


import MomEnv,{moment} from './../config/Environment';
import Container from './../shared/Container';
import Advertisement from './../shared/Advertisement';
import QRCode from './qrcode';
import QRScanner from './qrscanner';
import Toast,{DURATION} from 'react-native-easy-toast';
import Loading from './../shared/Loading';
import Expressdetail from './expressdetail';

export default class pickup extends Component{
    constructor(props){
        super(props);
        this.state = {
            expressid:this.props.expressid||'',
            waitexpresses:[],
            historyexpresses:[],
            selecttabindex:0,
            loading:false
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        this._search();
    }

    _onGetBarcode(expressid){
        this.setState({expressid:expressid});
        this._search();
    }

    _search(){
        let {expressid} = this.state;
        MomEnv.getProfile().then((profile) => {
            this.setState({loading:true});
            MomEnv.callApi('api/WebApi/FindExpress', 
              {"telephone": profile.telephone,"expressid":expressid},
              (responseData)=>{
                  this.setState({loading:false});
                  if(responseData){
                      if(responseData.status=="success"){
                          this.setState({waitexpresses:responseData.result.waitexpresses,historyexpresses:responseData.result.historyexpresses});
                      }else{
                          this.refs.toast.show(responseData.message,3000); 
                      }
                  }else{
                      this.refs.toast.show('网络异常！',3000); 
                  }
              });            
        });
    }

    _selecttab(tabindex){
        if(this.state.selecttabindex != tabindex){
            this.setState({selecttabindex:tabindex});
            this._search();
        } 
    }

    _onopen(){
        this._search();
        if(this.props.gotoHome){
            this.props.gotoHome();
        }
    }

    render() {
        let {expressid,waitexpresses,historyexpresses,selecttabindex,loading} = this.state;
        let items = selecttabindex==0?waitexpresses:historyexpresses;
        let htmls = [];
        if(items && items.length>0){
            items.map((item,index)=>{
                let time = selecttabindex==0?`放件时间:${moment(item.intime).format('MM-DD HH:mm')}`:`取件时间:${moment(item.intime).format('MM-DD HH:mm')}`;
                htmls.push(
                    <TouchableOpacity key={index} onPress={()=>{
                           this.props.navigator.push({
                             component: selecttabindex==0?QRCode:Expressdetail,
                             passProps: selecttabindex==0?{barcode:item.qrcode,expressid:item.id,onopen:this._onopen.bind(this)}:{express:item}
                           });
                         }}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:48,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10,backgroundColor:'#fff'}}>
                                   <View style={{flex:1,marginRight:10}}>
                                       <Text>{item.id}</Text>
                                       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                          <Text style={{fontSize:12,color:'#999'}}>{`${item.company}  ${item.scid}号柜`}</Text>
                                          <Text style={{fontSize:12,color:'#999'}}>{time}</Text>
                                       </View>                                     
                                   </View>
                                   <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '180deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                                </View>
                    </TouchableOpacity> 
                 );
            });
         }else{
                     htmls.push(<Text key={0} style={{fontSize:12,color:'#999',alignSelf:'center',marginTop:30}}>{selecttabindex==0?'您暂时没有待取包裹':'您暂时没有取件历史'}</Text>);
         }

        return (
          <Container>
                <Advertisement hideback={true}/>
                <View style={{flex:2}}>
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
                         <TouchableOpacity onPress={this._search.bind(this)}>
                           <Image resizeMode="cover" source={require('./../../../assets/search.png')} style={{width:20,height:20,marginLeft:10,marginRight:10,tintColor:(MomEnv.MAIN_COLOR+'ee')}} />
                         </TouchableOpacity>
                         <View style={{width:1,height:16,backgroundColor:'#f2f2f2',marginLeft:5,marginRight:5}} />
                         <TouchableOpacity onPress={()=>{
                            this.props.navigator.push({
                               component: QRScanner,
                               passProps: {onGetBarcode:this._onGetBarcode.bind(this),navigator:this.props.navigator}
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
                         <View style={{flex:1,alignItems:'center',justifyContent:'center',borderColor:MomEnv.MAIN_COLOR,borderBottomWidth:selecttabindex==0?1:0}}>
                              <TouchableOpacity onPress={this._selecttab.bind(this,0)}>
                                   <View style={{flex:1,alignItems:'center',justifyContent:'center',padding:5}}>
                                       <Text style={{color:selecttabindex==0?MomEnv.MAIN_COLOR:'#aaa',fontSize:16}}>{'待取包裹'}</Text>
                                   </View>   
                              </TouchableOpacity>                       
                         </View>
                         <View style={{width:1,backgroundColor:'#ccc',height:16}}></View>
                         <View style={{flex:1,alignItems:'center',justifyContent:'center',borderColor:MomEnv.MAIN_COLOR,borderBottomWidth:selecttabindex==1?1:0}}>
                              <TouchableOpacity onPress={this._selecttab.bind(this,1)}>
                                  <View style={{flex:1,alignItems:'center',justifyContent:'center',padding:5}}>
                                       <Text style={{color:selecttabindex==1?MomEnv.MAIN_COLOR:'#aaa',fontSize:16}}>{'取件历史'}</Text>
                                  </View> 
                              </TouchableOpacity> 
                         </View>
                      </View>
                   </View>  
                   <View style={{flex:1,alignSelf:'stretch'}}>
                        <ScrollView>
                            {htmls}                            
                       </ScrollView>
                   </View>
              </View>
              <View style={{height:48}}></View>
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