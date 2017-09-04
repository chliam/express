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
import ImagePicker from 'react-native-image-picker';
import Nav from './../shared/Nav';

let {width, height} = Dimensions.get('window');

export default class uploadpics extends Component{
    constructor(props){
        super(props);
        this.state = {
            pic1:'',
            pic2:'',
            pic3:'',
            authed:false,
            loading:false
        };
    }

    componentDidMount() {
        this.load();
    }

    load(){
        MomEnv.getProfile().then((profile) => {
            this.setState({loading:true});
            MomEnv.callApi('api/WebApi/GetAuthStatus', 
              {"telephone": profile.telephone},
              (responseData)=>{
                  this.setState({loading:false});
                  if(responseData){
                      if(responseData.status=="success"){
                          this.setState({authed:responseData.result.authed});
                      }else{
                          this.refs.toast.show(responseData.message,3000);                                
                      }
                  }else{
                      this.refs.toast.show('网络异常！',3000); 
                  }
              });            
        });
    }

    submit(){
        let{pic1,pic2,pic3} = this.state;
        MomEnv.getProfile().then((profile) => {
            this.setState({loading:true});
            MomEnv.callApi('api/WebApi/UploadUserPic', 
              {"telephone": profile.telephone,"pic1":pic1,"pic2":pic2,"pic3":pic3},
              (responseData)=>{
                  this.setState({loading:false});
                  if(responseData){
                      if(responseData.status=="success"){
                          this.refs.toast.show(' 恭喜您，认证通过！ ',3000); 
                          this.setState({authed:true});
                      }else{
                          this.refs.toast.show(responseData.message,3000);                                
                      }
                  }else{
                      this.refs.toast.show('网络异常！',3000); 
                  }
              });            
        });
    }

    selectpic(pictype){
        var options = {
            title: '',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'从手机相册选择',
            cancelButtonTitle:'取消',
            mediaType:'photo',
            quality:0.8,
            storageOptions: {
                skipBackup: true,                
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.error) {
                this.refs.toast.show(response.error,3000); 
            }
            else {
                if(pictype==1){
                    this.setState({pic1:response.data});
                }else if(pictype==2){
                    this.setState({pic2:response.data});
                }else if(pictype==3){
                    this.setState({pic3:response.data});
                }
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            }
        });
    }

    render() {
        let{pic1,pic2,pic3,loading,authed} = this.state;
        if(authed){
             return (
          <Container>
              <Nav title={this.props.title}/>
              <Advertisement/>
              <View style={{flex:2,backgroundColor:'#fff'}}> 
                   <Text style={{marginTop:20,alignSelf:'center'}}>{'您已经完成实名认证'}</Text>
              </View>    
              <Loading loading={loading} />
              <Toast ref="toast"
                  fadeInDuration={600}
                  fadeOutDuration={600}
                  opacity={0.8}
              />
          </Container>
        );
        }else{
         return (
          <Container>
              <Nav title={this.props.title}/>
              <Advertisement/>
              <View style={{flex:2}}> 
                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',height:160}}>
                        <TouchableOpacity onPress={this.selectpic.bind(this,1)}>
                            <View style={{width:90,height:90,backgroundColor:'#fff',borderRadius:25,alignItems:'center',justifyContent:'center'}}>
                             {
                                pic1 && pic1.length>0
                                ?
                                (<Image source={{uri:'data:image/jpeg;base64,'+pic1}} resizeMode="cover" style={{width:90,height:90,borderRadius:25}} />)
                                :
                                (<Text style={{fontSize:10,textAlign:'center'}}>{'点击上传\n身份证正面照片'}</Text>)
                              }
                            </View> 
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.selectpic.bind(this,2)}>                             
                           <View style={{width:90,height:90,backgroundColor:'#fff',borderRadius:25,alignItems:'center',justifyContent:'center'}}>
                            {
                                pic2 && pic2.length>0
                                ?
                                (<Image source={{uri:'data:image/jpeg;base64,'+pic2}} resizeMode="cover" style={{width:90,height:90,borderRadius:25}} />)
                                :
                            (<Text style={{fontSize:10,textAlign:'center'}}>{'点击上传\n身份证反面照片'}</Text>)
                            }
                           </View> 
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.selectpic.bind(this,3)}>
                           <View style={{width:90,height:90,backgroundColor:'#fff',borderRadius:25,alignItems:'center',justifyContent:'center'}}>
                            {
                                pic3 && pic3.length>0
                                ?
                                (<Image source={{uri:'data:image/jpeg;base64,'+pic3}} resizeMode="cover" style={{width:90,height:90,borderRadius:25}} />)
                                :
                                (<Text style={{fontSize:10,textAlign:'center'}}>{'点击上传\n手持身份证照片'}</Text>)
                            }
                           </View>
                        </TouchableOpacity>                        
                  </View>
                  <View style={{flex:1,alignItems:'center',marginTop:20}}>
                      {
                          pic1 && pic1.length>0 && pic2 && pic2.length>0 && pic3 && pic3.length>0
                          ?
                          (<TouchableOpacity onPress={this.submit.bind(this)}>
                              <View style={{backgroundColor:MomEnv.MAIN_COLOR,height:40,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                                   <Text style={{color:'#fff',fontSize:16 }}>{'开始认证'}</Text>
                              </View>
                           </TouchableOpacity>)
                          :
                          (<View style={{backgroundColor:'#ccc',height:40,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontSize:16 }}>{'开始认证'}</Text>
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
}