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
  TouchableOpacity
} from 'react-native';


import MomEnv from './../config/Environment';
import Container from './../shared/Container';
import Advertisement from './../shared/Advertisement';
import Nav from './Nav';

export default class waiting extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {
    }

    render() {
        return (
          <Container>
              <Nav title={this.props.title}/>
              <Advertisement/>
              <View style={{flex:2,alignItems:'center',padding:20,backgroundColor:'#fff'}}> 
                  <Text>{'敬请期待...'}</Text>
              </View>              
          </Container>
        );
    }
}