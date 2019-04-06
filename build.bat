echo Build for Toddlytic-System-Mobile Android App V-2.0
call cordova clean
call ionic cordova build android --release 
echo cloudbasha
call "C:\Program Files (x86)\Java\jdk1.8.0_162\bin\jarsigner" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore toddlyticSystem.keystore c:\Projects\Toddlytic-Mobile-System\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk toddlyticSYSTEMkey
del toddlytic.apk
call "C:\Program Files\Android\android-8.0.0\zipalign" -v 4 c:\Projects\Toddlytic-System-Mobile-App-2_0\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk toddlytic.apk
