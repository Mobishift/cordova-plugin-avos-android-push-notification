
module.exports = function(context){
	var path = context.requireCordovaModule('path'),
        fs = context.requireCordovaModule('fs'),
        projectRoot = context.opts.projectRoot,
        ConfigParser = context.requireCordovaModule('cordova-lib').configparser,
        config = new ConfigParser(path.join(projectRoot, 'config.xml'));

    console.log("setting android avos notification...");
    var packageNames = config.android_packageName() || config.packageName();
    var targetFile = path.join(projectRoot, 'platforms', 'android', 'src', packageNames.replace(/\./g, path.sep), 'MainActivity.java');

    var content = fs.readFileSync(targetFile, {encoding: 'utf8'});
    if(content.indexOf('com.mobishift.plugin.AVOSAndroidPushPlugin') !== -1){
    	content = content.replace('import org.apache.cordova.*;', 'import org.apache.cordova.*;\nimport com.mobishift.plugin.AVOSAndroidPushPlugin;\n');

    	content = content.replace('super.onCreate(savedInstanceState);', 'super.onCreate(savedInstanceState);\nif(getIntent().hasExtra("notificationUrl")){AVOSAndroidPushPlugin.setUrl(getIntent().getStringExtra("notificationUrl"));}\n');

    	if(content.indexOf('onNewIntent') === -1){
    		content = content.replace('public void onCreate(Bundle savedInstanceState)', 'public void onNewIntent(android.content.Intent intent){\nsuper.onNewIntent(intent);\nif(intent.hasExtra("notificationUrl")){AVOSAndroidPushPlugin.setUrl(intent.getStringExtra("notificationUrl"));}\n}\npublic void onCreate(Bundle savedInstanceState)');
    	}else{
    		content = content.replace('super.onNewIntent(intent);', 'super.onNewIntent(intent);\nif(intent.hasExtra("notificationUrl")){AVOSAndroidPushPlugin.setUrl(intent.getStringExtra("notificationUrl"));}\n');
    	}

    	fs.writeFileSync(targetFile, content);
    }
};