
module.exports = function(context){
	var path = context.requireCordovaModule('path'),
        fs = context.requireCordovaModule('fs'),
        projectRoot = context.opts.projectRoot,
        ConfigParser = context.requireCordovaModule('cordova-lib').configparser,
        config = new ConfigParser(path.join(projectRoot, 'config.xml'));

    console.log("removing android avos notification setting...");
    var packageNames = config.android_packageName() || config.packageName();
    var targetFile = path.join(projectRoot, 'platforms', 'android', 'src', packageNames.replace(/\./g, path.sep), 'MainActivity.java');

    if(content.indexOf('com.mobishift.plugin.AVOSAndroidPushPlugin') >= 0){
    	content = content.replace('import com.mobishift.plugin.AVOSAndroidPushPlugin;\n', '')
    		.replace('if(getIntent().hasExtra("notificationUrl")){AVOSAndroidPushPlugin.setUrl(getIntent().getStringExtra("notificationUrl"));}\n', '')
    		.replace('if(intent.hasExtra("notificationUrl")){AVOSAndroidPushPlugin.setUrl(intent.getStringExtra("notificationUrl"));}\n', '');

    	fs.writeFileSync(targetFile, content);
    }
};