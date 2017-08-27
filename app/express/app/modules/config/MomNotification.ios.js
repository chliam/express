'use strict';
import React from 'react'

var {
  PushNotificationIOS
} = React;

module.exports = {
  setApplicationIconBadgeNumber: function(n){
    PushNotificationIOS.setApplicationIconBadgeNumber(n);
  },
  addEventListener: function(type, handler){
    PushNotificationIOS.addEventListener(type, handler);
  },
  removeEventListener: function (type, handler){
    PushNotificationIOS.removeEventListener(type, handler);
  },
  requestPermissions: function (){
    PushNotificationIOS.requestPermissions();
  },

};
