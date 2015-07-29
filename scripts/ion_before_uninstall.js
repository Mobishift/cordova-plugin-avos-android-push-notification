
module.exports = function(context){

	var path = context.requireCordovaModule('path'),
        fs = context.requireCordovaModule('fs'),
        projectRoot = context.opts.projectRoot,
        ConfigParser = context.requireCordovaModule('cordova-lib').configparser,
        config = new ConfigParser(path.join(projectRoot, 'config.xml'));
        appName = config.name() || 'CordovaApp';

    console.log('removing ios push notification setting...');
    var targetFile = path.join(projectRoot, 'platforms', 'ios', appName, 'Classes', 'AppDelegate.m');
    var content = fs.readFileSync(targetFile, {encoding: 'utf8'});

    if(content.indexOf("AVOSAndroidPushNotification.h") >= 0){
    	content = content.replace('\n#import "AVOSAndroidPushNotification.h"', '')
    		.replace('\n//add notification\nNSDictionary* useInfo = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];\nif(useInfo != nil){\n[AVOSAndroidPushNotification onRemoteNotification:useInfo];\n}\n', '');

    	fs.writeFileSync(targetFile, content);
    }

    targetFile = path.join(projectRoot, 'platforms', 'ios', appName, 'Plugins', 'com.phonegap.plugins.PushPlugin', 'AppDelegate+notification.m');

    if(fs.existsSync(targetFile)){
    	content = fs.readFileSync(targetFile, {encoding: 'utf8'});

    	if(content.indexOf("AVOSAndroidPushNotification.h") >= 0){
    		content = content.replace('\n#import "AVOSAndroidPushNotification.h"', '')
    		.replace('\n[AVOSAndroidPushNotification onRemoteNotification:userInfo];\n', '');
    		
    		fs.writeFileSync(targetFile, content);
    	}
    }
};