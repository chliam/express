'use strict';
import React from 'react'
var {NativeModules,DeviceEventEmitter} = require('react-native');

//var GcmManager = NativeModules.GcmManager;

module.exports = {
  setApplicationIconBadgeNumber: function(n){
    //GcmManager.setApplicationIconBadgeNumber(n);
  },
  addEventListener: function(type, handler){
    DeviceEventEmitter.addListener(type, handler);
    //GcmManager.addListener(type);
  },
  removeEventListener: function (type, handler){
    DeviceEventEmitter.removeListener(type, handler);
  },
  requestPermissions: function (){
    //GcmManager.requestPermissions();
  },
};
