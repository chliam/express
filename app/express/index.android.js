/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  StyleSheet,
  Text,
  View,
  BackAndroid,
  Platform,
  ToastAndroid,
  Navigator
} from 'react-native';

import MomEnv from './app/modules/config/Environment';
import Login from './app/modules/account/login';
import Register from './app/modules/account/register';
import Main from './app/modules/main';

var lastBackPressed;

class express extends Component{
  constructor(props){
    super(props);
    this.state = {
      bootstrapped: false,
      initialRouteId: 'login',
    };
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
  }

  componentWillMount() {
    console.log('app will mount');
    MomEnv.initNotification('ANDROID');
    if (Platform.OS === 'android') {
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    console.log('app will unmount');
    AppState.removeEventListener('change', this._handleAppStateChange);
    MomEnv.cleanupNotification();
    if (Platform.OS === 'android') {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    //this._loadInitialState().done();
  }

  onBackAndroid = () => {
     const nav = this.navigator;
     const routers = nav.getCurrentRoutes();
     if (routers.length > 1) {
        nav.pop();
        return true;
     }
     //最近2秒内按过back键，可以退出应用。
     if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
       return false;
     }
     this.lastBackPressed = Date.now();
     ToastAndroid.show('Press again to exit the application', ToastAndroid.SHORT);
     return true;
   };

  _handleAppStateChange (currentAppState) {
     MomEnv.updateAppStatus(currentAppState);
  }

  _handleDeviceToken(token) {
    console.log("token", token);

    //MomEnv.callApi('api/Profile/AddDevice',
    //  {deviceType:'ANDROID', deviceToken: token}
    //  ,
    //  ()=>{
    //    //TODO?
    //  }
    //);
  }

  _onNotification(notification) {
    console.log("notification", notification);
  }

  async _loadInitialState() {
    let step = await MomEnv.loadStep();
    if (step == 'main'){
        this.navigator.replace({id: 'main'});
    }
    else {
        this.navigator.replace({id: 'login'});
    }
  }

  _renderScene(route, nav) {
      switch (route.id) {
      case 'login':
          return <Login navigator={nav} />;
      case 'register':
          return <Register navigator={nav} forgetPassword={route.forgetPassword}/>;
      case 'main':
        return <Main navigator={nav} />;
      default:
        //return route.view;
        var Component = route.component;
        if (Component) {
          return (
            <Component {...route.passProps} navigator={nav} route={route}/>
          );
        }
        else {
          return route.view;
        }
    }
  }

  _configScene(route){
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    return Navigator.SceneConfigs.FloatFromRight;
  }

  render() {
    let { _renderScene, _configScene } = this;
    return (
      <Navigator style={{backgroundColor:'#0956a2'}}
         initialRoute={{id:'login'}}
         ref={(navigator) => {this.navigator = navigator;MomEnv.regNavigator(navigator);}}
         renderScene={_renderScene.bind(this)}
         configureScene={_configScene}        
     />
    );
  }
}

AppRegistry.registerComponent('express', () => express);
