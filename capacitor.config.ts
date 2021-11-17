/* eslint-disable @typescript-eslint/naming-convention */
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.truehussle.app',
  appName: 'true-hussle',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '0',
      SplashShowOnlyFirstTime: 'false',
      SplashScreen: 'none',
      SplashScreenDelay: '3000',
      AutoHideSplashScreen: 'true',
      StatusBarOverlaysWebView: 'false',
    },
  },
};

export default config;
