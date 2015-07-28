var exec = require('cordova/exec'),
    channel = require('cordova/channel'),
    cordova = require('cordova');

var AVOSAndroidPushNotification = function() {
};


// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
AVOSAndroidPushNotification.prototype.get_installation_id = function(successCallback, errorCallback) {
    console.log('this methpd has been declined in ios');
};

AVOSAndroidPushNotification.prototype.on_notification = function(callback){
    console.log('this methpd has been declined in ios');
};

AVOSAndroidPushNotification.prototype.getUrl = function(callback){
    callback = callback || function(){};
    if(typeof callback !== 'function'){
        console.log('AVOSAndroidPushNotification.getUrl failure: callback parameter must be a function');
    }

    exec(callback, function(){}, "AVOSAndroidPushPlugin", "get_url", []);
};

var pushNotification = new AVOSAndroidPushNotification();

channel.onCordovaReady.subscribe(function(){
    pushNotification.getUrl(function(data){
        if(data){
            cordova.fireDocumentEvent('appOpenWithURL', data);
        }
    });
});

//-------------------------------------------------------------------

module.exports = pushNotification;