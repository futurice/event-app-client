package com.futufinlandia;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import cl.json.RNSharePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.imagepicker.ImagePickerPackage;
import com.image.zoom.ReactImageZoom;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new RNDeviceInfo(),
          new VectorIconsPackage(),
          new LinearGradientPackage(),
          new PhotoViewPackage(),
          new BlurViewPackage(),
          new ImagePickerPackage(),
          new ReactImageZoom(),
          new RNSharePackage(),
          new MainReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
