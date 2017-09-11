import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';


import MomEnv from './config/Environment';
import Container from './shared/Container';
import TabBar from './lib/tabbar/TabBar';
import Home from './home/home';
import Pickup from './pickup/pickup';
import Mine from './mine/mine';
import JPushModule from 'jpush-react-native';

export default class main extends Component{
    constructor(props){
        super(props);
        this.state = {
            expressid:'',
            msgCount:0
        };

        this._notify = this._notify.bind(this);
    }

    componentWillUnmount() {
        MomEnv.unregPush({
            name: "main"
        });
    }

    componentDidMount() {
        MomEnv.regPush({
            name: "main",
            notify: this._notify,
            resetCount: this._notify,
            category: -1
        });

        JPushModule.notifyJSDidLoad((resultCode) => {
            if (resultCode === 0) {}
        });

        JPushModule.addReceiveNotificationListener((map) => {
            Alert.alert("通知",map.alertContent,[{text: '知道了', onPress: () => {}},]);
            //console.warn("extras: " + map.extras);
        });

        this._loadInitialState().done();
    }

    _notify (badgeCount, category) {
        if (category == 1) {
            this.setState({msgCount: badgeCount});
        }
    }

    async _loadInitialState() {
        MomEnv.getProfile().then((profile) => {
            MomEnv.callApi('api/WebApi/GetUnReadMsgCount', 
              {"telephone": profile.telephone},
              (responseData)=>{
                  if(responseData){
                      if(responseData.status=="success"){
                          //this.setState({msgCount:responseData.result.count});
                          MomEnv.setNotification(1, responseData.result.count);
                      }
                  }
              });            
        });         
    }

    _gotoTab(tabName){
        this.setState({selectedTab: tabName});
        if (tabName == 'home') {
            this.refs.tabbar.update(0);
        } else if (tabName == 'pickup') {
            this.refs.tabbar.update(1);
        } else if (tabName == 'mine') {
            this.refs.tabbar.update(2);
        }
    }

    _gotoPickUp(expressid){
        this.setState({selectedTab:'pickup',expressid:expressid});
        this.refs.tabbar.update(1);
    }

    _gotoHome(){
        this.setState({selectedTab:'home'});
        this.refs.tabbar.update(0);
    }

    render(){
        let {expressid} = this.state;
        return (
          <View style={{flex:1}}>
            <TabBar defaultPage={0} ref='tabbar'>
              <TabBar.Item
                title={'首页'}
                icon={require('./../../assets/tabHome.png')}
                selected={this.state.selectedTab === 'home'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'home',
                  });
                }}
              >
                <Home navigator={this.props.navigator} gotoPickup={(expressid)=>{this._gotoPickUp(expressid)}}/>
              </TabBar.Item>
              <TabBar.Item
                title={'取件'}
                icon={require('./../../assets/tabPickup.png')}
                selected={this.state.selectedTab === 'pickup'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'pickup',
                  });
                }}>
                <Pickup navigator={this.props.navigator} expressid={expressid} gotoHome={()=>{this._gotoHome()}}/>
              </TabBar.Item>
              <TabBar.Item
                icon={require('./../../assets/tabMine.png')}
                badge={this.state.msgCount > 0 ? this.state.msgCount : undefined}
                title={'我的'}
                selected={this.state.selectedTab === 'mine'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'mine',
                  });
                }}>
                <Mine navigator={this.props.navigator}/>
              </TabBar.Item>
            </TabBar>
          </View>
        );
   }
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'blue',
    margin: 50,
  },
});