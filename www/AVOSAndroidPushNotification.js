var AVOSAndroidPushNotification = function() {
};


// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
AVOSAndroidPushNotification.prototype.get_installation_id = function(successCallback, errorCallback, options) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("AVOSAndroidPushNotification.get_installation_id failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("AVOSAndroidPushNotification.get_installation_id failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, errorCallback, "AVOSAndroidPushPlugin", "get_installation_id", [options]);
};

//-------------------------------------------------------------------

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.AVOSAndroidPushNotification) {
    window.plugins.AVOSAndroidPushNotification = new AVOSAndroidPushNotification();
}

if (typeof module != 'undefined' && module.exports) {
  module.exports = AVOSAndroidPushNotification;
}