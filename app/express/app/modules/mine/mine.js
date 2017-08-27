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
  ToastAndroid
} from 'react-native';


import MomEnv from './../config/Environment';
import Container from './../shared/Container';

export default class mine extends Component{
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
              <Text>{'mine'}</Text>
          </Container>
        );
    }
}