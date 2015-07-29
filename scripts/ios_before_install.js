
module.exports = function(context){

	var path = context.requireCordovaModule('path'),
        fs = context.requireCordovaModule('fs'),
        projectRoot = context.opts.projectRoot,
        ConfigParser = context.requireCordovaModule('cordova-lib').configparser,
        config = new ConfigParser(path.join(projectRoot, 'config.xml'));
        appName = config.name() || 'CordovaApp';

    console.log('setting ios push notification...');
    var targetFile = path.join(projectRoot, 'platforms', 'ios', appName, 'Classes', 'AppDelegate.m');
    var content = fs.readFileSync(targetFile, {encoding: 'utf8'});
    if(content.indexOf("AVOSAndroidPushNotification.h") === -1){
    	content = content.replace('#import <Cordova/CDVPlugin.h>', '#import <Cordova/CDVPlugin.h>\n#import "AVOSAndroidPushNotification.h"')
    		.replace('[self.window makeKeyAndVisible];', '[self.window makeKeyAndVisible];\n//add notification\nNSDictionary* useInfo = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];\nif(useInfo != nil){\n[AVOSAndroidPushNotification onRemoteNotification:useInfo];\n}\n');

    	fs.writeFileSync(targetFile, content);
    }

    targetFile = path.join(projectRoot, 'platforms', 'ios', appName, 'Plugins', 'com.phonegap.plugins.PushPlugin', 'AppDelegate+notification.m');

    if(fs.existsSync(targetFile)){
    	content = fs.readFileSync(targetFile, {encoding: 'utf8'});

    	if(content.indexOf("AVOSAndroidPushNotification.h") === -1){
    		content = content.replace('#import "PushPlugin.h"', '#import "PushPlugin.h"\n#import "AVOSAndroidPushNotification.h"')
    		.replace('// Get application state for iOS4.x+ devices, otherwise assume active', '// Get application state for iOS4.x+ devices, otherwise assume active\n[AVOSAndroidPushNotification onRemoteNotification:userInfo];\n');
    		fs.writeFileSync(targetFile, content);
    	}
    }
};