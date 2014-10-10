package com.mobishift.plugin;

import org.apache.cordova.CordovaPlugin;
import com.avos.avoscloud.AVInstallation;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * @author deckmon
 */

public class PushInstallationPlugin extends CordovaPlugin {
    public static final String TAG = "PushInstallationPlugin";

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) {
        if (action.equals("get_installation_id")) {
            callbackContext.success(AVInstallation.getCurrentInstallation().getInstallationId());
        } else {
            return false;
        }

        return true;
    }
}
