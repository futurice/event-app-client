package com.wappuapp;

import com.facebook.react.ReactActivity;
import com.microsoft.codepush.react.CodePush;
import com.imagepicker.ImagePickerPackage;
import com.AirMaps.AirPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.*;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.slowpath.hockeyapp.RNHockeyAppModule;
import com.slowpath.hockeyapp.RNHockeyAppPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "wappuapp";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
          new RNHockeyAppPackage(this),
          new MainReactPackage(),
            new CodePush("8NxIp9cI4yfPOOUkk6AR1BOr5gjgNy6by4LyW", this, BuildConfig.DEBUG),
          new ImagePickerPackage(),
          new RNDeviceInfo(),
          new AirPackage(),
          new VectorIconsPackage()
        );
    }
}
