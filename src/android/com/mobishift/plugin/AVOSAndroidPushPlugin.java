package com.mobishift.plugin;

import android.app.Activity;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import com.avos.avoscloud.AVInstallation;
import com.avos.avoscloud.PushService;

import org.apache.cordova.PluginResult;
import org.json.JSONArray;
/**
 * @author deckmon
 */

public class AVOSAndroidPushPlugin extends CordovaPlugin {
    public static final String TAG = "AVOSAndroidPushPlugin";
    public static AVOSAndroidPushPlugin plugin;
    public static String ClientType = null;

    private CallbackContext callbackContext;


    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) {
        boolean result = false;
        getClientType();
        if (action.equals("get_installation_id")) {
            Class<Activity> c = null;
            String packageName = this.cordova.getActivity().getApplication().getPackageName();
            try {
                c = (Class<Activity>)Class.forName(packageName + ".MainActivity");
            }catch (ClassNotFoundException ex){

            }
            PushService.setDefaultPushCallback(this.cordova.getActivity(), c);
            result = true;
            callbackContext.success(AVInstallation.getCurrentInstallation().getInstallationId());
        } else if(action.equals("on_notification")){
            this.callbackContext = callbackContext;
            plugin = this;
            result = true;
        }

        return result;
    }

    public void notification(){
        if(callbackContext != null){
            PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, "notification");
            pluginResult.setKeepCallback(true);
            callbackContext.sendPluginResult(pluginResult);
        }
    }

    public void getClientType(){
        if(ClientType == null){
            ClientType = webView.getPreferences().getString("client_type", null);
        }
    }
}
