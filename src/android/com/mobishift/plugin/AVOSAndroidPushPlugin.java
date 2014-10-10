package com.mobishift.plugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import com.avos.avoscloud.AVInstallation;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * @author deckmon
 */

public class AVOSAndroidPushPlugin extends CordovaPlugin {
    public static final String TAG = "AVOSAndroidPushPlugin";

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) {
        boolean result = false;
        
        if (action.equals("get_installation_id")) {
            result = true;
            callbackContext.success(AVInstallation.getCurrentInstallation().getInstallationId());
        } else {
            result = false;
        }

        return result;
    }
}
