import 'dotenv/config'
export default {
  "expo": {
    "name": "HalalExpress",
    "slug": "HalalExpress",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "package": "com.dacarnage.expofire",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.FOREGROUND_SERVICE"
      ],
      "config": {
        "googleMaps": {
          "apiKey": "AIzaSyDuPMUUBxeeqh65Brjy5NYxpdZ-XmvOFyw"
        }
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow HalalExpress to use your location."
        }
      ]
    ],
    "extra": {
      "firebase": {
        "apiKey": "AIzaSyChi4RK2bphEVRwJ_Ma_GNmr2sljXEXeJM",
        "authDomain": "halalexpress-86dbb.firebaseapp.com",
        "projectId": "halalexpress-86dbb",
        "storageBucket": "halalexpress-86dbb.firebasestorage.app",
        "messagingSenderId": "239431572065",
        "appId": "1:239431572065:web:d9ec84ad5922158044a820",
      },
      "eas": {
        "projectId": "4be65fdd-c591-4c21-8038-bd667af23781"
      }
    }
  }
}