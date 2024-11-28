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
        "apiKey": "AIzaSyDwOyieKzXVKxAsLq66k72S7a6fPOn5Abs",
        "authDomain": "halalexpress-7e67e.firebaseapp.com",
        "projectId": "halalexpress-7e67e",
        "storageBucket": "halalexpress-7e67e.firebasestorage.app",
        "messagingSenderId": "318811896092",
        "appId": "1:318811896092:web:25697ebbd12fbab04a62d9",
      },
      "eas": {
        "projectId": "4be65fdd-c591-4c21-8038-bd667af23781"
      }
    }
  }
}