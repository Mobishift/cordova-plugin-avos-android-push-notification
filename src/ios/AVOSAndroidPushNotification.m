/********* AVOSAndroidPushNotification.m Cordova Plugin Implementation *******/

#import "AVOSAndroidPushNotification.h"

@implementation AVOSAndroidPushNotification

static NSString* callbackId = nil;
static NSString* url = nil;
static AVOSAndroidPushNotification* notification = nil;

+ (void)onRemoteNotification:(NSDictionary *)userInfo{
    if([userInfo objectForKey:@"url"] != nil){
        if([UIApplication sharedApplication].applicationState == UIApplicationStateInactive || [UIApplication sharedApplication].applicationState == UIApplicationStateBackground){
            url = [userInfo objectForKey:@"url"];
            [AVOSAndroidPushNotification sendUrl];
        }
    }
}


+ (void)sendUrl{
    if(callbackId != nil && url != nil){
        NSDictionary* dictionary = [NSDictionary dictionaryWithObject:url forKey:@"urlPath"];
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dictionary];
        url = nil;
        [pluginResult setKeepCallbackAsBool:YES];
        [notification.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
    }
}

- (void)get_url:(CDVInvokedUrlCommand*)command
{
    callbackId = command.callbackId;
    notification = self;
    [AVOSAndroidPushNotification sendUrl];

}


@end
