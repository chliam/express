﻿import React, { Component } from 'react';
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


import MomEnv from './config/Environment';
import Container from './shared/Container';
import TabBar from './lib/tabbar/TabBar';
import Home from './home/home';
import Pickup from './pickup/pickup';
import Mine from './mine/mine';

export default class main extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    componentWillUnmount() {
        MomEnv.unregPush({
            name: "mainTab"
        });
    }

    componentDidMount() {
        MomEnv.regPush({
            name: "main",
            notify: this._notify,
            resetCount: this._notify,
            category: -1
        });
    }

    _notify (badgeCount, category) {
        if (category == 1) {
            this.setState({msgCount: badgeCount});
        }
        else if (category == 100) {
            this.setState({wikiCount: badgeCount});
        }
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

    render(){
    return (
      <View style={{flex:1}}>
        <TabBar defaultPage={1} ref='tabbar'>
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
            <Home />
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
            <Pickup />
          </TabBar.Item>
          <TabBar.Item
            icon={require('./../../assets/tabMine.png')}
            title={'我的'}
            selected={this.state.selectedTab === 'mine'}
            onPress={() => {
              this.setState({
                selectedTab: 'mine',
              });
            }}>
            <Mine />
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