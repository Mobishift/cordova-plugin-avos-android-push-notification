//
//  AVOSAndroidPushNotification.h
//  乐停车
//
//  Created by Gamma on 15/7/28.
//
//

#import <Cordova/CDV.h>
#import <Cordova/CDVPluginResult.h>

@interface AVOSAndroidPushNotification: CDVPlugin

+ (void)onRemoteNotification: (NSDictionary*)userInfo;

- (void)get_url:(CDVInvokedUrlCommand*)command;
@end