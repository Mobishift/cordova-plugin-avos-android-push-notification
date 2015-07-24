package com.mobishift.plugin;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.avos.avoscloud.AVOSCloud;

import org.json.JSONException;
import org.json.JSONObject;


/**
 * Created by Gamma on 15/5/26.
 */
public class AVOSAndroidPushReceiver extends BroadcastReceiver {
    private static final String PUSH_ACTION = "com.mobishift.plugin.Push";
    private static final String TAG = "AVOSAndroidPushReceiver";
    private Ringtone ringtone;
    private static final int ID = 10024;

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        if(action.equals(PUSH_ACTION)) {
            try{
                JSONObject json = new JSONObject(intent.getExtras().getString("com.avos.avoscloud.Data"));
                String clientType = json.getString("client_type");
                if(!clientType.equals(AVOSAndroidPushPlugin.ClientType)){
                    return;
                }
                final String message = json.getString("alert");
                Class<?> c = null;
                String packageName = AVOSCloud.applicationContext.getPackageName();
                c = Class.forName(packageName + ".MainActivity");
                Intent resultInetnt = new Intent(AVOSCloud.applicationContext, c);
                PendingIntent pendingIntent = PendingIntent.getActivity(AVOSCloud.applicationContext, 0, resultInetnt, PendingIntent.FLAG_CANCEL_CURRENT);
                NotificationCompat.Builder builder = new NotificationCompat.Builder(AVOSCloud.applicationContext)
                        .setSmallIcon(AVOSCloud.applicationContext.getApplicationInfo().icon)
                        .setContentTitle(context.getString(AVOSCloud.applicationContext.getApplicationInfo().labelRes))
                        .setContentText(message)
                        .setTicker(message);
                builder.setDefaults(android.app.Notification.DEFAULT_LIGHTS | android.app.Notification.DEFAULT_VIBRATE);
                builder.setAutoCancel(true);
                builder.setContentIntent(pendingIntent);
                String sound = json.getString("sound");
                Uri uri = null;
                if(sound != null && !sound.equals("default")){
                    sound = sound.split("\\.")[0];
                    int soundId = AVOSCloud.applicationContext.getResources().getIdentifier(sound, "raw", AVOSCloud.applicationContext.getPackageName());
                    if(soundId > 0){
                        uri = Uri.parse("android.resource://" + AVOSCloud.applicationContext.getPackageName() + "/" + soundId);
                    }else{
                        uri = RingtoneManager.getActualDefaultRingtoneUri(AVOSCloud.applicationContext, RingtoneManager.TYPE_NOTIFICATION);
                    }
                }else{
                    uri = RingtoneManager.getActualDefaultRingtoneUri(AVOSCloud.applicationContext, RingtoneManager.TYPE_NOTIFICATION);
                }
                initSound(uri);
                ringtone.play();
                NotificationManager manager = (NotificationManager) AVOSCloud.applicationContext.getSystemService(Context.NOTIFICATION_SERVICE);
                manager.notify(ID, builder.build());
            }catch (JSONException ex){
                Log.e("AVOSAndroidPushReceiver", ex.getMessage());
            }catch (ClassNotFoundException ex){
                Log.e("AVOSAndroidPushReceiver", ex.getMessage());
            }
            if(AVOSAndroidPushPlugin.plugin != null){
                AVOSAndroidPushPlugin.plugin.notification();
            }

        }

    }

    private void initSound(Uri sound){
        if(ringtone != null && ringtone.isPlaying()){
            ringtone.stop();
        }
        ringtone = RingtoneManager.getRingtone(AVOSCloud.applicationContext, sound);
    }
}
