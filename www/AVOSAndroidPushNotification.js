var exec = require('cordova/exec');

var AVOSAndroidPushNotification = function() {
};


// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
AVOSAndroidPushNotification.prototype.get_installation_id = function(successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("AVOSAndroidPushNotification.get_installation_id failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("AVOSAndroidPushNotification.get_installation_id failure: success callback parameter must be a function");
        return
    }

    exec(successCallback, errorCallback, "AVOSAndroidPushPlugin", "get_installation_id", []);
};

AVOSAndroidPushNotification.prototype.on_notification = function(callback){
    callback = callback || function(){};
    if(typeof callback !== 'function'){
        console.log('AVOSAndroidPushNotification.on_notification failure: callback parameter must be a function');
    }
    
    exec(callback, function(){}, "AVOSAndroidPushPlugin", 'on_notification', []);
}

//-------------------------------------------------------------------

module.exports = new AVOSAndroidPushNotification();