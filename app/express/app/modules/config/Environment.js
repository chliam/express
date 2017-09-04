'use strict';

import React, { Component } from 'react'

import {
  AsyncStorage,
  Alert,
  Platform,
  } from 'react-native';

import MomNotification from './MomNotification';


const _urls = {
    production: 'https://momiu-pro.azurewebsites.net/',
    development:'http://192.168.1.90:28862/',
};


const _platform = 'development';
const _isDebug = false;
var _navigator;
var _selectedDay = null;
var _selectedType = 0;
var _uiStep = "";
var _tokenValid = true;
var _timeInActive = null;
var _networkError = false;
var _lastNetwork = new Date();
var _deviceType = Platform.OS.toUpperCase();
//notification
var _pushListeners = {};
var _notifications = {
    //category: {[badgeCount: 0, messages:[]}
};
var _profile = null;

const serializeJSON = function (data) {
    return Object.keys(data).map(function (keyName) {
        return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
    }).join('&');
};




module.exports = {
    BASE_URL: _urls[_platform],
    isDebug: _isDebug,
    MAIN_COLOR: '#f05b48',//'#55a2d8', //'#3d92f1', //#008cd3
    BG_COLOR:'#fff',
    BG_COLOR2:'#f5f7fa',  
    NAVBAR_BG_COLOR: '#262930',
    NAVBAR_TITLE_COLOR: '#f05b48',
    TABBAR_BG_COLOR: '#262930',

    regPush: function (v) {
        _pushListeners[v.name] = v;
    },

    unregPush: function (v) {
        delete _pushListeners[v.name];
    },

    updateAppStatus: function (status) {
        if (status == 'active') {
            MomNotification.setApplicationIconBadgeNumber(0);
            AsyncStorage.getItem("MOM_PUSH_TOKEN")
            .then((token) => {
                if (token) {
                    //this.callApi('api/Profile/ResetBadage',
                    //  {deviceToken: token }
                    //);
                }
            }).done();

            if (this.checkTimeout()) {
                this.signOut();
            }

            _timeInActive = null;
        }
        else {
            _timeInActive = new Date();
        }
    },

    checkTimeout: function () {
        if (_timeInActive != null) {
            var now = new Date();
            if (now - _timeInActive > 15 * 1000 * 60) {
                return true;
            }
        }
        return false;
    },

    _handleDeviceToken: function (token) {
        console.log("token", token);

        AsyncStorage.setItem("MOM_PUSH_TOKEN", token).then
          (() => {
          }).done();

        ////This API will also reset device's badge counts in server
        //this.callApi('api/Profile/AddDevice',
        //  { deviceType: _deviceType, deviceToken: token }
        //);
    },

    _onNotification: function (notification) {
        console.log("notification", notification);

        for (let key in _pushListeners) {
            if (_pushListeners.hasOwnProperty(key)) {
                let v = _pushListeners[key];
                if (v.notify && notification._data) {
                    if (v.category === -1 || v.category === notification._data.category) {
                        v.notify(notification._badgeCount, notification._data.category);
                    }
                }
            }
        };
    },

    setNotification: function (category, count) {
        for (let key in _pushListeners) {
            let v = _pushListeners[key];
            if (v.resetCount) {
                if (v.category === -1 || v.category === category) {
                    v.resetCount(count, category);
                    this.saveNotification(category, count);
                }
            }
        };
    },

    initNotification: function (deviceType) {
        console.log('initNotification');
        _deviceType = deviceType;
        MomNotification.addEventListener('notification', this._onNotification);
        MomNotification.addEventListener('register', this._handleDeviceToken.bind(this));
    },

    cleanupNotification: function () {
        console.log('stopNotification');
        MomNotification.removeEventListener('notification', this._onNotification);
        MomNotification.removeEventListener('register', this._handleDeviceToken.bind(this));
    },

    _afterGetTokenFromStorage: function (token) {
        if (!token) {
            MomNotification.requestPermissions();
        }
        else {
            //PushNotificationIOS.setApplicationIconBadgeNumber(0);
            this.callApi('api/Profile/AddDevice',
              { deviceType: _deviceType, deviceToken: token }
            );
        }
    },

    resetBadageCount: function () {
        MomNotification.setApplicationIconBadgeNumber(0);
    },

    requestNotification: function () {
        //console.log('requestNotification');

        AsyncStorage.getItem("MOM_PUSH_TOKEN")
          .then(this._afterGetTokenFromStorage.bind(this)).done();
    },

    getNotificationCount: function (category) {
        //category: [badgeCount: 0, messages:[]}
        if (_notifications.hasOwnProperty(category)) {
            return _notifications[category].badgeCount;
        }

        return 0;
    },

    getNotification: function (category) {
        return _notifications[category];
    },

    saveNotification: function (category, badgeCount, messages) {
        if (_notifications.hasOwnProperty(category)) {
            _notifications[category] = { badgeCount: badgeCount, messages: messages };
        }
        else {
            _notifications[category] = { badgeCount: badgeCount, messages: messages };
        }
    },

    getStep: function () {
        return _uiStep;
    },

    loadStep: function () {
        return AsyncStorage.getItem("MOM_APP_STEP").then(function (value) {
            value = value || 'login';
            _uiStep = value;
            return value;
        });
    },

    saveStep: function (value) {
        _uiStep = value;

        AsyncStorage.setItem("MOM_APP_STEP", value).then
          (() => {
              if (_navigator) {
                  _navigator.replace({ id: value });
              }
          }).done();
    },

    regNavigator: function (nav) {
        _navigator = nav;
    },

    getNavigator: function () {
        return _navigator;
    },

    pushPage: function (pageComponent, passProps) {
        _navigator.push({
            component: pageComponent,
            passProps: passProps
        });
    },
    redirect: function (screenName) {
        if (_navigator) _navigator.replace({ id: screenName });
    },

    signOut: function () {
        if (_navigator) _navigator.replace({ id: 'login' });
    },

    isTokenValid: function () {
        return _tokenValid;
    },

    setTokenStatus: function (status) {
        _tokenValid = status;
    },

    saveProfile: function (value) {
        _profile = value;
        AsyncStorage.setItem("MOM_APP_PROFILE", JSON.stringify(value)).then (() => {}).done();
    },

    getProfile: function () {
        if(_profile){
           return Promise.resolve(_profile);
        }else{
            return AsyncStorage.getItem("MOM_APP_PROFILE").then(function (value) {
                _profile = JSON.parse(value);
                return _profile;
            });
        }    
    },

    processNetworkError: function(callback) {
        var now = new Date();
        if (now - _lastNetwork > 1000 * 5) {
            _networkError = true;
            _lastNetwork = new Date();

            Alert.alert('网络错误!');
        }
        if (callback) callback(null);
    },

    processData: function (response, callback) {
        console.log("response status", response.status);
        _networkError = false;
        _lastNetwork = new Date();

        if (response.status == 401) {
            _tokenValid = false;
            if (_navigator) _navigator.replace({ id: 'login' });
            return;
        }

        if (response.status !== 200) {
            if (_isDebug) {
                console.log('Status Code', response.status);
                console.log(response);
            }
            callback({});
            return;
        }

        response.json().then(function (responseData) {
            if (_isDebug) {
                console.log(responseData);
            };

            if (responseData == null) {
                responseData = {};
            }
            if (callback) {
                callback(responseData);
            }
        });
    },

    callApi: function (apiUrl, data, callback, method = 'POST') {
        var url = _urls[_platform] + apiUrl;

        if (_isDebug) {
            console.log(apiUrl, data);
        };

        AsyncStorage.getItem('MOM_APP_ACCESS_TOKEN', (error, token) => {
            if (error) {
                this.signOut();
            } else {
                //console.log("locale",  MomStorage.getLocale());
                fetch(url, {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Token': token
                    },
                    body: data ? JSON.stringify(data) : null
                })
                  .then(
                  (response) => {
                      if (_isDebug) {
                          console.log(apiUrl, response);
                      };
                      this.processData(response, callback);
                  }
                  )
                  .catch((error) => {
                      if (_isDebug) {
                          console.log(apiUrl, error);
                      };
                      this.processNetworkError(callback);
                  })
                  .done();
            }
        });
    },

    callWeb: function (webUrl, data, callback, method = 'POST') {
        var url = _urls[_platform] + webUrl;
        fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify(data) : null
        })
          .then(
          (response) => {
              this.processData(response, callback);
          }
          )
          .catch((error) => {
              this.processNetworkError(callback);
          })
          .done();
    },
          
   // CONST
   STATUS_BAR_HEIGHT: (Platform.OS === 'ios' ? 20 : Platform.Version <= 19?0: 25),
   NAV_BAR_HEIGHT: (Platform.OS === 'ios' ? 44 : 56),
}

    var moment = require('moment');
    module.exports.moment = moment;
