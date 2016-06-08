[![Build Status](https://travis-ci.com/futurice/wappuapp-client.svg?token=4Z4JTnNSis9VpuFymYo8&branch=master)](https://travis-ci.com/futurice/wappuapp-client)

* Backend repository here: https://github.com/futurice/wappuapp-backend

# Whappu app

![](docs/logo.png)

> An event app similar to a festival app, which helps students of TTY(Tampere University of Technology) to find events and celebrate between 19th April - 1st May.

Short facts:

* React Native + Redux
* iOS and Android
* Developed in very short time(=expect some code quality issues)

## Release

### iOS

* Make sure you have latest App Store provisioning profile installed
* Package production script bundle with `npm run release:ios`
* In XCode project settings, bump Version field
* Choose `Generic iOS Device` (or a connected iPhone) as build target
* Run `Product > Clean` (for paranoia) and `Product > Archive`
* Go to `Window > Organizer`, select latest build with correct version and press Upload to App Store

### Android

* Setup Android environment: https://facebook.github.io/react-native/docs/android-setup.html#content
* Copy `whappu-release.keystore` under `android/app` if it's not there already.
* Bump `versionCode` and `versionName` in `android/app/build.gradle`
* `cd android && ./gradlew assembleRelease --no-daemon`
* Built .apk is saved to `android/app/build/outputs/apk`

### Incremental updates with Code Push

We support pushing live updates to the app through [Code Push](https://microsoft.github.io/code-push/). **Only iOS for now, Android coming soon.**

Only JavaScript files and image assets can be updated through Code Push. If the update involves
any native code changes, it must be submitted through Play Store/App Store.

Install Code Push CLI:
```
npm i -g code-push-cli
```

Log into code push (credentials in Futurice password safe):
```
code-push login
```

Release an update:
```
code-push release-react Whappu ios \
  --deploymentName Production \
  --description "\n\nIn this version:\n * Such updates\n * Much wow\n * Very update"
```

(Check `code-push release-react` for interesting options such as `--mandatory` or staged `--rollout`)

#### Testing Code Push updates before production release

Code Push comes with a Staging environment. The deployment key that indicates which environment to use is configured in the `Info.plist` key `CodePushDeploymentKey`.

You can get the staging deployment key by executing:
```
code-push deployment ls -k Whappu
```

#### Testing Code Push updates on a local device

Code Push is only used in Release configuration builds. To launch an app from XCode to device and test updates, change the `Run` mode build configuration to `Release`.

#### Testing Code Push updates on a simulator

After the step above, in order to run a release build on a simulator you need to comment out the following lines in `node_modules/react-native/packager/react-native-xcode.sh`:

```
if [[ "$PLATFORM_NAME" = "iphonesimulator" ]]; then
  echo "Skipping bundling for Simulator platform"
  exit 0;
fi
```

## Local development

**BEFORE JUMPING TO IOS OR ANDROID GUIDE, FOLLOW THESE GUIDES:**

* https://facebook.github.io/react-native/docs/getting-started.html
* (Optional) https://facebook.github.io/react-native/docs/debugging.html#content
* `npm install` (you might need to use npm@2 version)
* `npm dedupe` (maybe necessary if you encounter Namespace collision error)
* `cp env.example.js env.js` and fill in the blank secrets in the file

### iOS

The xcode-project is expecting that you have nvm installed. It can be reconfigured in
`Build Phases > Bundle React Native code and images`.

- [Install Cocoapods](https://guides.cocoapods.org/using/getting-started.html#installation)
- `cd ios && pod install`
- `open wappuapp.xcworkspace`

  **Note:** Use the .xworkspace instead of .xcodeproj!

- Cmd + R

### Android

Running Android? Call [Pasi](http://futurice.com/people/pasi-lampinen)


### Common problems

Try these:

* Google: e.g. `react native Naming collision detected` almost always provides
useful resources to fix problems
* Search [react-native issues](https://github.com/facebook/react-native)
* Search from the react native component's issues

#### Could not connect to development server

Make sure:

* React native packager is running (`npm start`)
* You have configured React native correctly: https://facebook.github.io/react-native/docs/getting-started.html
* Your mobile phone is connected to same wifi as your computer

#### Loading from <your-ip>:8081...

Stuck at the white screen? It may take even minutes to do the initial load..

#### Error: Naming collision detected

Try to run `npm dedupe`.


#### Can't find 'node' binary to build React Native bundle

At least `nvm` causes this. Change Build Phases -> Bundle React Native code and images to:

```
export NODE_BINARY=node
. ~/.nvm/nvm.sh  # add this
nvm use 4        # add this (or whatever node version you are using)
../node_modules/react-native/packager/react-native-xcode.sh
```

#### Websocket connection failed

Setup your IP address for debugging https://facebook.github.io/react-native/docs/debugging.html#content

#### jsSchedulingOverhead (-48ms) should be positive

Issue: https://github.com/facebook/react-native/issues/1598
Do this: https://github.com/facebook/react-native/issues/1598#issuecomment-172890857

## Contributing

Found a bug? Can't live without a feature? Submit a pull request, or if you want to get paid, [apply for a job at Futurice](http://futurice.com/careers) in Tampere, Helsinki, Stockholm, London, Berlin, or Munich.
