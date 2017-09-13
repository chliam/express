'use strict';
import React, { Component } from 'react';
import {
    Image,
    View,
    Dimensions,
    StatusBar,
    Platform,
    } from 'react-native';

import MomEnv from './../config/Environment';
import Nav from './Nav';
import ViewPager from './../lib/viewpager/ViewPager';

const IMGS = [
  require('./../../../assets/barner.png'),
  require('./../../../assets/barner2.png'),
  require('./../../../assets/barner3.png')
];

const {width, height} = Dimensions.get('window');

//<Image style={[{flex:1,width:width},this.props.style]} resizeMode="stretch" source={require('./../../../assets/ad24.png')}/>

export default class Advertisement extends Component{
    constructor(props){
        super(props);
        var dataSource = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2,});
        this.state = {
            dataSource:dataSource.cloneWithPages(IMGS)
        };
    }

     _renderPage(data,pageID) {
          return (
            <Image
              resizeMode="cover"
              source={data}
              style={{width:width,height:height/3}} />
          );
      }

    render(){
        
        return (           
          <View style={[{flex:this.props.pager?1.1:0.5,width:width,backgroundColor:MomEnv.NAVBAR_BG_COLOR,alignItems:'center',justifyContent:'center'},this.props.style]}>
            {
              this.props.pager
              ?
              (<ViewPager
                    style={{alignSelf:'stretch'}}
                    dataSource={this.state.dataSource}
                    renderPage={this._renderPage.bind(this)}
                    isLoop={true}
                    autoPlay={true}/>)
                :
                (<Image style={[{flex:1,width:width},this.props.style]} resizeMode="cover" source={require('./../../../assets/barner.png')}/>)
            }            
            <View style={{position:'absolute',left:0,top:0,width:width,height:40}}>
                <Nav title={this.props.title} hideback={this.props.hideback}/>
            </View> 
          </View>
    );
  }
}