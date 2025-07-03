import "dotenv/config";

export default {
  "expo": {
    "name": "Simple-Dating",
    "slug": "Simple-Dating",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "scheme": "simpledating",
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    extra: {
      API_URL: process.env.API_URL,
    },
    "plugins": [
      "expo-router"
    ]
  }
}
