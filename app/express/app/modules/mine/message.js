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
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert
} from 'react-native';

import MomEnv,{moment} from './../config/Environment';
import Container from './../shared/Container';
import Advertisement from './../shared/Advertisement';
import Waiting from './../shared/Waiting';
import Nav from './../shared/Nav';
import Changepassword from './changepassword';
import Switch from './../shared/Switch';
import Toast,{DURATION} from 'react-native-easy-toast';
import Loading from './../shared/Loading';

let {width, height} = Dimensions.get('window');

export default class message extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages:[],
            loading:false,
            editing:false,
            ids:[]
        };
    }

    componentDidMount() {
        this._load();
    }

    _load(){
        MomEnv.getProfile().then((profile) => {
            this.setState({loading:true});
            MomEnv.callApi('api/WebApi/GetMessages', 
              {"telephone": profile.telephone},
              (responseData)=>{
                  this.setState({loading:false});
                  if(responseData){
                      if(responseData.status=="success"){
                          this.setState({messages:responseData.result.messages});
                          MomEnv.setNotification(1,0);
                      }else{
                          this.refs.toast.show(responseData.message,3000);                                
                      }
                  }else{
                      this.refs.toast.show('网络异常！',3000); 
                  }
              });            
        });
    }

    _edithandle(){
        if(this.state.editing){
            this.setState({editing:false});
        }else{
            this.setState({editing:true});
        }
    }

    _selectitem(msgid){
        let {ids} = this.state;
        let tmpids = [];
        let contained = false;
        ids.map((id,idindex)=>{
            if(id==msgid){
                contained = true;
            }else{
                tmpids.push(id);
            }
        });
        if(!contained){
            tmpids.push(msgid);
        }
        this.setState({ids:tmpids});
    }

    _selectall(){
        let {messages,ids} = this.state;
        if(ids.length==messages.length){
            ids = [];
        }else{
            ids = [];
            messages.map((msg,index)=>{
                ids.push(msg.id);
            });
        }
        this.setState({ids:ids});
    }

    _delete(){
        let {ids} = this.state;
        if(ids.length==0){
            this.refs.toast.show('请选择要删除的消息！',3000); 
        }else{
            MomEnv.getProfile().then((profile) => {
                this.setState({loading:true});
                MomEnv.callApi('api/WebApi/DelMessages', 
                  {"telephone": profile.telephone,"ids":ids},
                  (responseData)=>{
                      this.setState({loading:false});
                      if(responseData){
                          if(responseData.status=="success"){
                              this.setState({ids:[],editing:false});
                              this._load();
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

    //<View style={{width:16,height:16,borderRadius:8,borderWidth:1,borderColor:MomEnv.MAIN_COLOR,alignItems:'center',justifyContent:'center'}}>
    //   <Text style={{fontSize:6,color:MomEnv.MAIN_COLOR}}>{'未读'}</Text>
    //</View>

    render() {
        let {messages,loading,editing,ids} = this.state;
        let htmls = [];
        messages.map((msg,index)=>{
            if(editing){
                let selected = false;
                let bgcolor = 'transparent';
                let bdwidth = 1;
                let checkmark = '';
                ids.map((id,idindex)=>{
                    if(id==msg.id){
                        selected = true;
                        bgcolor = MomEnv.MAIN_COLOR;
                        bdwidth = 0;
                        checkmark = '√';
                    }
                });
                htmls.push(
                 <TouchableOpacity key={index} onPress={this._selectitem.bind(this,msg.id)}>
                   <View style={{flexDirection:'row',alignSelf:'stretch',padding:5,alignItems:'center',justifyContent:'flex-start',borderBottomWidth:1,borderBottomColor:'#eee'}}>
                      <View style={{width:20,height:20,borderRadius:10,margin:5,borderWidth:bdwidth,borderColor:'#ccc',backgroundColor:bgcolor,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:12,color:'#fff'}}>{checkmark}</Text> 
                      </View>
                      <View style={{flex:1}}>
                         <Text style={{alignSelf:'stretch'}}>{msg.content}</Text>
                         <View style={{alignSelf:'stretch',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                             <Text style={{fontSize:12,color:'#999'}}>{moment(msg.noticetime).format('YYYY-MM-DD HH:mm')}</Text>   
                         </View>                   
                      </View>
                   </View>
                 </TouchableOpacity>                  
                 );
              }else{
                 htmls.push(
                   <View key={index} style={{flexDirection:'row',alignSelf:'stretch',padding:5,alignItems:'center',justifyContent:'flex-start',borderBottomWidth:1,borderBottomColor:'#eee'}}>
                      <View style={{flex:1}}>
                         <Text style={{alignSelf:'stretch'}}>{msg.content}</Text>
                         <View style={{alignSelf:'stretch',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                             <Text style={{fontSize:12,color:'#999'}}>{moment(msg.noticetime).format('YYYY-MM-DD HH:mm')}</Text>   
                         </View>                   
                      </View>
                   </View>
                 );
            }           
        });
        return (
          <Container>
              <Advertisement title={this.props.title} righttitle={editing?'取消':'编辑'} righthandle={this._edithandle.bind(this)}/>
              <View style={{flex:2,marginBottom:24}}> 
                   <ScrollView>
                        <View>
                           {htmls}
                        </View>
                   </ScrollView>
                   {
                       editing
                       ?
                       (
                         <View  style={{alignSelf:'stretch',height:44,backgroundColor:MomEnv.NAVBAR_BG_COLOR,flexDirection:'row',alignSelf:'stretch',padding:3,alignItems:'center',justifyContent:'space-between'}}>
                             <TouchableOpacity onPress={this._selectall.bind(this)}>
                               <Text style={{fontSize:14,color:'#fff',padding:5}}>{'全选'}</Text> 
                             </TouchableOpacity> 
                             <TouchableOpacity onPress={this._delete.bind(this)}>
                               <Text style={{fontSize:14,color:'#fff',padding:5}}>{'删除'}</Text> 
                             </TouchableOpacity>
                         </View>
                       )
                       :
                       (null)
                   }
              </View>
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