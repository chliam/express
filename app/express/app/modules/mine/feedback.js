import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Navigator,
  BackAndroid,
  Platform,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import MomEnv from './../config/Environment';
import Container from './../shared/Container';
import Advertisement from './../shared/Advertisement';
import ModalDropdown from 'react-native-modal-dropdown';
import Toast,{DURATION} from 'react-native-easy-toast';
import Loading from './../shared/Loading';
import Nav from './../shared/Nav';

let {width, height} = Dimensions.get('window');

export default class feedback extends Component{
    constructor(props){
        super(props);
        this.state = {
            feedbacktype:'意见',
            content:'',
            loading:false
        };
    }

    submit(){
        let{feedbacktype,content} = this.state;
        if(content.length==0) { 
            this.refs.toast.show(' 请输入反馈内容！ ',3000); 
        } 
        else {
            MomEnv.getProfile().then((profile) => {
                this.setState({loading:true});
                MomEnv.callApi('api/WebApi/AddFeedback', 
                  {"telephone": profile.telephone,"feedbacktype":feedbacktype,"content":content},
                  (responseData)=>{
                      this.setState({loading:false});
                      if(responseData){
                          if(responseData.status=="success"){
                              this.refs.toast.show(' 提交成功，感谢你的反馈！ ',3000); 
                              this.setState({content:""});
                              //this.props.navigator.pop();
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
        let{feedbacktype,content,loading} = this.state;
        return (
          <Container>
              <Advertisement title={this.props.title}/>
              <View style={{flex:2}}> 
                  <View style={{flexDirection:'row',alignItems:'center',height:44,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10,backgroundColor:'#fff'}}>
                         <Text style={{marginRight:15}}>{'反馈类型'}</Text>
                         <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                             <ModalDropdown 
                                ref = {'drop'}
                                style={{flex:1}} 
                                textStyle={{fontSize:14}}
                                dropdownStyle={{height:144,width:80,marginLeft:-5}}                                
                                onSelect={(idx, value) => {this.setState({feedbacktype:value})}}
                                defaultValue={feedbacktype}
                                options={['意见', '建议','投诉','感谢']}/>
                             <TouchableOpacity onPress={()=>{this.refs.drop.show()}}>
                               <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '270deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                             </TouchableOpacity>
                         </View>
                  </View>
                 <View style={{flexDirection:'row',alignItems:'center',borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:2,backgroundColor:'#fff'}}>
                         <Text style={{marginRight:15}}>{'反馈内容'}</Text>
                         <TextInput 
                            style={{flex:1,fontSize:14,padding: 0,height:100}} 
                            underlineColorAndroid="transparent" 
                            placeholder='请输入反馈内容' 
                            placeholderTextColor='#ddd' 
                            multiline ={true}
                            value={content}
                            onChangeText={(text) => {this.setState({content:text})}}    
                      />
                  </View>
                  <View style={{flex:1,alignItems:'center',marginTop:40}}>
                      {
                          content && content.length>0
                          ?
                          (<TouchableOpacity onPress={this.submit.bind(this)}>
                              <View style={{backgroundColor:MomEnv.MAIN_COLOR,height:40,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                                   <Text style={{color:'#fff',fontSize:16 }}>{'提交'}</Text>
                              </View>
                           </TouchableOpacity>)
                          :
                          (<View style={{backgroundColor:'#ccc',height:40,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontSize:16 }}>{'提交'}</Text>
                           </View>)
                      }          
                  </View>
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