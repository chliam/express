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
  Dimensions,
  WebView
} from 'react-native';

import MomEnv from './../config/Environment';
import Container from './../shared/Container';
import Advertisement from './../shared/Advertisement';
import Nav from './../shared/Nav';

let {width, height} = Dimensions.get('window');

export default class consent extends Component{
    constructor(props){
        super(props);
    }

    render() {
        let uri = MomEnv.BASE_URL + 'Consent.html';
        return (
          <Container>
              <Nav title={this.props.title} style={{backgroundColor:MomEnv.NAVBAR_BG_COLOR}}/>
              <WebView
                ref='webview'
                automaticallyAdjustContentInsets={true}
                style={{flex:1,alignSelf:'stretch',marginBottom:20}}
                source={{uri: uri}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                startInLoadingState={true}
                scalesPageToFit={true}
              />
          </Container>
        );
    }
}