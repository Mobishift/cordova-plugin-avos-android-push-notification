package com.mobishift.plugin;

import android.app.Activity;
import android.util.Log;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import com.avos.avoscloud.AVInstallation;
import com.avos.avoscloud.PushService;

import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * @author deckmon
 */

public class AVOSAndroidPushPlugin extends CordovaPlugin {
    public static final String TAG = "AVOSAndroidPushPlugin";
    public static AVOSAndroidPushPlugin plugin;
    public static String ClientType = null;
    private static String url = null;

    private CallbackContext callbackContext;
    private static CallbackContext openCallbackContext;

    public static void  setUrl(String pathUrl){
        url = pathUrl;
        getUrl();
    }

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
        } else if(action.equals("get_url")){
            openCallbackContext = callbackContext;
            getUrl();
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

    public static void getUrl(){
        if(openCallbackContext != null && url != null){
            JSONObject jsonObject = new JSONObject();
            try{
                jsonObject.put("urlPath", url);
            }catch (JSONException ex) {
                Log.e(TAG, ex.getMessage());
            }
            PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, jsonObject);
            pluginResult.setKeepCallback(true);
            url = null;
            openCallbackContext.sendPluginResult(pluginResult);
        }
    }
}
