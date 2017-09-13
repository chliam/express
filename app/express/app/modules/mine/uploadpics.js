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
import ImageViewer from './../lib/imageview/ImageView';


let {width, height} = Dimensions.get('window');
const CardTypes = ['身份证','护照','驾驶证'];

export default class uploadpics extends Component{
    constructor(props){
        super(props);
        this.state = {
            pic1:'',
            pic2:'',
            pic3:'',
            authed:false,
            loading:false,
            step:1,
            username:'',
            cardtype:0,
            cardnum:'',
            shownviewimage:false,
            showindex:0,
            pic1Url:'',
            pic2Url:'',
            pic3Url:'',
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
        let{pic1,pic2,pic3,step,username,cardnum,cardtype} = this.state;
        MomEnv.getProfile().then((profile) => {
            this.setState({loading:true});
            MomEnv.callApi('api/WebApi/UploadUserPic', 
              {"telephone": profile.telephone,"pic1":pic1,"pic2":pic2,"pic3":pic3,"username":username,"cardtype":cardtype,"cardnum":cardnum},
              (responseData)=>{
                  this.setState({loading:false});
                  if(responseData){
                      if(responseData.status=="success"){
                          this.refs.toast.show(' 恭喜您，您已经通过实名认证！ ',3000); 
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
        let{pic1,pic2,pic3} = this.state;
        var options = {
            title: '',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'从手机相册选择',
            cancelButtonTitle:'取消',
            customButtons: ((pictype==1&&pic1) || (pictype==2&&pic2) || (pictype==3&&pic3)) ? [{name: '查看', title: '查看图片'},] : [],
            mediaType:'photo',
            quality:0.6,
            storageOptions: {
                skipBackup: true,                
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.error) {
                this.refs.toast.show(response.error,3000); 
            } else if (response.customButton) {
                this.setState({shownviewimage:true,showindex:pictype-1});
            }
            else {
                if(response.data){
                    if(pictype==1){
                        this.setState({pic1:response.data,pic1Url:response.uri});
                    }else if(pictype==2){
                        this.setState({pic2:response.data,pic2Url:response.uri});
                    }else if(pictype==3){
                        this.setState({pic3:response.data,pic3Url:response.uri});
                    }
                }
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            }
        });
    }

    render() {
        let{pic1,pic2,pic3,pic1Url,pic2Url,pic3Url,step,username,cardnum,cardtype,loading,authed,shownviewimage,showindex} = this.state;
        if(authed){
        return (
          <Container>
              <Advertisement title={this.props.title}/>
              <View style={{flex:2,backgroundColor:'#fff'}}> 
                   <Text style={{marginTop:20,alignSelf:'center'}}>{'您已经通过实名认证'}</Text>
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
              <Advertisement title={this.props.title}/>
              <View style={{flex:2}}> 
              {
                  step==1
                  ?
                  (<View style={{alignSelf:'stretch',paddingTop:0,alignItems:'center',justifyContent:'center'}}>
                      <View style={{flexDirection:'row',alignItems:'center',borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:2,backgroundColor:'#fff'}}>
                         <Text style={{width:80}}>{'姓名'}</Text>
                         <TextInput 
                            style={{flex:1,fontSize:14,padding: 0,height:48}} 
                            underlineColorAndroid="transparent" 
                            placeholder='请输入姓名' 
                            placeholderTextColor='#ddd' 
                            value={username}
                            onChangeText={(text) => {this.setState({username:text})}}    
                       />
                     </View>
                     <View style={{flexDirection:'row',alignItems:'center',height:48,borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:10,backgroundColor:'#fff'}}>
                         <Text style={{width:80}}>{'证件类型'}</Text>
                         <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                             <ModalDropdown 
                                ref = {'drop'}
                                style={{flex:1}} 
                                textStyle={{fontSize:14,color:'#000'}}
                                dropdownStyle={{height:108,width:width-100,marginLeft:-5,marginTop:5}}                                
                                onSelect={(idx, value) => {this.setState({cardtype:idx});}}
                                defaultValue={CardTypes[0]}
                                options={CardTypes}/>
                             <TouchableOpacity onPress={()=>{this.refs.drop.show()}}>
                               <Image resizeMode="contain" source={require('./../../../assets/arrow_left.png')} style={{width:8,height:14,transform:[{ rotateZ: '270deg' }],tintColor:MomEnv.MAIN_COLOR}} />
                             </TouchableOpacity>
                         </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',borderColor:'#ccc',borderBottomWidth:1,paddingLeft:10,paddingRight:2,backgroundColor:'#fff'}}>
                         <Text style={{width:80}}>{'证件号码'}</Text>
                         <TextInput 
                            style={{flex:1,fontSize:14,padding: 0,height:48}} 
                            underlineColorAndroid="transparent" 
                            placeholder='请输入证件号码' 
                            placeholderTextColor='#ddd' 
                            value={cardnum}
                            onChangeText={(text) => {this.setState({cardnum:text})}}    
                       />
                     </View>
                   </View>)
                  :
                  (<View style={{alignSelf:'stretch',paddingTop:5,alignItems:'center',justifyContent:'center'}}>
                        <View style={{alignSelf:'stretch',flexDirection:'row',alignItems:'center',justifyContent:'space-around',margin:5}}>
                             <View style={{width:135,height:81}}>
                                  <Image source={require('./../../../assets/card1.png')} resizeMode="cover" style={{width:135,height:81}} />
                             </View>
                             <TouchableOpacity onPress={this.selectpic.bind(this,1)}>
                                <View style={{width:135,height:81,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
                                 {
                                     pic1 && pic1.length>0
                                     ?
                                     (<Image source={{uri:pic1Url}} resizeMode="cover" style={{width:135,height:81}} />)
                                    :
                                    (<Image source={require('./../../../assets/introductionPhoto.png')} resizeMode="cover" style={{width:43,height:34}} />)
                                 }
                                </View> 
                             </TouchableOpacity>
                        </View>
                        <View style={{alignSelf:'stretch',flexDirection:'row',alignItems:'center',justifyContent:'space-around',margin:5}}>
                             <View style={{width:135,height:81}}>
                                  <Image source={require('./../../../assets/card2.png')} resizeMode="cover" style={{width:135,height:81}} />
                             </View>
                             <TouchableOpacity onPress={this.selectpic.bind(this,2)}>                             
                                <View style={{width:135,height:81,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
                                  {
                                      pic2 && pic2.length>0
                                      ?
                                      (<Image source={{uri:pic2Url}} resizeMode="cover" style={{width:135,height:81}} />)
                                     :
                                      (<Image source={require('./../../../assets/introductionPhoto.png')} resizeMode="cover" style={{width:43,height:34}} />)
                                  }
                                </View> 
                             </TouchableOpacity>
                        </View>

                        <View style={{alignSelf:'stretch',flexDirection:'row',alignItems:'center',justifyContent:'space-around',margin:5}}>
                             <View style={{width:135,height:81}}>
                                  <Image source={require('./../../../assets/card3.png')} resizeMode="cover" style={{width:135,height:81}} />
                             </View>
                             <TouchableOpacity onPress={this.selectpic.bind(this,3)}>
                                <View style={{width:135,height:81,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
                                  {
                                      pic3 && pic3.length>0
                                      ?
                                      (<Image source={{uri:pic3Url}} resizeMode="cover" style={{width:135,height:81}} />)
                                     :
                                      (<Image source={require('./../../../assets/introductionPhoto.png')} resizeMode="cover" style={{width:43,height:34}} />)
                                  }
                                </View>
                             </TouchableOpacity>
                        </View>                            
                  </View>)
              }                 
                  <View style={{flex:1,alignItems:'center',marginTop:20}}>
                      {
                         step==1
                         ?
                         (
                          username && username.length>0 && cardnum && cardnum.length>0
                          ?
                          (<TouchableOpacity onPress={()=>{this.setState({step:2})}}>
                              <View style={{backgroundColor:MomEnv.MAIN_COLOR,height:40,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                                   <Text style={{color:'#fff',fontSize:16 }}>{'下一步'}</Text>
                              </View>
                           </TouchableOpacity>)
                          :
                          (<View style={{backgroundColor:'#ccc',height:40,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontSize:16 }}>{'下一步'}</Text>
                           </View>)
                         )
                         :
                         (
                          pic1 && pic1.length>0 && pic2 && pic2.length>0 && pic3 && pic3.length>0
                          ?
                          (<TouchableOpacity onPress={this.submit.bind(this)}>
                              <View style={{backgroundColor:MomEnv.MAIN_COLOR,height:40,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                                   <Text style={{color:'#fff',fontSize:16 }}>{'提交材料'}</Text>
                              </View>
                           </TouchableOpacity>)
                          :
                          (<View style={{backgroundColor:'#ccc',height:40,width:0.8*width,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontSize:16 }}>{'提交材料'}</Text>
                           </View>)
                         )
                      }
                                    
                  </View>
              </View>    
              <Loading loading={loading} />
              <Toast ref="toast"
                  fadeInDuration={600}
                  fadeOutDuration={600}
                  opacity={0.8}
              />
              <ImageViewer shown={shownviewimage}
                 imageUrls={[pic1Url||'empty',pic2Url||'empty',pic3Url||'empty']}
                 onClose={()=>{this.setState({shownviewimage:false,showindex:0})}}
                 index={showindex}>
              </ImageViewer>      
          </Container>
        );
        }      
    }
}