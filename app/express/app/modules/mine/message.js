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
  ScrollView
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
            loading:false
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

    //<View style={{width:16,height:16,borderRadius:8,borderWidth:1,borderColor:MomEnv.MAIN_COLOR,alignItems:'center',justifyContent:'center'}}>
    //   <Text style={{fontSize:6,color:MomEnv.MAIN_COLOR}}>{'未读'}</Text>
    //</View>

    render() {
        let {messages,loading} = this.state;
        let htmls = [];
        messages.map((msg,index)=>{
            htmls.push(
                <View key={index} style={{alignSelf:'stretch',padding:5,alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderBottomColor:'#eee'}}>
                   <Text style={{alignSelf:'stretch'}}>{msg.content}</Text>
                   <View style={{alignSelf:'stretch',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                       <Text style={{fontSize:12,color:'#999'}}>{moment(msg.noticetime).format('YYYY-MM-DD HH:mm')}</Text>   
                   </View>                   
                </View>
            );
        });
        return (
          <Container>
              <Advertisement title={this.props.title}/>
              <View style={{flex:2,marginBottom:24}}> 
                   <ScrollView>
                        <View>
                           {htmls}
                        </View>
                   </ScrollView>
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