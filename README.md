# TriceApp
React Native

## Configure React Native Development
What do you need to install?
* Node (NPM) and React Native
* (Optional, but Recommended) Visual Studio Code
* Android Studio
* CocoaPods
* Xcode

## Running on Android
* Plug in your Android device or open an emulator
* in the root of the project run:
  ```bash
  npm install && react-native run-android
  ```
## Running on iOS
```bash
npm install && cd ios && pod install && ls && react-native run-ios
```
or build and run from simulator

## Firebase Integration
* Firebase Auth
* Firebase Firestore
* Firebase Storage
Firebase files are not committed but I will provide access to the project or you can use dummy project for now

## Enable Push Notification

To enable push notification, you need to deploy the firebase functions.

## Steps to deploying the firebase functions

* At the root of TriceApp, change directory to firebaseFunctions:

```bash
$ cd firebaseFunctions
```

* First, we need to make sure that the Firebase Command Line Client is installed. Execute the following command to install the firebase-tools package:

```bash
$ npm install -g firebase-tools
```

* login to Firebase by using the following command:

```bash
$ firebase login
```

* The browser should open up and load a URL that was displayed in the console. At the same time the login is recognized by the Firebase CLI in the console.

* next, execute the command bellow to choose your firebase project:

```bash
$ firebase use --add
```

* when prompted for alias name, you can  enter: default

* deploy the Firebase function by using the following command:

```bash
$ firebase deploy
```


After this, you should have firebaseFunctions deployed on your firebase console and Push Notification working.
